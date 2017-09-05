import React from 'react'
import { scaleOrdinal, scaleLinear } from "d3-scale"
import { timeParse } from "d3-time-format"
import { line } from "d3-shape"
import { axisBottom } from "d3-axis"
import { extent } from "d3-array"

export const LineChart = ({ data, width, height }) => {
    console.log(data)

    const margin = { top: 20, right: 20, bottom: 30, left: 50 }
    const figureWidth = width - margin.left - margin.right
    const figureHeight = height - margin.top - margin.bottom
    const parseDate = timeParse("%m-%d-%Y");

    data.map((d, i) => {
        d.date = parseDate(d.day)
        // value: +d.value 
    })

    console.log(data)

    var x = scaleLinear()
        .domain(extent(data, (d) => { return d.date }))
        .rangeRound([0, figureWidth])
    var y = scaleLinear()
        .domain(extent(data, function (d) { return d.value }))
        .rangeRound([figureHeight, 0])

    const figureLine = line()
        .x((d) => { return x(d.date) })
        .y((d) => { return y(d.value) })


    return (
        <svg width={figureWidth} height={figureHeight} viewBox={` 0 0 ${figureWidth} ${figureHeight}`}>
            <g transform={`translate( ${margin.left} , ${margin.top} )`}>                
                <path d={figureLine(data)} fill="none" stroke='#98abc5'/>                
            </g>
        </svg>
    )
}

export default LineChart