import React from 'react'
import { Form, FormField, Dropdown, Header } from "semantic-ui-react"

export const PeriodForm = (props) => {
    const handlePeriodTypeChange = (e , {value}) =>{
        props.handlePeriodTypeChange(value)
    }
    const handleChange = (e, {value}) =>{

    }    
    return(
        <Form>
            <Form.Field>
                <Header as='h4'>Period type</Header>
                {
                    props.periodTypes ? (
                        <Dropdown                             
                            placeholder='select a period type'
                            options={props.periodTypes}
                            onChange={handlePeriodTypeChange}
                            multiple={false} search fluid selection/>                        
                    ):(
                        <Header as="h4">No PeriodTypes</Header>
                    )
                }
            </Form.Field>
        </Form>
    )
}

export default PeriodForm