import React from "react";
import { useNavigate } from "react-router-dom";

import "./Header.scss"

import Logo from "../../../assets/images/logo.png";
import Popover from "../../uiKit/popover";

const Header = () => {
    const navigation = useNavigate();

    return (
        <div className="admin-header">
            <img src={Logo} alt="logo.jpg" onClick={() => navigation("")}/>

            <Popover
                placement="bottom-start"
                type="click"
                content={<p className="admin-popper">Log Out</p>}
            >
                <div className="user">
                    <img
                        alt="user image"
                        src="https://scontent.fevn1-4.fna.fbcdn.net/v/t1.6435-9/128258185_1734543360039347_8879729570853863867_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=rthuXS7VbvEAX-d8QP9&_nc_ht=scontent.fevn1-4.fna&oh=00_AT8f6wNRIm_Wexu9n4L2wXvqJKCDyjrD73P5tzrLdNGM6A&oe=625BA779"/>
                    <span className="user-name">Ando</span>
                </div>
            </Popover>
        </div>
    )
}


export default Header