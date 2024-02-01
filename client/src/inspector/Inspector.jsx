import React, {useEffect, useState} from 'react';
import "./inspector.css"
import SidebarElem from "./sidebarElem";
import YearSelection from "./YearSelection";
import Table from "./Table";
import Slider from "./Slider";
import AddRequestButton from "./AddRequestButton";

// const requestsAsAdmin = [];
//
// for(let i = 0; i < 100; i++){
//     requestsAsAdmin.push({
//         request_id: i,
//         name: '123',
//         request_type: "Основной",
//         date_start: (i+1)+".11.202" + Math.floor(Math.random() * 6),
//         date_finish: "25.12.2023",
//         intersects: "нет",
//         chef: "Константин Петров",
//         status: Math.random() > 0.5 ? "Согласован" : "Отклонен",
//
//
//         decision: 'decision'
//     })
// }

const getEmployeeNameByEmployeeChef = async (id) => {
    try{
        const response = await fetch('http://localhost:3050/employee/'+id);
        const jsonData = await response.json();
        return await jsonData;
    } catch (e) {
        console.error(e);
    }
}
const Inspector = (props) => {





    // if(props.user.isAdmin && requestsAsAdmin.length < 1){
    //         getRequestsAsAdmin(props.user.employee_id).then(requestsDB => {
    //
    //                 setRequestsAsAdmin(requestsDB);
    //
    //         })
    // }
    // console.log(requestsAsAdmin.length);




    const [active, setActive] = useState(0);
    const [page, setPage] = useState(0);
    const [pagesLoaded, setPagesLoaded] = useState(0);
    const [year, setYear] = useState(2023);

    const updateActive = (value) => {setActive(value)};
    const updatePage = (value) => {setPage(value)};
    const updateLoaded = (value) => {setPagesLoaded(value)};
    const updateYear = (value) => {setYear(value)};


    const showTable = () => {
        let data;
        let isAdminPage = false;
        switch (active) {
            case 0:
                data = props.asWorker.filter(e => e.status === "Согласован");
                break;
            case 1:
                data = props.asWorker;
                break;
            case 2:
                data = props.asAdmin;
                isAdminPage = true;
                break;
        }

        return <Table data = {data} isAdminPage={isAdminPage} curPage = {page} updatePagesLoaded = {updateLoaded} curYear = {year}></Table>
    }

    const showAddRequestButton = () => {
        if(active === 1)
            return <AddRequestButton user={props.user}/>
    }


    const SidebarElems = [
        {name: "Мои отпуска", id: 0},
        {name: "Мои заявки", id: 1},
    ]
    if (props.user.isAdmin) SidebarElems.push({name: "Заявки подчиненных", id: 2});


    return (
        <div className="inspector">
            <div className="sidebar">
                {SidebarElems.map((elem, index) => {
                    return <SidebarElem updatePage = {updatePage} id = {elem.id} updateActive = {updateActive} key={elem.id} text={elem.name} active={index === active ? "active" : ''}></SidebarElem>
                })}
            </div>

            <YearSelection updateValue = {updateYear} updatePage={updatePage}></YearSelection>

            {showTable()}

            <Slider updatePage = {updatePage} curPage = {page} totalPages = {pagesLoaded}></Slider>
            {showAddRequestButton()}

        </div>
    );
};

export default Inspector;