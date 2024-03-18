const LoginForm: IFormElement[][][] = [
    [
        [
            {
                type: "text",
                name: "email",
                label: "Email",
                rules: {
                    required: {
                        message: "Email is required.",
                    }
                },
            },
            {
                type: "password",
                name: "password",
                label: "Password",
                rules: {
                    required: {
                        message: "Password is required.",
                    }
                },
            },
        ],
    ],
];

export default LoginForm;
