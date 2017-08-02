import React from 'react'
import { Form, Segment, Input } from 'semantic-ui-react'

export const ConstituencyForm = (props) => {
    
    const handleChange = (event) => {
        // alert(event.target.value)
        props.fetchCountyConstituencyCodes(event.target.value)
    }

    const handleConstituencySelect = (event) =>{
        // props.fetchConstituencyWardCodes(event.target.value)
        props.fetchConstituencyFacilities(event.target.value)
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
                            <option
                                key={i}
                                value={county.id}>

                                {county.name}

                            </option>
                        ))
                    }
                </select>
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