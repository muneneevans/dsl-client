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
    let Nivodata = [{"61829":0,"61901":0,"month":"12"},{"61829":0,"61901":0,"month":"10"},{"61829":0.015625,"61901":0,"month":"1"},{"61829":0.11666666666666667,"61901":0,"month":"2"},{"61829":0.061224489795918366,"61901":0,"month":"3"},{"61829":0.020833333333333332,"61901":0,"month":"4"},{"61829":0.014492753623188406,"61901":0,"month":"5"},{"61829":0.08163265306122448,"61901":0,"month":"6"},{"61829":0.027777777777777776,"61901":0,"month":"7"},{"61829":0.045454545454545456,"61901":0,"month":"8"},{"61829":0.13157894736842105,"61901":0.8,"month":"9"},{"61829":0.08333333333333333,"61901":0,"month":"11"}]
    let keys = [
        "61829",
        "61901"
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
                indexBy="month"/>
        </div>
    )
}

export default ChartScreen