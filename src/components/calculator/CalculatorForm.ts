import { ageOptions, carTypesOptions } from "../../constants/options";

const CalculatorForm: IFormElement[][][] = [
  [
    [
      {
        type: "text",
        name: "price",
        label: "Car price",
        rules: {
          required: {
            message: "Car price is required.",
          },
          pattern: {
            default: {
              regexp: "^\\d+(\\.\\d+)?$",
              message: "Car Price should be number.",
            },
          },
        },
      },
      {
        type: "select",
        name: "type",
        label: "Car type",
        rules: {
          required: {
            message: "Car type is required.",
          },
        },
        options: carTypesOptions,
      },
      {
        type: "select",
        name: "age",
        label: "Age",
        rules: {
          required: {
            message: "Age is required.",
          },
        },
        options: ageOptions,
      },
      {
        type: "text",
        name: "engine",
        label: "Engine, sm³",
        rules: {
          required: {
            message: "Engine is required.",
          },
          pattern: {
            default: {
              regexp: "^\\d+(\\.\\d+)?$",
              message: "Engine type should be number.",
            },
          },
        },
      },
    ],
  ],
];

export default CalculatorForm;
