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
	DiscreteColorLegend,
	VerticalBarSeries,
	AreaSeries,
	HeatmapSeries
} from "react-vis"

export const WardFacilityTypeWidget = ({
	barGraph,
	heatMap,
	radarGraph,
	height,
	containerWidth,
	title
}) => {
	if (barGraph) {
		
		const chartPanes = [
			{
				menuItem: "Bar Graph",
				render: () => (
					<div>
						<FlexibleXYPlot
							width={containerWidth - 50}
							height={height}
							colorType="category"
							animate
						>
							<XAxis
								tickFormat={v => {
									return barGraph.keys[v]
								}}
								tickLabelAngle={-10}
							/>
							<YAxis />
							<HorizontalGridLines />
							<VerticalGridLines />
							<VerticalBarSeries
								data={barGraph.data}
								color={barGraph.data.color}
								animation={{ damping: 9, stiffness: 30 }}
							/>
						</FlexibleXYPlot>
					</div>
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

export default Dimensions()(WardFacilityTypeWidget)
