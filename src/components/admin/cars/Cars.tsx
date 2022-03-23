import React from "react";

import "./Cars.scss"

import EmptyDataImg from "../../../assets/images/empty-data.jpeg"
import DropDown from "../../uiKit/dropDown";
import { CarsPlace } from "../../../constants/options";

const Cars = () => {
    return (
        <div className="cars-content">
            <h2>Cars</h2>
            <div className="actions">
                <DropDown options={CarsPlace} handleSelect={() => {}}/>
                <button className="add-car"> <i className="icon-plus"/>Add Car</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Model</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr className="clickable">
                    <td><img alt="img" src="https://klbtheme.com/harrier/wp-content/uploads/2018/09/p1.jpg"/></td>
                    <td>
                        <div className="table-title">BMW M4</div>
                    </td>
                    <td className="car-delete-icon"><i className="icon-delete"/></td>
                </tr>
                <tr className="clickable">
                    <td><img alt="img" src="https://klbtheme.com/harrier/wp-content/uploads/2018/09/p3.jpg"/></td>
                    <td>
                        <div className="table-title">Mercedes E 350</div>
                    </td>
                    <td className="car-delete-icon"><i className="icon-delete"/></td>
                </tr>
                {/*<tr className="empty-tr">*/}
                {/*    <td colSpan={3}>*/}
                {/*        <div className="empty-data-content">*/}
                {/*            <img src={EmptyDataImg} alt="empty data" />*/}
                {/*            No data to display*/}
                {/*        </div>*/}
                {/*    </td>*/}
                {/*</tr>*/}
                </tbody>
            </table>
        </div>
    )
}

export default Cars