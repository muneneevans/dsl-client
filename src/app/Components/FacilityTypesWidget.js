import React from 'react'
import { Bar, ResponsiveBar } from 'nivo'
import { Card, Segment, } from "semantic-ui-react"
import Dimensions from "react-dimensions"

export const FacilityTypesWidget = (props) => {
    if (props.data) {
        return (
            <div>
                <Segment.Group size='huge'>
                    <Segment>
                        Facility Type Distribution
                    </Segment>
                    <Segment>
                        <Bar
                            data={props.data}
                            keys={props.keys}
                            indexBy={props.indexBy}
                            height={props.height}
                            width={props.containerWidth}
                            margin={{
                                "top": 50,
                                "right": 60,
                                "bottom": 50,
                                "left": 100
                            }}
                            padding={0.2}
                            innerPadding={0}
                            minValue="auto"
                            maxValue="auto"
                            groupMode="stacked"
                            layout="horizontal"
                            reverse={false}
                            colors="nivo"
                            colorBy="id"
                            defs={[
                                {
                                    "id": "dots",
                                    "type": "patternDots",
                                    "background": "inherit",
                                    "color": "#38bcb2",
                                    "size": 4,
                                    "padding": 1,
                                    "stagger": true
                                },
                                {
                                    "id": "lines",
                                    "type": "patternLines",
                                    "background": "inherit",
                                    "color": "#eed312",
                                    "rotation": -45,
                                    "lineWidth": 6,
                                    "spacing": 10
                                }
                            ]}
                            fill={[
                                {
                                    "match": {
                                        "id": "Medical Clinic"
                                    },
                                    "id": "dots"
                                },
                                {
                                    "match": {
                                        "id": "Dispensary"
                                    },
                                    "id": "lines"
                                }
                            ]}
                            borderRadius={0}
                            borderWidth={0}
                            borderColor="inherit:darker(1.6)"
                            axisBottom={{
                                "orient": "bottom",
                                "tickSize": 5,
                                "tickPadding": 5,
                                "tickRotation": 0,
                                "legend": "country",
                                "legendPosition": "center",
                                "legendOffset": 36
                            }}
                            axisLeft={{
                                "orient": "left",
                                "tickSize": 5,
                                "tickPadding": 5,
                                "tickRotation": 0,
                                "legend": "food",
                                "legendPosition": "center",
                                "legendOffset": -40
                            }}
                            enableGridX={false}
                            enableGridY={true}
                            enableLabel={false}
                            labelSkipWidth={12}
                            labelSkipHeight={12}
                            labelTextColor="inherit:darker(1.6)"
                            animate={true}
                            motionStiffness={90}
                            motionDamping={15}
                            isInteractive={true}
                        />
                    </Segment>
                </Segment.Group>
            </div >
        )
    }
    else {
        return (
            <div> No data</div>
        )
    }
}

export default Dimensions()(FacilityTypesWidget)