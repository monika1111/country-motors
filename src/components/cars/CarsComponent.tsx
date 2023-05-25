import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import "./CarsComponents.scss";

import AboutUsBG from "../../assets/images/about-us-bg.jpg";
import Cars from "./Cars";

const CarsComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation("common");

  const tabs = useMemo(
    () => [
      {
        title: t("Cars In Armenia")
      },
      {
        title: t("Cars on the Way")
      },
      {
        title: t("Cars in Auction")
      }
    ],
    [t]
  );

  const CarsData: ICar[] = [
    {
      id: 1,
      brand: "Chevrolet",
      model: "Volt",
      image: "https://klbtheme.com/harrier/wp-content/uploads/2018/09/p1.jpg",
      year: 2017,
      color: "Black",
      price: 9000,
      engine: 1500,
      description:
        "Bought from an American non-accident auction. The car is on the road, it will be in Armenia in September. The price includes all costs, including customs clearance"
    },
    {
      id: 2,
      brand: "Mercedes",
      model: "GL-Class",
      image: "https://klbtheme.com/harrier/wp-content/uploads/2018/09/p3.jpg",
      year: 2017,
      color: "White",
      price: 9000,
      engine: 1500,
      description:
        "Bought from an American non-accident auction. The car is on the road, it will be in Armenia in September. The price includes all costs, including customs clearance"
    },
    {
      id: 2,
      brand: "Mercedes",
      model: "GL-Class",
      image: "https://klbtheme.com/harrier/wp-content/uploads/2018/09/p3.jpg",
      year: 2017,
      color: "White",
      price: 9000,
      engine: 1500,
      description:
        "Bought from an American non-accident auction. The car is on the road, it will be in Armenia in September. The price includes all costs, including customs clearance"
    },
    {
      id: 3,
      brand: "Mazda",
      model: "Mazda 3",
      image: "https://klbtheme.com/harrier/wp-content/uploads/2018/09/p4.jpg",
      year: 2017,
      color: "Black",
      price: 9000,
      engine: 1500,
      description:
        "Bought from an American non-accident auction. The car is on the road, it will be in Armenia in September. The price includes all costs, including customs clearance"
    },
    {
      id: 4,
      brand: "Chevrolet",
      model: "Volt",
      image: "https://klbtheme.com/harrier/wp-content/uploads/2018/09/p1.jpg",
      year: 2017,
      color: "Black",
      price: 9000,
      engine: 1500,
      description:
        "Bought from an American non-accident auction. The car is on the road, it will be in Armenia in September. The price includes all costs, including customs clearance"
    },
    {
      id: 2,
      brand: "Mercedes",
      model: "GL-Class",
      image: "https://klbtheme.com/harrier/wp-content/uploads/2018/09/p3.jpg",
      year: 2017,
      color: "White",
      price: 9000,
      engine: 1500,
      description:
        "Bought from an American non-accident auction. The car is on the road, it will be in Armenia in September. The price includes all costs, including customs clearance"
    },
    {
      id: 2,
      brand: "Mercedes",
      model: "GL-Class",
      image: "https://klbtheme.com/harrier/wp-content/uploads/2018/09/p3.jpg",
      year: 2017,
      color: "White",
      price: 9000,
      engine: 1500,
      description:
        "Bought from an American non-accident auction. The car is on the road, it will be in Armenia in September. The price includes all costs, including customs clearance"
    },{
      id: 2,
      brand: "Mercedes",
      model: "GL-Class",
      image: "https://klbtheme.com/harrier/wp-content/uploads/2018/09/p3.jpg",
      year: 2017,
      color: "White",
      price: 9000,
      engine: 1500,
      description:
        "Bought from an American non-accident auction. The car is on the road, it will be in Armenia in September. The price includes all costs, including customs clearance"
    },{
      id: 2,
      brand: "Mercedes",
      model: "GL-Class",
      image: "https://klbtheme.com/harrier/wp-content/uploads/2018/09/p3.jpg",
      year: 2017,
      color: "White",
      price: 9000,
      engine: 1500,
      description:
        "Bought from an American non-accident auction. The car is on the road, it will be in Armenia in September. The price includes all costs, including customs clearance"
    },
  ];

  return (
    <div className="cars-wrapper">
      <div className="contact-us-bg">
        <img src={AboutUsBG} alt="contactUs.jpg" />
      </div>
      <div className="tab-cars">
        <ul className="tabs">
          {tabs.map((tab, index) =>
            <li
              key={index}
              className={activeIndex === index ? "active" : ""}
              onClick={() => setActiveIndex(index)}>
              {tab.title}
            </li>)}
        </ul>
      </div>
      <Cars data={CarsData}/>
    </div>
  );
};

export default CarsComponent;
