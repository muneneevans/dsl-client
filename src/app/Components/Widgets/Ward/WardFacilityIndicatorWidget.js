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

import WardIndicatorWidget from "./WardIndicatorWidget"

export const WardFacilityIndicatorWidget = ({
	graph,
	height,
	containerWidth
}) => {
	
	if (graph) {
		return (
			<div>
				{graph.map(indicator => (
					<WardIndicatorWidget
						title={indicator.name}
						height={height}
						barGraph={indicator.barGraph}
						lineGraph={indicator.barGraph}
						radarGraph={indicator.barGraph}
					/>
				))}
			</div>
		)
	} else {
		return <div>No data provided</div>
	}
}

export default Dimensions()(WardFacilityIndicatorWidget)
