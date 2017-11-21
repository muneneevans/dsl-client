import React from 'react'
import { Form } from 'semantic-ui-react'

export const FacilityTypeForm = (props) => {
    const handleChange = (event) =>{
        props.submitAction(event.target.value)
    }
    return (
        <Form>
            <Form.Field>
                <label>Facility type</label>
                {
                    props.facilityTypes ? (
                        <select
                            onChange={handleChange}>
                            {
                                props.facilityTypes.map((facilityType, i) => (
                                    <option key={i} value={facilityType.id}>{facilityType.name}</option>
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