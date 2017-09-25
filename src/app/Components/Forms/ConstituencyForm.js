import React from 'react'
import { Form, Segment, Input } from 'semantic-ui-react'
import DropDownInput from "./Inputs/DropDownInput"

export const ConstituencyForm = (props) => {
    
    const handleChange =  (e, { value }) =>{        
        props.fetchCountyConstituencyCodes(value)        
    }

    const handleConstituencySelect = (event) =>{
        props.submitAction(event.target.value)
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
            <Form.Field>
                <label>Consitituency</label>
                    {props.constituencyCodesIsFetched ? (
                        <select
                            onChange={handleConstituencySelect.bind(this)}>
                                {
                                    props.constituencyCodes.map((constituency, i) => (
                                        <option
                                            key={i}
                                            value={constituency.id}>

                                            {constituency.name}
                                        </option>
                                        )
                                    )
                                    
                                }
                        </select>

                    ) : (
                        <Input 
                            loading
                            value='Loading'>
                            
                        </Input>
                    )}
            </Form.Field>
        </Form>
    )
}

export default ConstituencyForm