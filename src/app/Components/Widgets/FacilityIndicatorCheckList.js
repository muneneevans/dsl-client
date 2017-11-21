import React from "react"
import { Table, Icon, Label, Button } from "semantic-ui-react"

const FacilityIndicatorCheckList = (props) => {

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell rowSpan='5'>Indicator Name</Table.HeaderCell>
                    <Table.HeaderCell rowSpan='2'>Status</Table.HeaderCell>
                    <Table.HeaderCell rowSpan='1'>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            {
                props.facilityIndicators ? (
                    <Table.Body>
                        {
                            props.facilityIndicators.map((indicator, i) => (
                                <Table.Row key={i}>
                                    <Table.Cell >{indicator.name}</Table.Cell>
                                    {
                                        (indicator.fetchedStatus == -1) ? (
                                            <Table.Cell active textAlign='center'>Not Fetched</Table.Cell>
                                        ) : (indicator.fetchedStatus == 0) ? (
                                            <Table.Cell error textAlign='center'>Failed/Error occured</Table.Cell>
                                        ) : (indicator.fetchedStatus == 1) ? (
                                            <Table.Cell positive textAlign='center'>Fetched successfully</Table.Cell>
                                        ) : (
                                            <Table.Cell warning textAlign='center'>Fetching...</Table.Cell>
                                        )
                                    }
                                    <Table.Cell>
                                        <Button basic color='red'
                                            onClick={() => { props.removeAction(indicator.id) }}>
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
                                <Table.Cell warning textAlign='center' colSpan='3'>Please select a an Indicator</Table.Cell>
                            </Table.Row>
                        </Table.Body>

                    )
            }
        </Table>
    )

}

export default FacilityIndicatorCheckList