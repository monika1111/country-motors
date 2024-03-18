import React from "react";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import "./Login.scss";

import useForm, { FormEventType } from "../../../hook/useForm";
import LoginForm from "./LoginForm";
import { useAuth } from "./../../../contexts/authContext";
import { useAuth as useAuthHook } from "./../../../contexts/authContext";
import { UserInfo } from "../../../@types/auth";
import { Navigate } from "react-router-dom";

const Login = () => {
  const {
    formElements,
    formConfigForCurrentStep,
    formIsValid,
    handleChange,
    getData,
    showCurrentStepErrors,
  } = useForm(LoginForm);

  const { login } = useAuth();

  const {
    isLoginInprogress,
    setIsLoginInprogress,
    user,
    login: loginUser,
  } = useAuthHook();

  const handleLogin = async () => {
    const { email, password } = getData();
    try {
      setIsLoginInprogress(true);

      const user = await signInWithEmailAndPassword(auth, email, password);

      loginUser({ email: user.user.email } as UserInfo);

      console.log("Signed in successfully!");
    } catch (err) {
      console.error("Sign-in error:", err.message);
    }
  };

  if (auth.currentUser) {
    return <Navigate to="/admin/cars" replace={true} />;
  }

  return (
    <div className="login-container">
      {formConfigForCurrentStep.map(
        (columnElements: IFormElement[], index: number) => {
          return (
            <ul key={index} className="login-form">
              <li className="full-grid-column calculator-title">
                <h2>Login</h2>
              </li>
              {columnElements.map(({ name }) => {
                const { type, ...props } = formElements[name];

                switch (type) {
                  case "text":
                  case "password":
                    return (
                      <li className="full-grid-column" key={name}>
                        <label>{props.label}</label>
                        <input
                          type={type}
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
                          <div className="error-msg">{props.error}</div>
                        )}
                      </li>
                    );
                  default:
                    return null;
                }
              })}
              <li className="submit" onClick={handleLogin}>
                Login
              </li>
            </ul>
          );
        }
      )}
    </div>
  );
};

export default Login;
