import React, { ChangeEvent, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, setDoc, doc } from "firebase/firestore";
import { useFormik } from "formik";

import "./Car.scss";

import { db } from "../../../firebase";
import { uid } from "../../../helpers/utils";
import DropDown from "../../uiKit/dropDown";

const Car = () => {
  const { carId } = useParams<{ carId: string }>();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      brand: "",
      model: "",
      mileage: "",
      year: "",
      fuel: "",
      transmission: "",
      color: "",
      doors: "",
      price: "",
      images: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  console.log(formik.values);
  const onChangeFile = useCallback(
    ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
      // if (files && files.length) {
      //   let reader = new FileReader();
      //   // Function to execute after loading the file
      //   reader.onload = (event: ProgressEvent<FileReader>) => {
      //     handleChange(FormEventType.CHANGE, "images", [
      //       ...formElements.images.value,
      //       ...files,
      //     ]);
      //   };
      //   // Read the file as a text
      //   reader.readAsDataURL(files[0]);
      // }
    },
    []
  );

  const deleteImage = useCallback((id: number) => {
    // const filteredImages = formElements.images.value.filter(
    //   (img: any) => img.id !== id
    // );
    // if (Array.isArray(formElements.images.value)) {
    //   handleChange(FormEventType.CHANGE, "images", filteredImages);
    // }
  }, []);

  const handleSave = useCallback(() => {
    const carsRef = collection(db, "cars");

    // setDoc(doc(carsRef), data);
  }, []);

  const onCancel = useCallback(() => {
    navigate("/admin");
  }, []);

  return (
    <div className="admin-car-content">
      <h2>{carId === "-1" ? "ADD CAR" : "EDIT CAR"}</h2>
      <div className="car-actions">
        <div className="actions">
          <button className="cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="save" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} className={`car-details ul-0`}>
        <li className="car-details-item">
          <label> Brand *</label>
          <DropDown
            classNames="item"
            name="brand"
            options={[{ label: "BMW", value: "bmw" }]}
            handleSelect={(value: any) => formik.setFieldValue("brand", value)}
            value={formik.values.brand}
            onBlur={(value: any) => {}}
          />
        </li>
        <li className="car-details-item">
          <label>Model *</label>
          <DropDown
            classNames="item"
            name="model"
            options={[{ label: "x5", value: "x5" }]}
            handleSelect={(value: any) => formik.setFieldValue("model", value)}
            value={formik.values.model}
            onBlur={(value: any) => {}}
          />
        </li>
        <li className="car-details-item">
          <label> Mileage</label>
          <input
            name="mileage"
            className="item"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.mileage}
          />
        </li>

        <li className="car-details-item">
          <label>Year *</label>
          <DropDown
            classNames="item"
            name="year"
            options={[{ label: "2022", value: 2022 }]}
            handleSelect={(value: any) => formik.setFieldValue("year", value)}
            value={formik.values.year}
            onBlur={(value: any) => {}}
          />
        </li>
        <li className="car-details-item">
          <label>Fuel</label>
          <DropDown
            classNames="item"
            name="fuel"
            options={[{ label: "fuel", value: "fuel" }]}
            handleSelect={(value: any) => formik.setFieldValue("fuel", value)}
            value={formik.values.fuel}
          />
        </li>
        <li className="car-details-item">
          <label>Transmission</label>
          <DropDown
            classNames="item"
            name="transmission"
            options={[{ label: "Transmission", value: "Transmission" }]}
            handleSelect={(value: any) =>
              formik.setFieldValue("transmission", value)
            }
            value={formik.values.transmission}
          />
        </li>
        <li className="car-details-item">
          <label> Color</label>
          <input
            name="color"
            className="item"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.color}
          />
        </li>
        <li className="car-details-item">
          <label>Doors</label>
          <DropDown
            classNames="item"
            name="doors"
            options={[{ label: "5 doors", value: "5" }]}
            handleSelect={(value: any) => formik.setFieldValue("doors", value)}
            value={formik.values.doors}
          />
        </li>
        <li className="car-details-item">
          <label> Price *</label>
          <input
            name="price"
            type="text"
            className="item"
            onChange={formik.handleChange}
            value={formik.values.price}
          />
        </li>
        <li className="car-details-item">
          <label> Images</label>
          <input
            type="file"
            name="images"
            className="file-upload item"
            onChange={(event) => {
              event.currentTarget.files &&
                formik.setFieldValue("images", event.currentTarget.files[0]);
            }}
          />
        </li>
        {/* <li className="uploaded-images">
          {Array.isArray(formElements.images.value)
            ? formElements.images.value.map((file: any) => (
                <div key={file.id} className="image-content">
                  <img src={file.data} alt={file.name} />
                  <div className="delete">
                    <button onClick={() => deleteImage(file.id)}>
                      <i className="icon-delete" />
                    </button>
                  </div>
                </div>
              ))
            : null}
        </li> */}
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Car;
