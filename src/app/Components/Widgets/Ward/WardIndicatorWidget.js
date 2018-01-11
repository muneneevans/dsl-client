import React from "react"
import { HeatMap, Line, Bar, Radar } from "nivo"
import Dimensions from "react-dimensions"
import { Segment, Tab, Header } from "semantic-ui-react"
import {
	XYPlot,
	XAxis,
	YAxis,
	HorizontalGridLines,
	VerticalGridLines,
	LineMarkSeries,
	FlexibleXYPlot,
	DiscreteColorLegend
} from "react-vis"

export const WardIndicatorWidget = ({
	barGraph,
	heatMap,	
	radarGraph,
	height,	
	containerWidth
}) => {
	if (barGraph) {		
        console.log(barGraph)
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
							top: 50,
							right: 60,
							bottom: 50,
							left: 100
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
								id: "dots",
								type: "patternDots",
								background: "inherit",
								color: "#38bcb2",
								size: 4,
								padding: 1,
								stagger: true
							},
							{
								id: "lines",
								type: "patternLines",
								background: "inherit",
								color: "#eed312",
								rotation: -45,
								lineWidth: 6,
								spacing: 10
							}
						]}
						fill={[
							{
								match: {
									id: "Medical Clinic"
								},
								id: "dots"
							},
							{
								match: {
									id: "Dispensary"
								},
								id: "lines"
							}
						]}
						borderRadius={0}
						borderWidth={0}
						borderColor="inherit:darker(1.6)"
						axisBottom={{
							orient: "bottom",
							tickSize: 5,
							tickPadding: 5,
							tickRotation: 0,
							legend: "period",
							legendPosition: "center",
							legendOffset: 36
						}}
						axisLeft={{
							orient: "left",
							tickSize: 5,
							tickPadding: 5,
							tickRotation: 0,
							legend: "values",
							legendPosition: "center",
							legendOffset: -40
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
							top: 50,
							right: 60,
							bottom: 50,
							left: 100
						}}
						padding={0.2}
						innerPadding={0}
						minValue="auto"
						maxValue="auto"
						groupMode="grouped"
						layout="vertical"
						reverse={false}
						colors="BrBG"
						colorBy="id"
						defs={[
							{
								id: "dots",
								type: "patternDots",
								background: "inherit",
								color: "#38bcb2",
								size: 4,
								padding: 1,
								stagger: true
							},
							{
								id: "lines",
								type: "patternLines",
								background: "inherit",
								color: "#eed312",
								rotation: -45,
								lineWidth: 6,
								spacing: 10
							}
						]}
						fill={[
							{
								match: {
									id: "Medical Clinic"
								},
								id: "dots"
							},
							{
								match: {
									id: "Dispensary"
								},
								id: "lines"
							}
						]}
						borderRadius={0}
						borderWidth={0}
						borderColor="inherit:darker(1.6)"
						axisBottom={{
							orient: "bottom",
							tickSize: 5,
							tickPadding: 5,
							tickRotation: 0,
							legend: "period",
							legendPosition: "center",
							legendOffset: 36
						}}
						axisLeft={{
							orient: "left",
							tickSize: 5,
							tickPadding: 5,
							tickRotation: 0,
							legend: "values",
							legendPosition: "center",
							legendOffset: -40
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
				menuItem: "Radar",
				render: () => (
					<Radar
						data={radarGraph.data}
						keys={radarGraph.keys}
						indexBy={radarGraph.indexBy}
						height={height}
						width={containerWidth}
						margin={{
							top: 70,
							right: 80,
							bottom: 40,
							left: 80
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
			}
		]

		return (
			<Segment.Group size="huge">
				<Segment>Indicator Performance</Segment>
				<Segment>
					<Tab
						menu={{ secondary: true, attached: "bottom", color: "green" }}
						panes={chartPanes}
					/>
				</Segment>
			</Segment.Group>
		)
	} else {
		return <div>No data provided</div>
	}
}

export default Dimensions()(WardIndicatorWidget)
