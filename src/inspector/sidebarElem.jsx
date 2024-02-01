import React from 'react';

const SidebarElem = (props) => {

    const string = props.active ? "sidebarElem active" : "sidebarElem"

    return (
        <div
            onClick = {
                () => {
                    props.updateActive(props.id);
                    props.updatePage(0);
                }
            }
             className={string}>
            {props.text}
        </div>
    );
};

export default SidebarElem;