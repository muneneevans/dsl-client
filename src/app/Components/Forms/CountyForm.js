import React from 'react'
import { Card, Form } from 'semantic-ui-react'
import DropDownInput from "./Inputs/DropDownInput"

export const CountyForm = (props) => {
 

    const handleChange =  (e, { value }) =>{        
        props.submitAction(value)
    }

    return (

        <Form>
            <Form.Field>
                <label>County</label>

                {
                    props.countyCodes ? (
                        <DropDownInput  placeholder='select county'  
                                        options={props.countyCodes} onChange={handleChange}
                                        multiple={false}/>
                    ) : (
                            <h4>No Counties</h4>
                        )
                }
            </Form.Field>
        </Form>

    )
}

export default CountyForm