import React from 'react'
import { Segment } from 'semantic-ui-react'


export const FacilityList = (props) => {
    return(
        <Segment.Group>
            {props.facilitiesIsFetched ? (
                props.facilities.map((facility, i) => (
                    <Segment key={i}
                        onClick={() => {
                            {/* this.props.commonActions.fetchConstituencyWardCodes(constituency.id) */}
                        }}
                    >
                        {facility.name}
                    </Segment>
                ))
            ) : (
                    <Segment loading>
                        <Segment color='grey' />
                        <Segment color='grey' />
                        <Segment color='grey' />
                        <Segment color='grey' />
                    </Segment>
                )}
        </Segment.Group>
    )
}

export default FacilityList