import React from 'react';
import { NavLink } from 'react-router-dom';
import './NvLink.css'; // Import your CSS file

const NvLink = ({children, to}) => {
    return (
        <NavLink to={to} className={({ isActive }) => isActive ? "activeLink" : ""} >
            {children}
        </NavLink >
    );
};

export default NvLink;