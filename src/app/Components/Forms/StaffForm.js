import React from 'react'
import { Dropdown, Form, Header, Input } from "semantic-ui-react"

export const StaffForm = (props) => {

    const handleCadreChange = (e, { value }) => {

    }

    const handleJobTypeChange = (e, { value }) => {
        props.submitAction(value)
    }

    return (
        <Form>
            <Form.Field>
                <label>Cadre</label>
                {
                    props.cadres ? (
                        <Dropdown
                            placeholder='select a cadre'
                            options={props.cadres}
                            onChange={handleCadreChange}
                            multiple={false} search fluid selection />
                    ) : (
                            <h4 className='ui negative message' >No Cadres </h4>
                        )
                }
            </Form.Field>
            <Form.Field>
                <label>Job Types</label>
                {
                    props.jobTypes ? (
                        <Dropdown
                            placeholder='select a cadre'
                            options={props.jobTypes}
                            onChange={handleJobTypeChange}
                            multiple={false} search fluid selection />
                    ) : (
                            <h4>No Job Types</h4>
                        )
                }
            </Form.Field>
        </Form>
    )
}

export default StaffForm