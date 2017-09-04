import React from 'react'
import { scaleOrdinal, scaleLinear } from "d3-scale"
import { timeParse } from "d3-time-format"
import { line } from "d3-shape"
import { axisBottom } from "d3-axis"
import { extent } from "d3-array"

export const LineChart = ({ data, width, height }) => {

    var data = [
        { day: '02-11-2016', value: 180 },
        { day: '02-12-2016', value: 250 },
        { day: '02-13-2016', value: 150 },
        { day: '02-14-2016', value: 496 },
        { day: '02-15-2016', value: 140 },
        { day: '02-16-2016', value: 380 },
        { day: '02-17-2016', value: 100 },
        { day: '02-18-2016', value: 150 }
    ]

    const margin = { top: 20, right: 20, bottom: 30, left: 50 }
    const figureWidth = width - margin.left - margin.right
    const figureHeight = height - margin.top - margin.bottom
    const parseDate = timeParse("%m-%d-%Y");

    data.map((d, i) => {
        d.date = parseDate(d.day)
    })

    var x = scaleLinear()
        .domain(extent(data, (d) => { return d.date }))
        .rangeRound([0, figureWidth])
    var y = scaleLinear()
        .domain(extent(data, function (d) { return d.value }))
        .rangeRound([figureHeight, 0])

    const figureLine = line()
        .x(function (d) { return x(d.date) })
        .y(function (d) { return y(d.value) })


    return (
        <svg width={figureWidth} height={figureHeight} viewBox={` 0 0 ${figureWidth} ${figureHeight}`}>
            <g transform={`translate( ${margin.left} , ${margin.top} )`}>                
                <path d={figureLine(data)} fill="none" stroke='#98abc5'>
                </path>
            </g>
        </svg>
    )
}

export default LineChart