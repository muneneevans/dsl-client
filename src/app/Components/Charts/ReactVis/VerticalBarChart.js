import React from 'react'
import { XYPlot, LineSeries, VerticalGridLines, VerticalBarSeries, LabelSeries, HorizontalGridLines, YAxis, XAxis, HorizontalBarSeries, Crosshair } from 'react-vis';

export const VerticalBarChart = (props) => {
    const myData = [
        { x: 3, y: 10, label: 'asdf' },
        { x: 15, y: 5, label: 'asdf' },
        { x: 25, y: 15, label: 'asdf' }
    ]

    return (
        <XYPlot height={500} width={500} >
            <XAxis />
            <YAxis />
            <VerticalBarSeries data={myData} />

        </XYPlot>
    )
}

export default VerticalBarChart