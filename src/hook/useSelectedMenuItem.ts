import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { Menu } from "../constants";

const useSelectedMenuItem = () => {
  const location = useLocation();

  return useMemo(() => {
    const selectedMenuItem = Menu.find((item) =>
      location.pathname.includes(item.to)
    );

    return selectedMenuItem
      ? selectedMenuItem.to
      : !location.pathname.includes("calculator")
      ? Menu[0].to
      : "calculator";
  }, [location.pathname]);
};

export default useSelectedMenuItem;
