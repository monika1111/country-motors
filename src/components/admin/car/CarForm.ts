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
                            message: "Mileage should be number.",
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
                        message: "Color is required.",
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
                            message: "Doors' number should be number.",
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
                            message: "Price should be number.",
                        },
                    },
                },
            },

        ],
        [
            {
                type: "image",
                name: "images",
                label: "Images",
                value: [],
                rules: {
                    pattern: {
                        default: {
                            regexp:
                                "^(data:image\\/(?:|png|jpeg|jpg)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}|(data:application\\/pdf(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}))$",
                            message: "Please upload valid type of image.",
                        },
                    },
                },
            }
        ]
    ],
];

export default CarForm;
