import React from 'react'
import { Segment } from "semantic-ui-react"
// import 'react-vis/dist/style.css';
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, YAxis, XAxis, VerticalBarSeries, HorizontalBarSeries } from 'react-vis';

export const StackedBarChart = ({ dataExists, data, title, height, width, labels }) => {
    const margins = { left: 70, right: 10, top: 10, bottom: 40 }    
    return (
        <XYPlot height={height} width={width} margin={margins} >
            <XAxis title={title} />
            <YAxis tickFormat={v => labels[v]}/>
            <HorizontalBarSeries data={data} animation/>
        </XYPlot>
    )
}

export default StackedBarChart