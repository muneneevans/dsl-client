import React from 'react'
import { scaleOrdinal, scaleLinear } from "d3-scale"
import { timeParse } from "d3-time-format"
import { line } from "d3-shape"
import { axisBottom, axisLeft } from "d3-axis"
import { extent } from "d3-array"

export const LineChart = ({ data, width, height }) => {    

    const margin = { top: 20, right: 20, bottom: 30, left: 50 }
    const figureWidth = width - margin.left - margin.right
    const figureHeight = height - margin.top - margin.bottom
    const parseDate = timeParse("%m-%d-%Y");

    data.map((d, i) => {
        d.date = parseDate(d.label)
        // value: +d.value 
    })

    var x = scaleLinear()
        .domain(extent(data, (d) => { return d.date }))
        .rangeRound([0, figureWidth])
    var y = scaleLinear()
        .domain(extent(data, function (d) { return d.value }))
        .rangeRound([figureHeight, 0])

    const figureLine = line()
        .x((d) => { return x(d.date) })
        .y((d) => { return y(d.value) })

    const yAxis = () => {        
        return axisLeft(y).ticks(5)
    }
    const xAxis = () => {
        console.log(x)
        return axisBottom(x)
            .tickValues(data.map((d, i) => {
                    if (i > 0) {
                        return d.date
                    }
                }).splice(1)
            ).ticks(4)
    }
    var yGrid = axisLeft(y)
        .ticks(5)
        .tickSize(-figureWidth, 0, 0)
    return (
        <svg width={figureWidth} height={figureHeight} viewBox={` 0 0 ${figureWidth} ${figureHeight}`}>
            <g transform={`translate( ${margin.left} , ${margin.top} )`}>
                <path d={figureLine(data)} fill="none" stroke='#98abc5' />
            </g>
            {/* <g transform={`translate(0,${height})`}>{xAxis()}</g> */}
            {/* <g>{xAxis()}</g> */}
        </svg>
    )
}

export default LineChart