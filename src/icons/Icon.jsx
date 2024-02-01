import React from 'react';

import HolidayIcon from "./holiday.svg"
import SettingsIcon from "./settings.svg"
import BellIcon from "./bell.svg"
import ProfileIcon from "./profile.svg"
import SliderIcon from "./slider.svg"

const icons = {
    holiday: HolidayIcon,
    settings: SettingsIcon,
    bell: BellIcon,
    profile: ProfileIcon,
    slider: SliderIcon,

}


const Icon = (props) => {
    return (
        <a href={'#'} className={"headerButton"}>
            <img src={icons[props.name]} alt="" width={props.size} height={props.size}/>
            <div className="navText"> {props.text} </div>
        </a>
    );
};

export default Icon;