import React from "react"
import { Table, Icon, Label, Button } from "semantic-ui-react"

const FacilityHrCheckList = (props) => {

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell rowSpan='5'>Job Type</Table.HeaderCell>
                    <Table.HeaderCell rowSpan='2'>Status</Table.HeaderCell>
                    <Table.HeaderCell rowSpan='1'>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            {
                props.jobTypes ? (
                    <Table.Body>
                        {
                            props.jobTypes.map((jobType, i) => (
                                <Table.Row key={i}>
                                    <Table.Cell >{jobType.name}</Table.Cell>
                                    {
                                        (jobType.fetchedStatus == -1) ? (
                                            <Table.Cell active textAlign='center'>Not Fetched</Table.Cell>
                                        ) : (jobType.fetchedStatus == 0) ? (
                                            <Table.Cell error textAlign='center'>Failed/Error occured</Table.Cell>
                                        ) : (jobType.fetchedStatus == 1) ? (
                                            <Table.Cell positive textAlign='center'>Fetched successfully</Table.Cell>
                                        ) : (
                                            <Table.Cell warning textAlign='center'>Fetching...</Table.Cell>
                                        )
                                    }
                                    <Table.Cell>
                                        <Button basic color='red'
                                            onClick={() => { props.removeAction(jobType.id) }}>
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
                                <Table.Cell warning textAlign='center' colSpan='3'>Please select a Job type</Table.Cell>
                            </Table.Row>
                        </Table.Body>

                    )
            }
        </Table>
    )

}

export default FacilityHrCheckList