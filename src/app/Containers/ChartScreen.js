import React from 'react'
import MapChart from "../Components/Charts/MapChart"
import kenya from "../Components/Charts/kenya"
import BarChart from "../Components/Charts/BarChart"

// const kenya = require('../Components/Charts/kenya.json')

export const ChartScreen = (props) => {
    // console.log(kenya)
    return (
        <div>
            <BarChart
                width={500}
                height={500}
            />
            {/* <MapChart
                data={kenya}
                height={800}
                width={800} /> */}
        </div>
    )
}

export default ChartScreen