import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { Menu } from "../constants";

const useSelectedMenuItem = () => {
  const location = useLocation();

  return useMemo(() => {
    const selectedMenuItem = Menu.find((item) =>
      location.pathname.includes(item.to)
    );

    return selectedMenuItem ? selectedMenuItem.to : Menu[0].to;
  }, [location.pathname]);
};

export default useSelectedMenuItem;
