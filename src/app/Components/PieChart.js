import React from 'react'
import { scaleOrdinal } from "d3-scale"
import { arc, pie } from "d3-shape"


export const PieChart = ({ data, width, height }) => {

    const radius = Math.min(width, height) / 2

    const color = scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    const path = arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    const label = arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    const pieChart = pie()
        .sort(null)
        .value(function (d) { return d.x });
    
    return (
        <svg width={width} height={height} viewBox={` 0 0 ${width} ${height}`}>
            <g transform={`translate(${width / 2}, ${height / 2})`}>
                {pieChart(data).map((d, i) => (
                    <g className='arc' key={i}
                        onClick={()=>{ alert(d.data.label)}}>
                        <path d={path(d)} fill={color(i)}></path>
                        <text dy='.35em'
                            transform={`translate(${label.centroid(d)})`}>                            
                            {d.data.label + d.data.x}
                            {console.log(d)}
                        </text>
                    </g>
                ))}
            </g>
        </svg>
    )


}


export default PieChart