import React from 'react'
import { Form, Input } from "semantic-ui-react"

export const DataElementForm = ({dataElements}) => {
    return (
        <Form>
            <Form.Field>
                <label>DataElements</label>
                <select>
                    {
                        dataElements.map((dataElement, i) =>(
                            <option value={dataElement.dataelementid}>
                                {dataElement.dataelementname}
                            </option>
                        ))
                    }
                </select>
            </Form.Field>
        </Form>
    )
}

export default DataElementForm