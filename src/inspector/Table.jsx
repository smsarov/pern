import React from 'react';
import TableItem from "./TableItem";


const markupAsWorker = {
    request_type: "Вид отпуска",
    date_start: "Начало",
    date_finish: "Конец",
    intersects: "Пересечения",
    chef_name: "Согласующий",
    status: "Статус",
}

const markupAsAdmin = {
    name: "Имя",
    request_type: "Вид отпуска",
    date_start: "Начало",
    date_finish: "Конец",
    intersects: "Пересечения",
    chef_name: "Согласующий",
    status: "Статус",
    decision: 'Решение'
}


const rowsInTable = 6;

const Table = (props) => {

    const goodItems = props.data.filter((item) => ((new Date(item.date_start)).getFullYear() == props.curYear));
    props.updatePagesLoaded(Math.floor(goodItems.length / rowsInTable));

    return (
        <div className={"table"}>
            <TableItem data={props.isAdminPage ? markupAsAdmin : markupAsWorker} isAdminPage={props.isAdminPage}></TableItem>


            {goodItems.slice(props.curPage * rowsInTable,
                (props.curPage + 1) * rowsInTable).map(elem =>
                {return <TableItem data={elem} key={elem.id} isAdminPage={props.isAdminPage}  style={{'height': `calc(100% / ${rowsInTable + 1 })`}}></TableItem>}
            )}

        </div>
    );
};

export default Table;