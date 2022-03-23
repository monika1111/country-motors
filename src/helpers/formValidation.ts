import { isEmpty } from "../helpers/utils";
import Log from "./Log";

interface IPattern {
  countryCode: string;
  language: string;
}

interface IValidationResult {
  valid: boolean;
  message?: string;
}

const checkPatternRule = (
  value: string,
  rule: Dictionary<any>
): IValidationResult => {
  const { default: defaultPattern } = rule;

  let validationResult: IValidationResult = {} as IValidationResult;
  let errorMessage: string = "";

  if (Array.isArray(defaultPattern)) {
    for (let i = 0; i < defaultPattern.length; i++) {
      validationResult = methods["pattern"](value, defaultPattern[i]);
      if (!validationResult.valid) {
        errorMessage = defaultPattern[i].message;
        break;
      }
    }
  } else {
    validationResult = methods["pattern"](value, defaultPattern);
  }

  if (!validationResult.valid) {
    return {
      valid: false,
      message: errorMessage ? errorMessage : defaultPattern.message,
    };
  }

  return { valid: true };
};

export const validateFormElement = (
  value: any,
  elementName: string,
  formData: any
) => {
  const { rulesList } = formData[elementName];
  const validationResults = [];

  for (let i = 0, length = rulesList.length; i < length; i++) {
    const rules = rulesList[i];
    validationResults[i] = null;

    for (let ruleName in rules) {
      if (rules.hasOwnProperty(ruleName)) {
        let rule = rules[ruleName];
        let validationResult: IValidationResult;

        try {
          if (ruleName === "pattern") {
            validationResult = checkPatternRule(value, rule);
            if (!validationResult.valid) {
              validationResults[i] = validationResult.message;
              break;
            }
          } else if (ruleName === "method") {
            validationResult = methods[rule](value);
            if (!validationResult.valid) {
              validationResults[i] = validationResult.message;
              break;
            }
          } else {
            validationResult = methods[ruleName](value, rule, formData);
            if (!validationResult.valid) {
              validationResults[i] = rule.message;
              break;
            }
          }
        } catch (e) {
          Log.warning(`Missing "${ruleName}" validation method implementation`);
        }
      }
    }
  }

  const errors = validationResults.filter((error) => error !== null);

  if (validationResults.length === errors.length) {
    return errors[0];
  }

  return "";
};

const methods: Dictionary<(...args: any[]) => IValidationResult> = {
  required: (value) => {
    return { valid: !isEmpty(value) };
  },
  pattern: (value, rule) => {
    const valid = isEmpty(value) || new RegExp(rule.regexp).test(value);
    return { valid };
  },
  minLength: (value, rule) => {
    const valid = isEmpty(value) || value.length >= rule.value;
    return { valid };
  },
  maxLength: (value, rule) => {
    const valid = isEmpty(value) || value.length <= rule.value;
    return { valid };
  },
  match: (value, rule, formElements) => {
    const valid = isEmpty(value) || value === formElements[rule.name].value;
    return { valid };
  },
  min: (value, rule) => {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      return { valid: false };
    }
    const valid = numValue >= rule.value;
    return { valid };
  },
  max: (value, rule) => {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      return { valid: false };
    }
    const valid = numValue <= rule.value;
    return { valid };
  },

  checkPhoneNumber: (value) => {
    const {
      phoneCode,
      phoneNumber,
    }: { phoneCode: string; phoneNumber: string } = value;

    if (phoneCode.trim().length === 0) {
      return {
        valid: false,
        message: "Phone code is required",
      };
    }

    if (!/^[0-9]{1,3}$/.test(phoneCode)) {
      return {
        valid: false,
        message: "Invalid phone code",
      };
    }

    const clippedPhoneNumber = phoneNumber.trim();

    if (clippedPhoneNumber.length === 0) {
      return {
        valid: false,
        message: "Phone number is required",
      };
    }

    if (clippedPhoneNumber.length < 6) {
      return {
        valid: false,
        message: "Too short",
      };
    }

    if (clippedPhoneNumber.length > 12) {
      return {
        valid: false,
        message: "Too long",
      };
    }

    if (!/^\d+$/.test(phoneNumber)) {
      return {
        valid: false,
        message:
          "lease, enter valid phone number: only digits are allowed - no spaces, letters and/or symbols",
      };
    }

    return {
      valid: true,
    };
  },

  checkIdValidDocNumber: (value) => {
    if (value.length < 2) {
      return {
        valid: false,
        message: "Doc number should contain at least 2 characters",
      };
    }
    return {
      valid: true,
    };
  },
};
