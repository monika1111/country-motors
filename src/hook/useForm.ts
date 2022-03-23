import {
  Reducer,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import cloneDeep from "lodash/cloneDeep";
import { isEqual } from "lodash";

import { validateFormElement } from "../helpers/formValidation";
import {
  getFlattenArray,
  isEmpty,
  mergeRecursive,
  uid,
} from "../helpers/utils";

interface IFormState {
  formData: Dictionary<IFormData>;
  formRulesId: Symbol;
}

export enum FormEventType {
  CHANGE = "change",
  BLUR = "blur",
  FOCUS = "focus",
}

const fixMissingNames = (config: IFormElement[][][]) => {
  return config.map((step) =>
    step.map((column) =>
      column.map((element) => ({
        ...element,
        name: element.name || uid(),
      }))
    )
  );
};

const getFormDataValueType = (value: any): FormDataValueType => {
  switch (typeof value) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    default:
      return "any";
  }
};

const getTypeFixedValue = (
  value: any,
  valueType: FormDataValueType,
  inputType: string | undefined
): string | number | boolean | undefined => {
  if (valueType !== "any") {
    switch (valueType) {
      case "string":
        return value.toString();
      case "number": {
        const numValue = parseFloat(value);
        return isNaN(numValue) ? value : numValue;
      }
      case "boolean":
        return value === "true" ? true : value === "false" ? false : value;
    }
  }

  switch (inputType) {
    case "text":
      return value.toString();
    case "number":
      return parseFloat(value);
    default:
      if (
        inputType !== "image" &&
        inputType !== "submit" &&
        inputType !== "info" &&
        inputType !== "component"
      ) {
        return value;
      }
  }
};

const reducer = (state: IFormState, action: ActionType) => {
  switch (action.type) {
    case "setData": {
      const { name, ...props } = action.payload;
      return {
        ...state,
        formData: {
          ...state.formData,
          [name]: {
            ...state.formData[name],
            ...props,
          },
        },
      };
    }

    case "setProp": {
      const { name, propName, value } = action.payload;
      return {
        ...state,
        formData: {
          ...state.formData,
          [name]: {
            ...state.formData[name],
            [propName]: value,
            touched:
              propName === "value" || propName === "error"
                ? true
                : state.formData[name].touched,
          },
        },
      };
    }

    case "setError": {
      const { name, error } = action.payload;
      return {
        ...state,
        formData: {
          ...state.formData,
          [name]: {
            ...state.formData[name],
            error,
          },
        },
      };
    }

    case "setFocus": {
      const { name, focused } = action.payload;
      return {
        ...state,
        formData: {
          ...state.formData,
          [name]: {
            ...state.formData[name],
            focused,
          },
        },
      };
    }

    case "setRules": {
      const { name, rules } = action.payload;
      return {
        ...state,
        formRulesId: Symbol(),
        formData: {
          ...state.formData,
          [name]: {
            ...state.formData[name],
            ...(!isEmpty(rules)
              ? { rules, rulesList: [rules], validationEnabled: true }
              : { rules: undefined, rulesList: [], validationEnabled: false }),
          },
        },
      };
    }

    case "setInitialData":
      return Object.assign(
        {},
        state,
        action.payload.reduce((state, { name, value, valueType, error }) => {
          return {
            ...state,
            formData: {
              ...state.formData,
              [name]: {
                ...state.formData[name],
                valueType,
                value,
                initialValue: value,
                error,
                touched: true,
              },
            },
          };
        }, state)
      );

    case "setResetData":
      return {
        ...state,
        formData: Object.values(state.formData).reduce<Dictionary<IFormData>>(
          (data, formData) => {
            const { touched, name } = formData;
            const resettable = action.payload
              ? action.payload.includes(name)
              : touched;
            if (resettable) {
              data[name] = {
                ...formData,
                value: formData.initialValue,
                error: "",
                touched: formData.initialValue !== "",
                focused: false,
              };
            } else {
              data[name] = formData;
            }

            return data;
          },
          {}
        ),
      };
  }

  return state;
};

const useForm = (config: IFormElement[][][]) => {
  const formDefaultConfig: Dictionary<IFormElement> =
    {} as Dictionary<IFormElement>;

  const [formConfig, setFormConfig] = useState(() => fixMissingNames(config));
  const [formIsValid, setFormIsValid] = useState(false);
  const [step, setStep] = useState(0);
  const formElementsVisibilityMap = useRef<Dictionary<boolean>>({});
  const prevFormRulesId = useRef<Symbol>(Symbol());

  const formInitialDataGenerator = useRef(() => {
    const formInitialConfig: Dictionary<IFormData> = formConfig.reduce(
      (initialData, stepConfig, stepIndex) => {
        const flattenStepConfig: IFormElement[] = getFlattenArray(stepConfig);
        const mergedStepConfig = flattenStepConfig.reduce(
          (stepInitialData, elementData) => {
            const { element, ...elementConfig } = elementData;
            const rulesList: IFormRule[] = [];

            const config: IFormElement = element
              ? cloneDeep(formDefaultConfig[element])
              : ({} as IFormElement);
            mergeRecursive(config, elementConfig);

            if (config.useRules) {
              config.useRules.forEach((element) => {
                const rules = formDefaultConfig[element].rules;
                if (rules) {
                  rulesList.push(rules);
                }
              });
            } else if (config.rules && !isEmpty(config.rules)) {
              rulesList.push(config.rules);
            }

            let { defaultValue = undefined } = config;

            let valueType = getFormDataValueType(defaultValue);

            if (
              defaultValue === undefined &&
              (config.type === "select" || config.type === "multi_select")
            ) {
              if (config.options?.length && config.type === "select") {
                const firstOptionValue = config.options[0].value;

                if (config.type === "select" && !config.placeholder) {
                  defaultValue = firstOptionValue;

                  valueType = getFormDataValueType(firstOptionValue);
                }
              } else if (config.type === "multi_select") {
                defaultValue = [];

                valueType = getFormDataValueType([]);
              }
            }

            const defaultValueSettled = defaultValue !== undefined;

            const initialConfig: IFormData = {
              ...config,
              rulesList,
              step: stepIndex,
              value: defaultValueSettled ? defaultValue : "",
              initialValue: defaultValueSettled ? defaultValue : "",
              valueType,
              error: "",
              touched:
                (config.type === "multi_select" &&
                  !isEqual(defaultValue, [])) ||
                (config.type !== "multi_select" && defaultValueSettled),
              focused: false,
              // disabled: false,
              validationEnabled: rulesList.length > 0,
            };

            return {
              ...stepInitialData,
              [config.name]: initialConfig,
            };
          },
          {}
        );

        return {
          ...initialData,
          ...mergedStepConfig,
        };
      },
      {}
    );

    setFormConfig((formConfig) => {
      return formConfig.map((stepElements) => {
        return stepElements.map((columnElement) => {
          return columnElement.map((element) => {
            let isVisible = true;
            if (element.showOn) {
              isVisible = Object.keys(element.showOn).some((name: string) => {
                const value: any = formInitialConfig[name].value;
                return element.showOn && element.showOn[name].includes(value);
              });
            }

            formElementsVisibilityMap.current[element.name] = isVisible;
            return { ...element, isVisible };
          });
        });
      });
    });

    return formInitialConfig;
  });

  const formInitialData = useMemo<IFormState>(
    () => ({
      formData: formInitialDataGenerator.current(),
      formRulesId: prevFormRulesId.current,
    }),
    []
  );

  const [state, dispatch] = useReducer<Reducer<IFormState, ActionType>>(
    reducer,
    formInitialData
  );

  const getData = function <T extends Dictionary<any>>(): T {
    return Object.values(state.formData).reduce<T>(
      (resultData, { name, value, type, valueType }) => {
        if (formElementsVisibilityMap.current[name]) {
          const typedValue = getTypeFixedValue(value, valueType, type);
          if (typedValue !== undefined) {
            return { ...resultData, [name]: typedValue };
          }
        } else {
          return { ...resultData, [name]: null };
        }

        return resultData;
      },
      {} as T
    );
  };

  const setFormElementsVisibilityStatus = useCallback(
    (
      name: string,
      value: any,
      valueType: FormDataValueType,
      inputType: string | undefined
    ) => {
      setFormConfig((formConfig) => {
        return formConfig.map((stepElements) => {
          return stepElements.map((columnElement) => {
            return columnElement.map((element) => {
              if (element.showOn && element.showOn[name]) {
                const typedValue = getTypeFixedValue(
                  value,
                  valueType,
                  inputType
                );

                const isVisible = element.showOn[name].includes(typedValue);
                formElementsVisibilityMap.current[element.name] = isVisible;
                return { ...element, isVisible };
              }
              return element;
            });
          });
        });
      });
    },
    []
  );

  const handleChange = useCallback(
    (eventType: string, name: string, value: any) => {
      const { type: inputType = "", valueType } = state.formData[name];

      if (eventType === FormEventType.FOCUS) {
        dispatch({ type: "setFocus", payload: { name, focused: true } });
      } else {
        let error = "";
        if (eventType === FormEventType.BLUR) {
          dispatch({ type: "setFocus", payload: { name, focused: false } });
        }

        if (
          eventType === FormEventType.BLUR ||
          (eventType === FormEventType.CHANGE &&
            ["checkbox", "agree", "file"].includes(inputType))
        ) {
          error = validateFormElement(value, name, state.formData);
        }
        if (eventType === FormEventType.CHANGE) {
          const connectedFormElements = Object.values(state.formData).filter(
            (formElementData) => {
              const { rules } = formElementData;
              return rules && rules["match"] && rules["match"].name === name;
            }
          );
          if (connectedFormElements.length) {
            const formData = {
              ...state.formData,
              [name]: {
                ...state.formData[name],
                value,
              },
            };
            connectedFormElements.forEach(
              ({ name: elName, value: elValue }) => {
                const error = validateFormElement(elValue, elName, formData);
                dispatch({
                  type: "setError",
                  payload: { name: elName, error },
                });
              }
            );
          }
        }

        dispatch({
          type: "setData",
          payload: { name, value, error, touched: true },
        });
        setFormElementsVisibilityStatus(name, value, valueType, inputType);
      }
    },
    [state.formData, setFormElementsVisibilityStatus]
  );

  const formConfigForCurrentStep = useMemo<IFormElement[][]>(() => {
    return formConfig[step].map((columnElements) => {
      return columnElements.filter(
        (element) =>
          typeof element.isVisible === "undefined" || element.isVisible
      );
    });
  }, [formConfig, step]);

  useEffect(() => {
    const currentStepConfig = getFlattenArray(formConfigForCurrentStep);

    const isStepValid = currentStepConfig.every(({ name }) => {
      const { touched, error, validationEnabled } = state.formData[name];
      return !validationEnabled || (touched && !error);
    });
    setFormIsValid(isStepValid);
  }, [formConfig, formConfigForCurrentStep, state.formData, step]);

  useEffect(() => {
    if (state.formRulesId !== prevFormRulesId.current) {
      prevFormRulesId.current = state.formRulesId;

      for (let key in state.formData) {
        if (state.formData.hasOwnProperty(key)) {
          const { name, value } = state.formData[key];
          const error = validateFormElement(value, name, state.formData);
          if (error) {
            dispatch({ type: "setError", payload: { name, error } });
            break;
          } else {
            dispatch({ type: "setError", payload: { name, error: "" } });
          }
        }
      }
    }
  }, [state.formData, state.formRulesId]);

  const formElements: Dictionary<any> = Object.keys(state.formData).reduce(
    (accFormElements, name) => {
      const {
        rulesList,
        useRules,
        validationEnabled,
        isVisible,
        showOn,
        rules,
        valueType,
        initialValue,
        defaultValue,
        ...rest
      } = state.formData[name];
      return { ...accFormElements, [name]: rest };
    },
    {}
  );

  const setInitialData = useCallback(
    (initialData: Dictionary<any>) => {
      const data = Object.keys(initialData).reduce<
        {
          name: string;
          value: string;
          error: string;
          valueType: FormDataValueType;
          inputType: string | undefined;
        }[]
      >((data, name) => {
        const value = initialData[name];
        if (value !== undefined) {
          const error = validateFormElement(value, name, state.formData);
          const inputType = state.formData[name].type;
          const valueType = getFormDataValueType(value);
          return [...data, { name, value, error, valueType, inputType }];
        }
        return data;
      }, []);

      data.forEach(({ name, value, valueType, inputType }) => {
        setFormElementsVisibilityStatus(name, value, valueType, inputType);
      });

      dispatch({ type: "setInitialData", payload: data });
    },
    [state.formData, setFormElementsVisibilityStatus]
  );

  const resetData = useCallback((names: string[] | undefined = undefined) => {
    dispatch({ type: "setResetData", payload: names });
  }, []);

  const setData = useCallback(
    (name: string, value: any, error = "", touched = true) => {
      const valueType = getFormDataValueType(value);
      dispatch({
        type: "setData",
        payload: { name, value, error, touched, valueType },
      });
    },
    []
  );

  const setDataProp = useCallback(
    (name: string, propName: string, value: any) => {
      dispatch({ type: "setProp", payload: { name, propName, value } });
    },
    []
  );

  const setRules = useCallback((name: string, rules: IFormRule) => {
    dispatch({ type: "setRules", payload: { name, rules } });
  }, []);

  const setFieldError = useCallback(
    (name: string, error: string) => {
      const step = state.formData[name].step;
      setStep(step);

      dispatch({ type: "setError", payload: { name, error } });
    },
    [state.formData]
  );

  const showCurrentStepErrors = useCallback(
    () =>
      formConfigForCurrentStep.forEach((currentStepConfig) =>
        currentStepConfig.forEach(({ name }) =>
          handleChange(FormEventType.BLUR, name, state.formData[name].value)
        )
      ),
    [formConfigForCurrentStep, handleChange, state.formData]
  );

  const totalSteps = useMemo(() => formConfig.length, [formConfig]);

  const getFirstErrorFieldNameForCurrentStep = () => {
    for (const columnElements of formConfigForCurrentStep) {
      for (const { name } of columnElements) {
        if (
          validateFormElement(formElements[name].value, name, state.formData)
        ) {
          return name;
        }
      }
    }
  };

  return {
    step,
    setStep,
    totalSteps,
    formIsValid,
    handleChange,
    formElements,
    formConfigForCurrentStep,
    getData,
    setData,
    setDataProp,
    setRules,
    setInitialData,
    setFieldError,
    resetData,
    showCurrentStepErrors,
    getFirstErrorFieldNameForCurrentStep,
  };
};

export default useForm;
