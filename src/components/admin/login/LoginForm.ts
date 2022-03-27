const LoginForm: IFormElement[][][] = [
    [
        [
            {
                type: "text",
                name: "login",
                label: "Login",
                rules: {
                    required: {
                        message: "Login is required.",
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
