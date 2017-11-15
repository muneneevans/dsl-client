import React from 'react'
import MapChart from "../../Components/Charts/MapChart"
import kenya from "../../Components/Charts/kenya"
import BarChart from "../../Components/Charts/BarChart"
// import DotChart from "../../Components/Charts/DotChart"
import LineChart from "../../Components/Charts/LineChart"
import HorizontalBarChart from "../../Components/Charts/HorizontalBarChart"
import NivoBarChart from "../../Components/Charts/Nivo/BarChart"
import {
    HorizontalGridLines,
    VerticalGridLines,
    XAxis,
    XYPlot,
    YAxis,
    LineMarkSeries,
    LineSeries,
    VerticalBarSeries,
    HorizontalBarSeries,
    AreaSeries,
    Crosshair,
    FlexibleXYPlot,
} from 'react-vis';

// const kenya = require('../Components/Charts/kenya.json')

export const ChartScreen = (props) => {

    const data = new Array(19).fill(0).reduce((prev, curr) => [...prev, {
        x: prev.slice(-1)[0].x + 1,
        y: prev.slice(-1)[0].y * (0.9 + Math.random() * 0.2)
    }], [{ x: 0, y: 10 }]);
    console.log(data)
    return (
        <div>
            <FlexibleXYPlot width={400} height={300}>
                <XAxis />
                <YAxis />
                <HorizontalGridLines />
                <VerticalGridLines />
                <LineMarkSeries data={data} color='#FFEB3B' />
                
            </FlexibleXYPlot>
        </div>
    )

}

export default ChartScreen