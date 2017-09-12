import React from 'react'
import { Form } from "semantic-ui-react"

import SelectInput from "./Inputs/SelectInput"
import DropDownInput from "./Inputs/DropDownInput"

export const KephLevelForm = (props) => {
    const handleChange =  (e, { value }) =>{        
        props.submitAction(value)
    }
    return(
        <Form>
            <Form.Field>
                <label>Keph level</label>
                {
                    props.kephLevels ? (
                        <DropDownInput placeholder='select kephLevel' options={props.kephLevels} onChange={handleChange}/>
                    ) : (
                            <h4>No keph levels</h4>
                        )
                }
            </Form.Field>
        </Form>
    )
}

export default KephLevelForm