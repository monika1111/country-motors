import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./Cars.scss";

interface IProps {
  data: ICar[];
}

const Cars = ({ data }: IProps) => {
  const { t } = useTranslation("common");

  let navigate = useNavigate();

  const onClickCar = useCallback((id: number) => {
    navigate("34");
  }, []);

  return (
    <ul className="cars-content">
      {data.map((car, index) => (
        <li key={index} onClick={onClickCar}>
          <img className="img-c" src={car.image} alt="car.jpg" />
          <div className="info-c">
            <p className="name-c">{`${car.brand} ${car.model}`}</p>
            {/*<p className="phone-c">*/}
            {/*  <i className="icon-phone" />*/}
            {/*  <span className="phone-numbers first">+374 43 14-44-49</span>*/}
            {/*  <i className="icon-email" />*/}
            {/*  <span className="phone-numbers">*/}
            {/*    country.motorservice@mail.ru*/}
            {/*  </span>*/}
            {/*</p>*/}
            {/*<p className="description-c">{car.description}</p>*/}
            <p className="price-c">{car.price}$</p>
            {/*<div className="view-more-d">*/}
            {/*  <i className="icon-arrow-right" />*/}
            {/*  {t("View More")}*/}
            {/*</div>*/}
          </div>
          <div className="other-info">
            <div className="info">
              <i className="icon-meter" /> 2000
            </div>
            <div className="info">
              <i className="icon-settings" /> Automatic
            </div>
            <div className="info">
              <i className="icon-calendar" /> 2018
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Cars;
