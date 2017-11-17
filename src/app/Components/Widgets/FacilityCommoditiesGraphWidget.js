import React from "react"
import { Bar } from 'nivo'
import { Segment, Tab} from "semantic-ui-react"
import Dimensions from 'react-dimensions'

const FacilityCommoditiesGraphWidget = ({barGraph, width, height, containerWidth }) => {
    if(barGraph){
        const chartPanes = [
            {
                menuItem: 'Bar Graph',
                render: ()=>(
                    <Bar
                        data={barGraph.data}
                        keys={barGraph.keys}
                        indexBy={barGraph.indexBy}
                        height={height}
                        width={containerWidth}
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
                        groupMode="grouped"
                        layout="vertical"
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
                            "legend": "months",
                            "legendPosition": "center",
                            "legendOffset": 36
                        }}
                        axisLeft={{
                            "orient": "left",
                            "tickSize": 5,
                            "tickPadding": 5,
                            "tickRotation": 0,
                            "legend": "values",
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
                        legend
                    />
                )
            },
        ]


        return(
            <Segment.Group size='huge'>
                <Segment>
                    Commodities Ordered
                    </Segment>
                <Segment>
                    <Tab
                        menu={{ secondary: true, attached: 'bottom', color: 'green' }}
                        panes={chartPanes}
                    />
                </Segment>
            </Segment.Group>

        )
    }
    else{

    }
 }

 export default Dimensions()(FacilityCommoditiesGraphWidget)