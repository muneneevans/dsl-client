import React from 'react'
import { scaleLinear, scaleOrdinal } from "d3-scale"
import { max } from "d3"
export const BarChart = ({ data, width, height }) => {

    var data = [
        { label: 'Jan', value: 40 },
        { label: 'Feb', value: 50 },
        { label: 'Mar', value: 65 },
        { label: 'Apr', value: 60 },
        { label: 'May', value: 70 },
        { label: 'Jun', value: 55 },
        { label: 'Jul', value: 80 },
        { label: 'Aug', value: 55 },
        { label: 'Sep', value: 75 },
        { label: 'Oct', value: 50 },
        { label: 'Nov', value: 60 },
        { label: 'Dec', value: 75 }
    ]

    var margins = { top: 5, right: 5, bottom: 5, left: 5 }
    var figureWidth = width - (margins.left - margins.right)
    var figureHeight = height - (margins.top + margins.bottom)

    var transform = `translate( ${margins.left}, ${margins.top})`

    var x = scaleOrdinal()
        .domain(data.map((d, i) => {
            return d.label
        }))
        .range([0, width])

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
        // alert('going')
        data.map((d, i) => (
            <rect
                fill="#74d3eb"
                key={i}
                x={x(d.month)}
                y={y(d.value)}
                height={figureHeight - y(d.value)}
                width={x.range()} />

        ))

    }
    const say = () => {
        return (
            <h1> data </h1>
        )
    }
    return (
        // <svg width={figureWidth} height={figureHeight}>
        //     <g transform={transform}>
        //         {say()}
        //         {rectBackground(data)}
        //         {rectForeground(data)}
        //     </g>
        // </svg>
        <div>
            {say()}
        </div>
    )
}

export default BarChart