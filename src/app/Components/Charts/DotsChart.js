import React from 'react'

export const DotChart = (props) => {

    

    var chartData = data.splice(1)
    chartData.pop()

    var circles = chartData.map((d,i) =>{
        return(
            <circle 
                className='dot' fill="#7dc7f4" stroke="3f5175"
                cx={x(d.date)} cy={y(d.count)}
                strokeWidth="5px" key={i}/>
        )
    })
    return(
        <g>
            {circles}
        </g>
    )
}

export default DotChart