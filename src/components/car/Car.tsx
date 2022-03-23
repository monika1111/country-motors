import React from "react";

import "./Car.scss";

import SwiperComp from "../uiKit/swiperComponent/swiper";
import {useTranslation} from "react-i18next";

const car: ICar = {
  id: 1,
  brand: "Chevrolet",
  model: "Volt",
  image: [
    "https://klbtheme.com/harrier/wp-content/uploads/2018/09/p1.jpg",
    "https://klbtheme.com/harrier/wp-content/uploads/2018/09/p3.jpg"
  ],
  year: 2017,
  color: "Black",
  price: 9000,
  engine: 1500,
  fuel: "Diesel",
  mileage: "85,000 ",
  Transmission: "Automatic",
  doors: 5,
  description:
    "Bought from an American non-accident auction. The car is on the road, it will be in Armenia in September. The price includes all costs, including customs clearance"
};

const Car = () => {
  const { t } = useTranslation("common");

  return (
    <div className="car-page-container">
      <div className="car-page-content">
        <div className="images-content">
          <SwiperComp images={car.image} thumbMode={true} classNames="car-info-img" />
        </div>
        <div className="car-info-content">
          <p className="car-info-full-name">{`${car.brand} ${car.model}`}</p>
          <p className="phone-c">
            <i className="icon-phone" />
            <span className="phone-numbers first">+374 43 14-44-49</span>
            <i className="icon-email" />
            <span className="phone-numbers">
          country.motorservice@mail.ru
        </span>
          </p>
          <p className="price-block">{car.price}$</p>
          <div className="specifications">
            <h2>{t("Specifications")}</h2>
            <ul>
              <li>
                <p>{t("Mileage")}</p>
                <p><span className="two-points">:</span>85,000 miles</p>
              </li>
              <li>
                <p>{t("Year")}</p>
                <p><span className="two-points">:</span>2015</p>
              </li>
              <li>
                <p>{t("Engine")}</p>
                <p><span className="two-points">:</span>V6 3,0 l</p>
              </li>
              <li>
                <p>{t("Fuel")}</p>
                <p><span className="two-points">:</span>Diesel</p>
              </li>
              <li>
                <p>{t("Transmission")}</p>
                <p><span className="two-points">:</span>Automatic</p>
              </li>
              <li>
                <p>{t("Color")}</p>
                <p><span className="two-points">:</span>White</p>
              </li>
              <li>
                <p>{t("Doors")}</p>
                <p><span className="two-points">:</span>5</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;
