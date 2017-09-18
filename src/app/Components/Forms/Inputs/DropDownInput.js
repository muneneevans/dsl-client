import React from 'react'
import { Dropdown } from "semantic-ui-react"

export const DropDownInput = ({options, placeholder, multiple=false, onChange={}}, search=false) => {
    return(
        <Dropdown placeholder={placeholder} fluid multiple={multiple} selection search={search} options={options} onChange={onChange}/>
    )
}

export default DropDownInput