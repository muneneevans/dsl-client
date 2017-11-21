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

    const data = [{ "id": "BCG Wastage Rate", "color": "#1f77b4", "data": [{ "x": 1, "y": 0.47 }, { "x": 2, "y": 1.01 }, { "x": 3, "y": 0.53 }, { "x": 4, "y": 0.47 }, { "x": 5, "y": 1.08 }, { "x": 6, "y": 1.14 }, { "x": 7, "y": 0.65 }, { "x": 8, "y": 1.11 }, { "x": 9, "y": 0.49 }, { "x": 10, "y": 0 }, { "x": 11, "y": 1.03 }, { "x": 12, "y": 0.9 }] }, { "id": "OPV Wastage Rate", "color": "#ff7f0e", "data": [{ "x": 1, "y": 0.57 }, { "x": 2, "y": 1.18 }, { "x": 3, "y": 0.79 }, { "x": 4, "y": 0.42 }, { "x": 5, "y": 0.85 }, { "x": 6, "y": 1.07 }, { "x": 7, "y": 0.76 }, { "x": 8, "y": 1.53 }, { "x": 9, "y": 0.67 }, { "x": 10, "y": 0 }, { "x": 11, "y": 1.24 }, { "x": 12, "y": 1.3 }] }, { "id": "Tetanus Toxoid Wastage Rate", "color": "#2ca02c", "data": [{ "x": 1, "y": 0 }, { "x": 2, "y": 0 }, { "x": 3, "y": 0 }, { "x": 4, "y": 0 }, { "x": 5, "y": 0 }, { "x": 6, "y": 0 }, { "x": 7, "y": 0 }, { "x": 8, "y": 0 }, { "x": 9, "y": 0 }, { "x": 10, "y": 0 }, { "x": 11, "y": 0 }, { "x": 12, "y": 0 }] }, { "id": "Pneumococal Wastage Rate", "color": "#d62728", "data": [{ "x": 1, "y": 0.49 }, { "x": 2, "y": 0.96 }, { "x": 3, "y": 0.56 }, { "x": 4, "y": 0.47 }, { "x": 5, "y": 1.08 }, { "x": 6, "y": 1.14 }, { "x": 7, "y": 0.6 }, { "x": 8, "y": 1.53 }, { "x": 9, "y": 0.37 }, { "x": 10, "y": 0 }, { "x": 11, "y": 1.06 }, { "x": 12, "y": 0.39 }] }, { "id": "Vitamin A Wastage Rate", "color": "#9467bd", "data": [{ "x": 1, "y": 54 }, { "x": 2, "y": 42 }, { "x": 3, "y": 49 }, { "x": 4, "y": 0 }, { "x": 5, "y": 101 }, { "x": 6, "y": 0 }, { "x": 7, "y": 0 }, { "x": 8, "y": 0 }, { "x": 9, "y": 0 }, { "x": 10, "y": 0 }, { "x": 11, "y": 0 }, { "x": 12, "y": 0 }] }]
    console.log(data)
    return (
        <div>
            <FlexibleXYPlot width={400} height={300}>
                <XAxis />
                <YAxis />
                <HorizontalGridLines />
                <VerticalGridLines />
                {
                    data.map((d,i) =>(
                        <LineMarkSeries data={d.data} />
                    ))
                }
                
            </FlexibleXYPlot>
        </div>
    )

}

export default ChartScreen