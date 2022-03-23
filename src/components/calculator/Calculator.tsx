import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import AboutUsBG from "../../assets/images/about-us-bg.jpg";

import "../../components/contactUs/ContactUs.scss";
import "./Calculator.scss";

import DropDown from "../uiKit/dropDown";
import { ageOptions, carTypesOptions } from "../../constants/options";
import useForm, { FormEventType } from "../../hook/useForm";
import CalculatorForm from "./CalculatorForm";

const Calculator = () => {
  const [tax, setTax] = useState<number | null>(null);
  const { t } = useTranslation("common");

  const {
    formElements,
    formConfigForCurrentStep,
    formIsValid,
    handleChange,
    getData,
    showCurrentStepErrors,
  } = useForm(CalculatorForm);

  const handleSave = useCallback(() => {
    if (formIsValid) {
      const { price, engine, type, age } = getData();

      let percent = 0;

      if (age === ageOptions[0].value) {
        if (engine < 2.8) {
          percent = 15;
        } else if (engine >= 2.8 && engine <= 3) {
          if (type === carTypesOptions[1].value) {
            percent = 12.5;
          } else if (type === carTypesOptions[0].value) {
            percent = 15;
          }
        } else if (
          engine > 3 &&
          engine < 3.5 &&
          type === carTypesOptions[0].value
        ) {
          percent = 15;
        } else if (engine > 4.2 && type === carTypesOptions[0].value) {
          percent = 10;
        } else if (engine > 3) {
          percent = 12.5;
        }
      } else if (age === ageOptions[1].value) {
        percent = 20;
      }

      if (price && percent) {
        setTax((price / 100) * percent);
      } else {
        setTax(null);
      }
    } else {
      showCurrentStepErrors();
    }
  }, [formIsValid, getData, showCurrentStepErrors]);

  return (
    <div className="calculator">
      <div className="calculator-bg">
        <img src={AboutUsBG} alt="contactUs.jpg" />
      </div>
      <div className="calculator-form-holder">
        {formConfigForCurrentStep.map(
          (columnElements: IFormElement[], index: number) => {
            return (
              <ul key={index} className="calculator-form">
                <li className="full-grid-column calculator-title">
                  <h2>{t("Calculator")}</h2>
                </li>
                {columnElements.map(({ name }) => {
                  const { type, ...props } = formElements[name];

                  switch (type) {
                    case "select":
                      return (
                        <li className="full-grid-column" key={name}>
                          <label> {t(props.label)}</label>
                          <DropDown
                            options={ageOptions}
                            name={name}
                            value={t(props.value)}
                            handleSelect={(value: any) =>
                              handleChange(FormEventType.CHANGE, name, value)
                            }
                            onBlur={(value: any) =>
                              handleChange(FormEventType.BLUR, name, value)
                            }
                            {...props}
                          />
                        </li>
                      );
                    case "text":
                      return (
                        <li className="full-grid-column" key={name}>
                          <label>{t(props.label)}</label>
                          <input
                            type="text"
                            value={props.value}
                            name={name}
                            onChange={(e) =>
                              handleChange(
                                FormEventType.CHANGE,
                                name,
                                e.target.value
                              )
                            }
                            onBlur={(e) =>
                              handleChange(
                                FormEventType.BLUR,
                                name,
                                e.target.value
                              )
                            }
                          />
                          {props.error && (
                            <div className="error-msg">{t(props.error)}</div>
                          )}
                        </li>
                      );
                    default:
                      return null;
                  }
                })}
                <li className="submit" onClick={handleSave} key="save">
                  {t("Calculate")}
                </li>
                {tax && (
                  <li className="cost">
                    Cost: <span className="cost-val">{tax}</span>
                  </li>
                )}
              </ul>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Calculator;
