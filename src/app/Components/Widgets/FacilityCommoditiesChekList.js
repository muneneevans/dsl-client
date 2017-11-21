import React from "react"
import { Table, Icon, Label, Button } from "semantic-ui-react"

const FacilityCommoditiesChekList = (props) => {

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell rowSpan='5'>Commodity Name</Table.HeaderCell>
                    <Table.HeaderCell rowSpan='2'>Status</Table.HeaderCell>
                    <Table.HeaderCell rowSpan='1'>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            {
                props.commodities ? (
                    <Table.Body>
                        {
                            props.commodities.map((commodity, i) => (
                                <Table.Row key={i}>
                                    <Table.Cell >{commodity.name}</Table.Cell>
                                    <Table.Cell active textAlign='center'>{"" + commodity.isFetched}</Table.Cell>
                                    <Table.Cell>
                                        <Button basic color='red'
                                            onClick={() => { props.removeAction(commodity.id) }}>
                                            Remove
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                ) : (
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell warning textAlign='center' colSpan='3'>Please select a Commodity</Table.Cell>
                            </Table.Row>
                        </Table.Body>

                    )
            }
        </Table>
    )

}

export default FacilityCommoditiesChekList