type FormDataValueType = "string" | "number" | "boolean" | "any";
type FormDataValue = string | boolean | Dictionary<string> | Date | (string | number)[];

type SetInitialValueAction = {
  type: "setInitialData";
  payload: { name: string; value: any; error: string; valueType: FormDataValueType }[];
};

type SetValueAction = {
  type: "setData";
  payload: { name: string; value: any; error: string; touched: boolean; valueType?: FormDataValueType };
};

type SetPropAction = {
  type: "setProp";
  payload: { name: string; propName: string; value: any };
};

type SetErrorAction = {
  type: "setError";
  payload: { name: string; error: string };
};

type SetFocusAction = {
  type: "setFocus";
  payload: { name: string; focused: boolean };
};

type SetRulesAction = {
  type: "setRules";
  payload: { name: string; rules: IFormRule };
};

type SetResetAction = {
  type: "setResetData";
  payload: string[] | undefined;
};

type ActionType =
  | SetInitialValueAction
  | SetValueAction
  | SetPropAction
  | SetErrorAction
  | SetFocusAction
  | SetRulesAction
  | SetResetAction;

interface IFormRuleRequired {
  message: string;
}

interface IFormRulePatternDefault {
  regexp: string;
  message: string;
}

interface IFormRulePatternCustom {
  [k: string]: IFormRulePatternDefault;
}

interface IFormRuleLength {
  value: number;
  message: string;
}

interface IFormRulePattern {
  default: IFormRulePatternDefault | IFormRulePatternDefault[];
  countryCode?: IFormRulePatternCustom;
  language?: IFormRulePatternCustom;
}

interface IFormRuleMatch {
  name: string;
  message: string;
}

interface IFormRule {
  required?: IFormRuleRequired;
  pattern?: IFormRulePattern;
  minLength?: IFormRuleLength;
  maxLength?: IFormRuleLength;
  min?: IFormRuleLength;
  max?: IFormRuleLength;
  match?: IFormRuleMatch;
}

interface IFormElement {
  element?: string;
  name: string;
  rules?: IFormRule;
  label?: string;
  type?: string;
  props?: Dictionary<any>;
  className?: string;
  placeholder?: string;
  customAttrs?: string[];
  useRules?: string[];
  showOn?: Dictionary<any>;
  isVisible?: boolean;
  readOnly?: boolean;
  defaultValue?: any;
  options?: IFormGenericOption[];
}

interface IFormData extends IFormElement {
  rulesList: IFormRule[];
  step: number;
  initialValue: FormDataValue;
  value: FormDataValue;
  valueType: FormDataValueType;
  error: string;
  touched: boolean;
  focused: boolean;
  validationEnabled: boolean;
}

interface IFormControl extends IFormData {
  onChange: (eventType: string, name: string, value: FormDataValue) => void;
  mask?: string;
  component?: string;
}

interface IFormRadioControl extends IFormControl {
  options: IFormGenericOption[];
}

interface IFormRadio {
  label: string;
  options: IFormGenericOption[];
}

interface IFormRadioGroupControl extends IFormControl {
  translatable?: boolean;
  groupOptions: IFormRadio[];
}

interface IFormGenericOption {
  label: string;
  value: string | number;
  className?: string;
}

interface IFormSelectControl extends IFormControl {
  translatable?: boolean;
  options: IFormGenericOption[];
}

interface IFormDatepickerControl extends IFormControl {
  minDate: Date | string | undefined;
  maxDate: Date | string | undefined;
}
