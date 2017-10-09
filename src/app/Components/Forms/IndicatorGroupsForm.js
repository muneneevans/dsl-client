import React from 'react'
import { Dropdown, Form } from "semantic-ui-react"

const IndicatorGroupForm = (props) => {
    
    const handleChange =  (e, { value }) =>{        
        props.submitAction(value)
    }
    
    return (

        <Form>
            <Form.Field>
                <label>Indicator Group</label>
                {
                    props.indicatorGroups ? (
                        <Dropdown  placeholder='select an indicator group'  
                                        options={props.indicatorGroups} onChange={handleChange}
                                        multiple={false} search/>
                    ) : (
                            <h4>No Indicator Groups</h4>
                        )
                }
            </Form.Field>
        </Form>

    )
}

export default IndicatorGroupForm