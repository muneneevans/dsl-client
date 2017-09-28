import React from 'react'
import MapChart from "../Components/Charts/MapChart"
import kenya from "../Components/Charts/kenya"
import BarChart from "../Components/Charts/BarChart"
// import DotChart from "../Components/Charts/DotChart"
import LineChart from "../Components/Charts/LineChart"
import HorizontalBarChart from "../Components/Charts/HorizontalBarChart"
import NivoBarChart from "../Components/Charts/Nivo/BarChart"

// const kenya = require('../Components/Charts/kenya.json')

export const ChartScreen = (props) => {

    var data = [
        { label: '02-11-2016', value: 180 },
        { label: '02-12-2016', value: 250 },
        { label: '02-13-2016', value: 150 },
        { label: '02-14-2016', value: 496 },
        { label: '02-15-2016', value: 140 },
        { label: '02-16-2016', value: 380 },
        { label: '02-17-2016', value: 100 },
        { label: '02-18-2016', value: 150 }
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
    let Nivodata = [{"country":"AD","hot dog":191,"burger":102,"sandwich":89,"kebab":181,"fries":154,"donut":92},{"country":"AE","hot dog":55,"burger":168,"sandwich":13,"kebab":104,"fries":130,"donut":26},{"country":"AF","hot dog":0,"burger":20,"sandwich":181,"kebab":174,"fries":53,"donut":122},{"country":"AG","hot dog":133,"burger":52,"sandwich":40,"kebab":131,"fries":103,"donut":24},{"country":"AI","hot dog":119,"burger":67,"sandwich":50,"kebab":196,"fries":197,"donut":82},{"country":"AL","hot dog":175,"burger":164,"sandwich":195,"kebab":118,"fries":165,"donut":15},{"country":"AM","hot dog":146,"burger":123,"sandwich":45,"kebab":96,"fries":29,"donut":20}]
    let keys = [
        "hot dog",
        "burger",
        "sandwich",
        "kebab",
        "fries",
        "donut"
    ]

    return (
        <div>
            {/* <LineChart 
                data={data}
                width={700}
                height={400}
                /> */}
            {/* <BarChart 
                data={data2}
                height              
                width={700}
                height={500}
                /> */}

            {/* <HorizontalBarChart
                data={data2}
                width={500}
                height={500}
            /> */}
            {/* <MapChart
                data={kenya}
                height={800}
                width={800} /> */}
            <NivoBarChart data={Nivodata} keys={keys} height={500} width={900}
                indexBy="country"/>
        </div>
    )
}

export default ChartScreen