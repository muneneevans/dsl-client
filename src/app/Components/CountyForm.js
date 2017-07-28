import React from 'react'
import {Card , Form } from 'semantic-ui-react'

export const CountyForm = (props) => {
    return (
        <Card fluid>
            <Card.Content>
                <Form>
                    <Form.Field>
                        <label>County</label>
                        <select
                            placeholder='select a county'>
                            {
                                props.countyCodes.map((county, i) => (
                                    <option key={i} value={i}
                                    >
                                        {county.name}
                                    </option>
                                ))
                            }
                        </select>
                    </Form.Field>
                </Form>
            </Card.Content>
        </Card>
    )
}

export default CountyForm