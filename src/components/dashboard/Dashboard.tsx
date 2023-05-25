import "./Dashboard.scss";

import Car_1 from "../../assets/images/slideImages/car_1.jpg";
import Car_2 from "../../assets/images/slideImages/car_2.jpg";
import Car_3 from "../../assets/images/slideImages/car_3.jpg";

import SwiperComp from "../uiKit/swiperComponent/SwiperComponent";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <SwiperComp
        images={[Car_1, Car_2, Car_3]}
        autoplay={true}
        classNames="dashboard-slide"
      />
    </div>
  );
};

export default Dashboard;
