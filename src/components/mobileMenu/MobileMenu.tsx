import { Link } from "react-router-dom";

import "./MobileMenu.scss";

import Logo from "../../assets/images/logo.png";
import { Menu } from "../../constants";
import useSelectedMenuItem from "../../hook/useSelectedMenuItem";

interface IProps {
  closeMobileMenu: CallableFunction;
}

const MobileMenu = ({ closeMobileMenu }: IProps) => {
  const selectedMenu = useSelectedMenuItem();

  return (
    <div className="m-device-menu">
      <div className="m-menu-header">
        <img src={Logo} alt="logo" />
        <span className="cm">Central Motors</span>
        <i
          className="icon-icon-close close"
          onClick={() => closeMobileMenu()}
        />
      </div>
      <nav>
        {Menu.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`m-link ${selectedMenu === item.to ? "selected" : ""}`}
            onClick={() => closeMobileMenu()}
          >
            <span>{item.name}</span>
            <i className="icon-right-arrow" />
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MobileMenu;
