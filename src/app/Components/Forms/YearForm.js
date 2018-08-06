import React from 'react'
import DropDownInput from "./Inputs/DropDownInput"
import { Dropdown, Form, Card, Header } from "semantic-ui-react"

export const YearForm = (props) => {
    const handleChange = (e, { value }) => {
        props.submitAction(value)
    }

    const years =[{"key":2010,"text":2010,"value":2010},{"key":2011,"text":2011,"value":2011},{"key":2012,"text":2012,"value":2012},{"key":2013,"text":2013,"value":2013},{"key":2014,"text":2014,"value":2014},{"key":2015,"text":2015,"value":2015},{"key":2016,"text":2016,"value":2016},{"key":2017,"text":2017,"value":2017}]
    return(
        <Form>
            <Form.Field>
                <Header as='h5'>Year</Header>
                
                <Dropdown
                    placeholder="select a year"
                    options={years}
                    onChange={handleChange}
                    multiple={false} search fluid selection />
            </Form.Field>
        </Form>
    )
}

export default YearForm