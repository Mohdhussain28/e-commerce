import React from 'react'
import { ReactNavbar } from "overlay-navbar"
import logo from "../../images/logo.png"
const Header = () => {
    return <ReactNavbar
        burgerColor="#eb4043"
        burgerColorHover="burgerColor"
        logo={logo}

    />;
}

export default Header