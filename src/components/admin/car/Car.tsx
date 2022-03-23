import React, {ChangeEvent, useCallback} from "react";

import "./Car.scss"

import DropDown from "../../uiKit/dropDown";
import useForm, {FormEventType} from "../../../hook/useForm";
import CarForm from "./CarForm";

const Car = () => {
    const {
        formElements,
        formConfigForCurrentStep,
        formIsValid,
        handleChange,
        getData,
        showCurrentStepErrors,
    } = useForm(CarForm);

    const onChangeFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {

    }, [])

    return (
        <div className="admin-car-content">
            <h2><i className="icon-arrow-left"/>Cars</h2>
            <div className="car-actions">
                <div className="actions">
                    <button className="cancel">Cancel</button>
                    <button className="save">Save</button>
                </div>
            </div>
            {formConfigForCurrentStep.map(
                (columnElements: IFormElement[], index: number) => {
                    return (
                        <ul className="car-details" key={index}>
                            {columnElements.map(({name}) => {
                                const {type, ...props} = formElements[name];

                                switch (type) {
                                    case "select":
                                        return (
                                            <li className="car-details-item" key={name}>
                                                <label> {props.label}</label>
                                                <DropDown classNames="item" options={props.options}
                                                          handleSelect={(value: any) =>
                                                              handleChange(FormEventType.CHANGE, name, value)}
                                                          onBlur={(value: any) =>
                                                              handleChange(FormEventType.BLUR, name, value)
                                                          }
                                                          {...props}/>
                                            </li>
                                        )
                                    case "text":
                                        return (
                                            <li className="car-details-item" key={name}>
                                                <label> {props.label}</label>
                                                <input
                                                    type="text"
                                                    value={props.value}
                                                    className="item"
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
                                        )
                                    case "image":
                                        return (
                                            <li className="car-details-item" key={name}>
                                                <label> {props.label}</label>
                                                <input type="file" onChange={onChangeFile}/>
                                            </li>
                                        )
                                }
                            })}
                        </ul>
                    )
                })}
        </div>
    )
}

export default Car