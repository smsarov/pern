import React from 'react';
import Icon from "../icons/Icon";

const Slider = (props) => {
    return (
        <div className={"sliderContainer"}>
            <div className={"sliderButton left"} onClick={() =>
                {props.updatePage(Math.max(0, props.curPage - 1))}
            }>
                <Icon name={"slider"} size={10}></Icon>
            </div>
            <div className={"counter"}>{props.curPage + 1}\{props.totalPages + 1}</div>
            <div className={"sliderButton right"} onClick = {() => props.updatePage(Math.min(props.totalPages, props.curPage + 1))}>
                <Icon name={"slider"} size={10}></Icon>
            </div>
        </div>
    );
};

export default Slider;