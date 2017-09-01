import React from 'react'
import { Form } from 'semantic-ui-react'

export const FacilityTypeForm = (props) => {
    return (
        <Form>
            <Form.Field>
                <label>Facility type</label>
                {
                    props.facilityTypes ? (
                        <select>
                            {
                                props.facilityTypes.map((facilityType, i) => (
                                    <option key={i}>{facilityType.name}</option>
                                ))
                            }
                        </select>

                    ) : (
                            <h4>No facility types</h4>
                        )
                }
            </Form.Field>
        </Form>
    )
}

export default FacilityTypeForm