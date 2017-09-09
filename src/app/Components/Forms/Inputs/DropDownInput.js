import React from 'react'
import { Dropdown } from "semantic-ui-react"

export const Component = ({options, placeholder, multiple=false}) => {
    return(
        <Dropdown placeholder={placeholder} fluid multiple={multiple} selection options={options} />
    )
}

export default Component