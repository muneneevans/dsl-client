import React from 'react'
import { scaleLinear, scaleOrdinal, scaleBand } from "d3-scale"
import { max } from "d3"
import { range} from "d3-array"
export const BarChart = ({ data, width, height }) => {    

    var margins = { top: 5, right: 5, bottom: 5, left: 5 }
    var figureWidth = width - (margins.left - margins.right)
    var figureHeight = height - (margins.top + margins.bottom)

    var transform = `translate( ${margins.left}, ${margins.top})`

    var x = scaleBand()
        .domain(data.map((d, i) => {
            return d.label
        }))
        .rangeRound([0, width]).padding(0.1)

    var y = scaleLinear()
        .domain([0, max(data, function (d) {
            return d.value
        })])
        .range([height, 0])



    var rectBackground = (data) => {
        data.map((d, i) => {
            return (
                <rect
                    fill="#58657f"
                    key={i}
                    x={x(d.label)}
                    y={margins.top - margins.bottom}
                    height={figureHeight}
                    width={x.range()} />
            )
        })
    }

    const rectForeground = (data) => {
        data.map((d, i) => (            
                <rect
                    fill="#74d3eb"
                    key={i}
                    x={x(d.label)}
                    y={y(d.value)}
                    height={figureHeight - y(d.value)}
                    width={figureHeight} />
            ))

    }
    const say = () => {
        return (
            <h1> the say function </h1>
        )
    }
    return (
        <svg width={figureWidth} height={figureHeight}>
            <g transform={transform}>
                {
                    data.map((d, i) => (
                        <rect
                            fill="blue"
                            key={i}
                            x={x(d.label)}
                            y={y(d.value)}
                            height={figureHeight - y(d.value)}
                            width={ 20} />
                    ))
                }
            </g>
        </svg>
        // <div>
        //     {say()}
        // </div>
    )
}

export default BarChart