import React from 'react';
import tick from '../icons/correct.png'
import cross from '../icons/remove.png'

const statusColor = (status) =>{
    switch (status) {
        case "Согласован":
            return "#1C9209"
        case "На согласовании" :
            return "#EDAB00"
        case "Отклонен":
            return "#ED0E00"
    }
    return "#8E8A8F"
};

Object.size = function(obj) {
    let size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size - 1;
};

const TableItem = (props) => {

    //const workerStyle =  {width : `calc(100% / ${Object.size(props.data) - 2})`};
    const fields = props.isAdminPage
        ? ['name', 'request_type', "date_start", "date_finish", "intersects", "status", "chef_name", 'decision']
        : ['request_type', "date_start", "date_finish", "intersects", "status", "chef_name"];


    const data = {};

    for(let key in props.data){
        let val = props.data[key];

        if(key === 'request_id' || key === 'employee_chef_id') continue;
        if(key === 'date_start' || key === 'date_finish'){
            if(!isNaN(new Date(val))) {

                console.log(val);
                let d = new Date(val);
                console.log(d);
                let trueDate = new Date(d);

                trueDate.setDate(trueDate.getDate() + 1);
                console.log(trueDate);
                val = trueDate.toISOString().slice(0, 10).split('-').reverse().join('.');
            }
        }
        if(key === 'intersects'){
            if(!val) val = 'нет';
        }
        data[key] = val;
    }

    const submit = async (status) => {
        const updatedReceiptInfo = {
            request_id: props.data.request_id,
            status: status,
        }

        await fetch(
            'http://localhost:3050/requests', {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updatedReceiptInfo)
            }
        )
    }


    return (
        <div className={"tableItem"} style={props.style}>
           {
                fields.map(e => {
                    const style = e === 'status'
                    ?   {
                            color: statusColor(props.data.status),
                            width : `calc(100% / ${Object.size(data)})`
                        }
                    : {width : `calc(100% / ${Object.size(data)})`};

                    if(props.data[e] === 'decision')
                        return <div className={"textContainer"} style={style}>
                            <div className={"decisions"}>
                                <img src={tick} alt="" className={"decision"} title={"Утвердить"}
                                onClick={() => submit("Согласован")}/>
                                <img src={cross} alt="" className={"decision"} title={"Отменить"}
                                onClick={() => submit("Отклонен")}
                                />
                            </div>
                        </div>

                    return <div className={"textContainer"} style={style}>{data[e]}</div>
                })
            }


            {/*<div className={"tableItem"} style={props.style}>*/}
            {/*<div className={"textContainer"} style={workerStyle}>{props.data.request_type}</div>*/}
            {/*<div className={"textContainer"} style={workerStyle}>{props.data.date_start.slice(0, 10)}</div>*/}
            {/*<div className={"textContainer"} style={workerStyle}>{props.data.date_finish.slice(0, 10)}</div>*/}
            {/*<div className={"textContainer"} style={workerStyle}>{props.data.intersects}</div>*/}
            {/*<div className={"textContainer"} style={workerStyle}>{props.data.chef_name}</div>*/}
            {/*<div className={"textContainer"}*/}
            {/*     style={*/}
            {/*        {color: statusColor(props.data.status),*/}
            {/*            width : `calc(100% / ${Object.size(props.data - 2)})`*/}
            {/*        }*/}
            {/*     }>*/}
            {/*    {props.data.status}*/}
            {/*</div>*/}
        </div>
    );
};

export default TableItem;