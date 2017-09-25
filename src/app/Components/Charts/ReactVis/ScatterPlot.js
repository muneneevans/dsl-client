import React from 'react'
import { XYPlot, HorizontalGridLines, VerticalGridLines, MarkSeries, LabelSeries, XAxis, YAxis} from "react-vis"

export const ScatterPlot = ({data, height, width}) => {
    return (
        <XYPlot width={width} height={height}>
            <XAxis />
            <YAxis />
            <HorizontalGridLines />
            <VerticalGridLines />
            <MarkSeries size={5} data={data} onNearestX={(d, e) => { }} />
            <LabelSeries size={5} data={data} onNearestX={(d, e) => { }} />
        </XYPlot>
    )
}

export default ScatterPlot