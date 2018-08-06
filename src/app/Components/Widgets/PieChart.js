import React from "react"
import { HeatMap, Line, Bar, Radar, Pie } from "nivo"
import Dimensions from "react-dimensions"
import { Segment, Tab, Header } from "semantic-ui-react"


export const PieChart = ({ pieChart, height, title, containerWidth }) => {
	if (pieChart) {
		const chartPanes = [
			{
				menuItem: "Pie",
				render: () => (
					<Pie
						data={pieChart.data}
						margin={{
							top: 80,
							right: 80,
							bottom: 80,
							left: 80
						}}
						height={height}
						width={containerWidth}
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
				)
			}
		]

		return (
			<Segment.Group size="huge">
				<Segment>{title}</Segment>
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

export default Dimensions()(PieChart)
