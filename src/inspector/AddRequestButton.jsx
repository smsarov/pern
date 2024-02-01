import React, {useState} from 'react';

const AddRequestButton = () => {

    const setIsOpened = () => {
        document.getElementsByClassName("addRequest")[0].style.display = 'flex';
        document.getElementsByClassName("inspector")[0].style.filter = 'blur(4px)';
    };

    return (

        <div className = {"addRequestButton"} onClick={setIsOpened}>
            Добавить заявку
        </div>
    );
};

export default AddRequestButton;