import React from 'react'
import { Pie,  } from 'nivo'
import { Segment, Card } from "semantic-ui-react"
import Dimensions from "react-dimensions"

const FacilityBedsWidget = (props) => {
    if (props.data) {
        return (
            <Segment>
                <Card.Content header="number of beds distribution"/>
                <Pie
                    data={props.data}
                    margin={{
                        "top": 80,
                        "right": 80,
                        "bottom": 80,
                        "left": 80
                    }}
                    height={props.height}
                    width={props.containerWidth}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    colors="nivo"
                    colorBy="id"
                    borderWidth={0}
                    borderColor="inherit:darker(0.6)"
                    enableRadialLabels={true}
                    radialLabel="id"
                    radialLabelsSkipAngle={10}
                    radialLabelsTextXOffset={6}
                    radialLabelsTextColor="#333333"
                    radialLabelsLinkOffset={0}
                    radialLabelsLinkDiagonalLength={16}
                    radialLabelsLinkHorizontalLength={24}
                    radialLabelsLinkStrokeWidth={1}
                    radialLabelsLinkColor="inherit"
                    enableSlicesLabels={true}
                    sliceLabel="value"
                    slicesLabelsSkipAngle={10}
                    slicesLabelsTextColor="#333333"
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    isInteractive={true}
                />
            </Segment>
        )
    }
    else {
        return (
            <div> No data</div>
        )
    }
}

export default Dimensions()(FacilityBedsWidget)