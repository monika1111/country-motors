const CarForm: IFormElement[][][] = [
    [
        [
            {
                type: "select",
                name: "brand",
                label: "Brand *",
                options: [],
                rules: {
                    required: {
                        message: "Brand is required.",
                    }
                },
            },
            {
                type: "select",
                name: "model",
                label: "Model *",
                rules: {
                    required: {
                        message: "Model is required.",
                    },
                },
                options: [],
            },
            {
                type: "text",
                name: "mileage",
                label: "Mileage",
                rules: {
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
                name: "year",
                label: "Year *",
                options: [],
                rules: {
                    required: {
                        message: "Year is required.",
                    },
                },
            },
            {
                type: "select",
                name: "fuel",
                label: "Fuel",
                options: [],
            },
            {
                type: "select",
                name: "transmission",
                label: "Transmission",
                options: [],
            },
            {
                type: "text",
                name: "color",
                label: "Color *",
                rules: {
                    required: {
                        message: "Car Brand is required.",
                    }
                },
            },
            {
                type: "select",
                name: "doors",
                label: "Doors",
                options: [],
                rules: {
                    pattern: {
                        default: {
                            regexp: "^\\d+(\\.\\d+)?$",
                            message: "Car Price should be number.",
                        },
                    },
                }
            },
            {
                type: "text",
                name: "price",
                label: "Price *",
                rules: {
                    required: {
                        message: "Price is required.",
                    },
                    pattern: {
                        default: {
                            regexp: "^\\d+(\\.\\d+)?$",
                            message: "Car Price should be number.",
                        },
                    },
                },
            },

        ],
        [
            {
                type: "image",
                name: "image",
                label: "Image",
                rules: {
                    required: {
                        message: "Price is required.",
                    },
                }
            }
        ]
    ],
];

export default CarForm;
