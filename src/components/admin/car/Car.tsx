import React, { ChangeEvent, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./Car.scss"

import DropDown from "../../uiKit/dropDown";
import useForm, {FormEventType} from "../../../hook/useForm";
import CarForm from "./CarForm";
import { uid } from "../../../helpers/utils";

const Car = () => {
    const {
        formElements,
        formConfigForCurrentStep,
        formIsValid,
        handleChange,
        getData,
        showCurrentStepErrors,
    } = useForm(CarForm);

    const { carId } = useParams<{ carId: string }>();

    const navigate = useNavigate();

    const onChangeFile = useCallback(({target: {files}}: ChangeEvent<HTMLInputElement>) => {
        if (files && files.length) {
            let reader = new FileReader();

            // Function to execute after loading the file
            reader.onload = (event: ProgressEvent<FileReader>) => {
                handleChange(FormEventType.CHANGE, "images", [...formElements.images.value, {
                    id: uid(),
                    data: event.target && event.target.result,
                    name: files[0].name
                }])
            };

            // Read the file as a text
            reader.readAsDataURL(files[0]);
        }
    }, [formElements.images.value, uid])


    const deleteImage = useCallback((id: number) => {
        const filteredImages = formElements.images.value.filter((img: any) => img.id !== id);

        if (Array.isArray(formElements.images.value)) {
            handleChange(FormEventType.CHANGE, "images", filteredImages);
        }
    }, [formElements.images.value])

    const handleSave = useCallback(() => {
        if (formIsValid) {

        } else {
            showCurrentStepErrors();
        }
    }, [])

    const onCancel = useCallback(() => {
        navigate("/admin")
    }, [])

    return (
        <div className="admin-car-content">
            <h2>
                { carId === "-1" ? "ADD CAR" : "EDIT CAR" }
            </h2>
            <div className="car-actions">
                <div className="actions">
                    <button className="cancel" onClick={onCancel}>Cancel</button>
                    <button className="save" onClick={handleSave}>Save</button>
                </div>
            </div>
            {formConfigForCurrentStep.map(
                (columnElements: IFormElement[], index: number) => {
                    return (
                        <ul className={`car-details ul-${index}`} key={index}>
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
                                                <input type="file" className="file-upload item"
                                                       onChange={onChangeFile}/>
                                            </li>
                                        )
                                }
                            })}
                            {index === 1 &&
                                <li className="uploaded-images">
                                    {Array.isArray(formElements.images.value) ? formElements.images.value.map((file: any) =>
                                        <div key={file.id} className="image-content">
                                            <img src={file.data} alt={file.name}/>
                                            <div className="delete">
                                                <button onClick={() => deleteImage(file.id)}>
                                                    <i className="icon-delete"/>
                                                </button>
                                            </div>
                                        </div>) : null}
                                </li>}
                        </ul>
                    )
                })}
        </div>
    )
}

export default Car