import React from 'react'
import { Dropdown, Form, Header } from "semantic-ui-react"

const IndicatorGroupForm = (props) => {

    const handleChange = (e, { value }) => {
        props.submitAction(value)
    }

    const handleIndicatorGroupChange = ( e, {value}) =>{
        props.handleIndicatorGroupChange(value)
    }

    return (

        <Form>
            <Form.Field>
                <label>Indicator Group</label>
                {
                    props.indicatorGroups ? (
                        <Dropdown
                            placeholder='select an indicator group'
                            options={props.indicatorGroups} onChange={handleIndicatorGroupChange}
                            multiple={false} search fluid selection/>
                    ) : (
                        <h4>No Indicator Groups</h4>
                    )
                }
            </Form.Field>
            <Form.Field>
                <label>Indicators</label>
                {
                    props.indicatorGroupIndicators ? (                        
                        <Dropdown
                            placeholder='select an indicator'
                            options={props.indicatorGroupIndicators} onChange={handleChange}
                            multiple={false} search fluid selection/>
                    ):(
                        <Header as="h4">No Indicators</Header>
                    )
                }
            </Form.Field>
        </Form>

    )
}

export default IndicatorGroupForm