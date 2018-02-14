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

export const WardIndicatorWidget = ({
	title,
	barGraph,
	heatMap,
	radarGraph,
	height,
	containerWidth
}) => {
	if (barGraph) {
		const chartPanes = [
			{
				menuItem: "Line Graph",
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
							/>
							<YAxis />
							<HorizontalGridLines />
							<VerticalGridLines />
							{barGraph.data.map((d, i) => (
								<LineMarkSeries
									data={d.data}
									color={d.color}
									key={i}
									animation={{ damping: 9, stiffness: 30 }}
								/>
							))}
						</FlexibleXYPlot>
						<DiscreteColorLegend
							items={barGraph.legend}
							orientation="horizontal"
						/>
					</div>
				)
			},
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
							/>
							<YAxis />
							<HorizontalGridLines />
							<VerticalGridLines />
							{barGraph.data.map((d, i) => (
								<VerticalBarSeries
									key={i}
									data={d.data}
									color={d.color}
									animation={{ damping: 9, stiffness: 30 }}
								/>
							))}
						</FlexibleXYPlot>
						<DiscreteColorLegend
							items={barGraph.legend}
							orientation="horizontal"
						/>
					</div>
				)
			},
			{
				menuItem: "Area Graph",
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
							/>
							<YAxis />
							<HorizontalGridLines />
							<VerticalGridLines />
							{barGraph.data.map((d, i) => (
								<AreaSeries
									className="area-series-example"
									curve="curveNatural"
									data={d.data}
									color={d.color}
									key={i}
									animation={{ damping: 9, stiffness: 30 }}
								/>
							))}
						</FlexibleXYPlot>
						<DiscreteColorLegend
							items={barGraph.legend}
							orientation="horizontal"
						/>
					</div>
				)
			},
			{
				menuItem: "Heat Map",
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
							/>
							<YAxis />
							<HorizontalGridLines />
							<VerticalGridLines />
							{barGraph.data.map((d, i) => (
								<HeatmapSeries
									className="heatmap-series-example"
									data={d.data}
									color={d.color}
								/>
							))}
						</FlexibleXYPlot>
						<DiscreteColorLegend
							items={barGraph.legend}
							orientation="horizontal"
						/>
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

export default Dimensions()(WardIndicatorWidget)
