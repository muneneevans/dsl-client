import React from 'react'
import { Segment } from "semantic-ui-react"
// import 'react-vis/dist/style.css';
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, YAxis, XAxis, VerticalBarSeries, HorizontalBarSeries } from 'react-vis';

export const StackedBarChart = ({dataExists, data, title, height, width}) => {
    const margins = { left: 70, right: 10, top: 10, bottom: 40 }
    // console.log(data)
    return (

        dataExists ? (
            <XYPlot height={height} width={width} margin={margins}>
                <XAxis title={title} />
                <YAxis />
                <HorizontalBarSeries data={data} />
            </XYPlot>

        ) : (
                <Segment loading size='large'>
                </Segment>
            )

    )
}

export default StackedBarChart