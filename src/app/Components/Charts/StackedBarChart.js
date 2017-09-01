import React from 'react'
import { Segment } from "semantic-ui-react"
// import 'react-vis/dist/style.css';
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, YAxis, XAxis, VerticalBarSeries, HorizontalBarSeries } from 'react-vis';

export const StackedBarChart = (props) => {
    const margins = { left: 70, right: 10, top: 10, bottom: 40 }
    // console.log(props.data)
    return (

        props.dataExists ? (
            <XYPlot height={300} width={300} margin={margins}>
                <XAxis title={props.title} />
                <YAxis />
                <HorizontalBarSeries data={props.data.facilitiesSummary} />
            </XYPlot>

        ) : (
                <Segment loading size='large'>
                </Segment>
            )

    )
}

export default StackedBarChart