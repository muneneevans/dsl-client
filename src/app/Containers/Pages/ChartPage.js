import React from 'react'
import MapChart from "../../Components/Charts/MapChart"
import kenya from "../../Components/Charts/kenya"
import BarChart from "../../Components/Charts/BarChart"
// import DotChart from "../../Components/Charts/DotChart"
import LineChart from "../../Components/Charts/LineChart"
import HorizontalBarChart from "../../Components/Charts/HorizontalBarChart"
import NivoBarChart from "../../Components/Charts/Nivo/BarChart"

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
    let Nivodata =  [{"month":7,"\"LOPINAVIR /RITONAVIR TABLETS - 200/50MG\"":800,"\"ZIDOVUDINE /LAMIVUDINE /NEVIRAPINE - 300/150/200MG\"":1200,"\"ZIDOVUDINE/LAMIVUDINE/ TABLETS - 300/150MG\"":5200,"\"LOPINAVIR /RITONAVIR ORAL SOLUTION - 80/20MG/ML\"":16,"\"ATAZANAVIR/RITONAVIR 300/100 MG TABLET\"":120,"\"TENOFOVIR300MG /LAMIVUDINE300MG TABLETS\"":1329,"\"ZIDOVUDINE (AZT) TABLETS  - 300MG\"":10,"\"NEVIRAPINE TABLETS - 200MG\"":1662,"\"NEVIRAPINE ORAL SUSPENSION - 10MG/ML\"":270,"\"LAMIVUDINE TABLETS - 150MG\"":255,"\"COTRIMOXAZOLE 960MG TABLETS 100S\"":3000,"\"DAPSONE 100MG TABLETS 100'S\"":150,"\"TENOFOVIR 300MG/LAMIVUDINE 300MG /EFAVIRENZ  600MG\"":5700,"\"ABACAVIR/LAMIVUDINE/ TABLETS 60/30MG\"":579},{"month":10,"\"PYRAZINAMIDE TABLETS - 500MG\"":24,"\"TB PATIENT PACK CATEGORY I&III 6M\"":108}]
    let keys = ["LOPINAVIR /RITONAVIR TABLETS - 200/50MG","ZIDOVUDINE /LAMIVUDINE /NEVIRAPINE - 300/150/200MG","ZIDOVUDINE/LAMIVUDINE/ TABLETS - 300/150MG","LOPINAVIR /RITONAVIR ORAL SOLUTION - 80/20MG/ML","ATAZANAVIR/RITONAVIR 300/100 MG TABLET","TENOFOVIR300MG /LAMIVUDINE300MG TABLETS","ZIDOVUDINE (AZT) TABLETS  - 300MG","NEVIRAPINE TABLETS - 200MG","NEVIRAPINE ORAL SUSPENSION - 10MG/ML","LAMIVUDINE TABLETS - 150MG","COTRIMOXAZOLE 960MG TABLETS 100S","DAPSONE 100MG TABLETS 100'S","TENOFOVIR 300MG/LAMIVUDINE 300MG /EFAVIRENZ  600MG","ABACAVIR/LAMIVUDINE/ TABLETS 60/30MG","PYRAZINAMIDE TABLETS - 500MG","TB PATIENT PACK CATEGORY I&III 6M"]


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