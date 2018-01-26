import React from "react"
// import { BarChart } from "react-d3-basic"

export const MyBarChart = ({ data, height, width, xLabel, yLabel, title }) => {
	var chartSeries = [
		{
			field: "value",
			name: title
		}
	]
	var x = function(d) {
		return d.label
	}
	// var title = "Bar Chart"
	// var xLabel = "Letter"
	// var yLabel = "Number"
	var xScale = "ordinal"
	var yTicks = [10]

	return (
		<BarChart
			title={title}
			data={data}
			width={width}
			height={height}
			chartSeries={chartSeries}
			x={x}
			xLabel={xLabel}
			xScale={xScale}
			yTicks={yTicks}
			yLabel={yLabel}
		/>
	)
}

export default MyBarChart
