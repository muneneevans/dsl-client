import React from 'react'
import {card , Form , Header, Dropdown} from "semantic-ui-react"

const ProductsForm = (props) => {

    const handleChange = (e, {value}) =>{
        props.submitAction(value)
    }
    return(
        <Form>
            <Form.Field>
                <label>Drug:</label>
                {
                    props.products ? (
                        <Dropdown
                            placeholder='select a drug'
                            options={props.products} onChange={handleChange}
                            multiple={false} search fluid selection/>
                    ):(
                        <Header as='h3' >No products Fround </Header>
                    )
                }
            </Form.Field>
        </Form>
    )
}

export default ProductsForm