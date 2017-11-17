import React from "react"
import { HeatMap, Line, Bar, Radar } from "nivo"
import Dimensions from "react-dimensions"
import { Segment, Tab, Header } from "semantic-ui-react"
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineMarkSeries, FlexibleXYPlot, DiscreteColorLegend } from "react-vis"

export const FacilityIndicatorWidget = ({ barGraph, heatMap, lineGraph, radarGraph, height, width, containerWidth }) => {
    if (barGraph) {
        let { title } = lineGraph.legend
        const chartPanes = [
            {
                menuItem: "Bar Graph",
                render: () => (
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
                            "legend": "period",
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
                    />
                )
            },
            {
                menuItem: "Heat Map",
                render: () => (
                    <HeatMap
                        data={heatMap.data}
                        keys={heatMap.keys}
                        indexBy={heatMap.indexBy}
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
                            "legend": "period",
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
                    />
                )
            },
            {
                menuItem: "Line Graph",
                render: () => (
                    <Line
                        data={lineGraph.data}
                        height={height}
                        width={containerWidth}
                        margin={{
                            "top": 50,
                            "right": 60,
                            "bottom": 50,
                            "left": 60
                        }}
                        minY="auto"
                        maxY="auto"
                        stacked={true}
                        curve="linear"
                        axisBottom={{
                            "orient": "bottom",
                            "tickSize": 5,
                            "tickPadding": 5,
                            "tickRotation": 0,
                            "legend": "country code",
                            "legendOffset": 36,
                            "legendPosition": "center"
                        }}
                        axisLeft={{
                            "orient": "left",
                            "tickSize": 5,
                            "tickPadding": 5,
                            "tickRotation": 0,
                            "legend": "count",
                            "legendOffset": -40,
                            "legendPosition": "center"
                        }}
                        enableGridX={true}
                        enableGridY={true}
                        colors="nivo"
                        colorBy="id"
                        lineWidth={2}
                        enableDots={true}
                        dotSize={10}
                        dotColor="inherit:darker(0.3)"
                        dotBorderWidth={2}
                        dotBorderColor="#ffffff"
                        enableDotLabel={true}
                        dotLabel="y"
                        dotLabelYOffset={-12}
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                        isInteractive={true}
                        enableStackTooltip={true}
                    />
                )
            },
            {
                menuItem: "Radar",
                render: () => (
                    <Radar
                        data={radarGraph.data}
                        keys={radarGraph.keys}
                        indexBy={radarGraph.indexBy}
                        height={height}
                        width={containerWidth}
                        margin={{
                            "top": 70,
                            "right": 80,
                            "bottom": 40,
                            "left": 80
                        }}
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
            {
                menuItem: "React Vis Line",
                render: () => (
                    <div>
                        <XYPlot width={containerWidth - 50} height={height} animate>

                            <XAxis tickFormat={(v) => { return lineGraph.months[v] }} />
                            <YAxis />
                            <HorizontalGridLines />
                            <VerticalGridLines />
                            {
                                lineGraph.data.map((d, i) => (
                                    <LineMarkSeries data={d.data} color={d.color} key={i} animation={{ damping: 9, stiffness: 300 }}/>
                                ))
                            }

                        </XYPlot>
                        <DiscreteColorLegend items={lineGraph.legend} orientation='horizontal' />
                    </div>
                )
            }
        ]

        return (

            <Segment.Group size='huge'>
                <Segment>
                    Indicator Performance
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
    else {
        return (
            <div>
                No data provided
            </div>
        )
    }
}

export default Dimensions()(FacilityIndicatorWidget)
