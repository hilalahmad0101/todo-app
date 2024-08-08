import React from "react";
import { SubMenu, MenuItem } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';

const CustomSubMenu = ({ title, icon, items }) => {
  return (
    <SubMenu title={title} icon={icon}>
      {items.map((item, index) => (
        <MenuItem key={index}>
          {item.title}
          <NavLink to={item.path} />
        </MenuItem>
      ))}
    </SubMenu>
  );
};

export default CustomSubMenu;
