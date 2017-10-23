import React from 'react'
import { Bar, ResponsiveBar, HeatMap, Radar } from 'nivo'
import { Card, Segment, Tab } from "semantic-ui-react"
import Dimensions from "react-dimensions"


export const FacilityTypesWidget = (props) => {
    if (props.data) {

        const chartPanes = [
            {
                menuItem: "Bar Graph",
                render: () => (
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
                            "legend": "number of facilities",
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

                )
            },
            {
                menuItem: "Heat Map",
                render: () => (
                    <HeatMap
                        data={props.data}
                        keys={props.keys}
                        indexBy={props.indexBy}
                        height={props.height}
                        width={props.containerWidth}
                        margin={{
                            "top": 100,
                            "right": 60,
                            "bottom": 30,
                            "left": 60
                        }}
                        forceSquare={false}
                        axisTop={{
                            "orient": "top",
                            "tickSize": 5,
                            "tickPadding": 5,
                            "tickRotation": -90,
                            "legend": "",
                            "legendOffset": 36
                        }}
                        axisLeft={{
                            "orient": "left",
                            "tickSize": 5,
                            "tickPadding": 5,
                            "tickRotation": 0,
                            "legend": "country",
                            "legendPosition": "center",
                            "legendOffset": -40
                        }}
                        cellOpacity={1}
                        cellBorderColor="inherit:darker(0.4)"
                        labelTextColor="inherit:darker(1.8)"
                        defs={[
                            {
                                "id": "lines",
                                "type": "patternLines",
                                "background": "inherit",
                                "color": "rgba(0, 0, 0, 0.1)",
                                "rotation": -45,
                                "lineWidth": 4,
                                "spacing": 7
                            }
                        ]}
                        fill={[
                            {
                                "id": "lines"
                            }
                        ]}
                        animate={true}
                        motionStiffness={80}
                        motionDamping={9}
                        cellHoverOthersOpacity={1}
                    />
                )
            },
            {
                menuItem: "Radar", render: () => (
                    <Radar
                        data={props.data}
                        keys={props.keys}
                        indexBy={props.indexBy}
                        margin={{
                            "top": 70,
                            "right": 80,
                            "bottom": 40,
                            "left": 80
                        }}
                        height={props.height}
                        width={props.containerWidth}
                        curve="catmullRomClosed"
                        borderWidth={2}
                        borderColor="inherit"
                        gridLevels={5}
                        gridShape="circular"
                        gridLabelOffset={36}
                        enableDots={true}
                        dotSize={8}
                        dotColor="inherit"
                        dotBorderWidth={0}
                        dotBorderColor="#ffffff"
                        enableDotLabel={true}
                        dotLabel="value"
                        dotLabelYOffset={-12}
                        colors="nivo"
                        colorBy="key"
                        fillOpacity={0.1}
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                        isInteractive={true}
                    />
                )
            },
        ]
        return (
            <div>
                <Segment.Group size='huge'>
                    <Segment>
                        Facility Type Distribution
                    </Segment>
                    <Segment>
                        <Tab
                            menu={{ secondary: true, attached: 'bottom', color: 'green' }}
                            panes={chartPanes}
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