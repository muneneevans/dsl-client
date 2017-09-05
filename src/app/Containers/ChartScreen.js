import React from 'react'
import MapChart from "../Components/Charts/MapChart"
import kenya from "../Components/Charts/kenya"
import BarChart from "../Components/Charts/BarChart"
// import DotChart from "../Components/Charts/DotChart"
import LineChart from "../Components/Charts/LineChart"
import HorizontalBarChart from "../Components/Charts/HorizontalBarChart"

// const kenya = require('../Components/Charts/kenya.json')

export const ChartScreen = (props) => {
    
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


    var data2 = [
        { label: 'Feb', value: 50 },
        { label: 'Jan', value: 40 },
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
    

    return (
        <div>
            <LineChart 
                data={data}
                height              width={700}
                height={500}
                />

            <HorizontalBarChart
                data={data2}
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