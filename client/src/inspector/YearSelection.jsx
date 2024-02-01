import React from 'react'
import Select from 'react-select'

const name = {
    value: null,
    label: "Год"
}

const options = [];

const curYear = (new Date()).getFullYear();

for(let i = curYear; i >= 2000; i--){
    options.push({value:i, label:i});
}

const YearSelection = (props) => <Select
                                    defaultValue={name}  options={options}
                                    onChange={(selectedOption) => {
                                        props.updateValue(selectedOption.value);
                                        props.updatePage(0);
                                    }}
                                    classNamePrefix="react-select" unstyled={true} maxMenuHeight={150}/>


export default YearSelection