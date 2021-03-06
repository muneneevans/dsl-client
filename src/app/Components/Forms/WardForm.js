import React from 'react'
import { Form, Input } from 'semantic-ui-react'
import DropDownInput from "./Inputs/DropDownInput"

export const WardForm = (props) => {

    const handleChange =  (e, { value }) =>{                
        props.fetchCountyConstituencyCodes(value)
    }

    const handleConstituencySelect = (event) => {
        props.fetchConstituencyWardCodes(event.target.value)
    }

    const handleWardSelect = (event) =>{
        // props.fetchWardFacilities(event.target.value)
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
            <Form.Field>
                <label>Wards</label>
                {props.wardCodesIsFetched ? (
                    <select
                        onChange={handleWardSelect.bind(this)}>
                        {
                            props.wardCodes.map((ward, i) => (
                                <option
                                    key={i}
                                    value={ward.id}>

                                    {ward.name}
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

export default WardForm