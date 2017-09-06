import React from 'react'
import { Card, Form } from 'semantic-ui-react'

export const CountyForm = (props) => {

    const handleChange = (event) => {
        props.submitAction(event.target.value)
    }

    return (

        <Form>
            <Form.Field>
                <label>County</label>
                <select
                    onChange={handleChange.bind(this)}
                    placeholder='select a county'>
                    {
                        props.countyCodes.map((county, i) => (
                            <option key={i} value={county.id}
                            >
                                {county.name}
                            </option>
                        ))
                    }
                </select>
            </Form.Field>
        </Form>

    )
}

export default CountyForm