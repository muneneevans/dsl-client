import React from 'react'
import { Segment, List, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export const FacilityList = (props) => {
    return (
        <Segment>
            <List divided verticalAlign='middle' selection>
                {props.facilitiesIsFetched ? (
                    props.facilities.map((facility, i) => (
                        <List.Item key={i} >
                            <List.Content floated='right'>
                                <Button >
                                    <Link to={`/facilities/${facility.id}`}>Performance</Link>
                                </Button>
                            </List.Content>
                            <List.Content>
                                {facility.name}
                            </List.Content>
                        </List.Item>

                    ))
                ) : (
                        <Segment loading size='massive'>

                        </Segment>
                    )}
            </List>
        </Segment>
    )
}

export default FacilityList