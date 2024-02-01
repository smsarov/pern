import React from 'react';
import Select from 'react-select'
import {useState} from "react";


function daysFromMs(ms){
    return ms / 1000 / 60 / 60 / 24
}

function formatDate(date){
    return date.toISOString().slice(0, 10);
}
const AddRequest = (props) => {
    const [startDate, setStartDate] = useState(null);
    const [finishDate, setFinishDate] = useState(null);

    const [type, setType] = useState();

    function write(target, callback){
        if(target.value.length === 2 || target.value.length === 5){
            target.value += '.';
        }

        if( target.value.length === 4 && target.value[3] === '.' ||
            target.value.length === 7 && target.value[6] === '.'
        ){
            target.value = target.value.slice(0, target.value.length - 1);
        }

        let val = target.value
        if(val.at(-1) > '9' || val.at(-1) < '0' && val.at(-1) !== '.'){
            target.value = target.value.slice(0, target.value.length - 1);
        }

        target.value = target.value.slice(0, 10);

        if(target.value.length === 10){
            callback(new Date(target.value.split('.').reverse().join('-')));
        }
    }

    const submit = async () => {
        if(isNaN(startDate) || isNaN(finishDate) || (finishDate - startDate <= 0)){
            alert("Некорректные дата и время!");
            return;
        }

        if(!type){
            alert("Выберите вид отпуска!");
            return;
        }



        try{

            const data = {
                employee_chef_id: props.employee_chef,
                date_start: startDate.toISOString().slice(0, 10),
                date_finish: finishDate.toISOString().slice(0, 10),
                request_type: type
            }

            await fetch('http://localhost:3050/request', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })

            document.getElementsByClassName("addRequest")[0].style.display = 'none';
            document.getElementsByClassName("inspector")[0].style.filter = '';

        } catch(e) {
            console.log(e.message)
        }

        console.log(132);
    }

    const options = [
        {label: 'Основной', value: 'Основной'},
        {label: 'Декретный', value: 'Декретный'},
        {label: 'За свой счет', value: 'За свой счет'},


    ]

    return (
        <div className={'addRequest'}>
            <h2> Запрос на отпуск </h2>
            <Select options={options}
                    placeholder={"Вид отпуска"}
                    classNamePrefix="react-select"
                    unstyled={true}
                    maxMenuHeight={150}
                    onChange={(option) => setType(option.value)}
            ></Select>
            <div className={"inputs-modal-req"}>
                <p>Даты отпуска</p>
                <input type="text" className={"input-modal-req"} placeholder={"Начало отпуска"}
                    onChange={(e) => write(e.target, setStartDate)}
                />
                <input type="text" className={"input-modal-req"} placeholder={"Конец отпуска"}
                    onChange={(e) => write(e.target, setFinishDate)}
                />
                <p id={"days"}>{startDate && finishDate ? "Дней отпуска: " + daysFromMs(finishDate - startDate) : "Дней отпуска: 0"}</p>
            </div>
            <div className={"buttons-modal-req"}>
                <div className={"confirm-modal-req"} onClick={submit}> Отправить </div>
                <div className={"confirm-modal-req"} onClick={() =>
                    {
                        setStartDate(null);
                        setFinishDate(null);

                        document.getElementsByClassName("input-modal-req")[0].value = '';
                        document.getElementsByClassName("input-modal-req")[1].value = '';
                        document.getElementById("days").innerHTML = "Дней отпуска: 0";

                        document.getElementsByClassName("addRequest")[0].style.display = 'none';
                        document.getElementsByClassName("inspector")[0].style.filter = '';}
                    }>
                    Закрыть
                </div>
            </div>
        </div>
    );
};

export default AddRequest;