import React from 'react'
import { VictoryChart, VictoryAxis, VictoryBar, VictoryTheme, VictoryGroup } from 'victory'
import { Segment, Dimmer, Loader, Image } from 'semantic-ui-react'

export const BarChart = (props) => {
    return (
        props.countySummaryIsFetched ? (
            <Segment>
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={20}>
                    <VictoryBar
                        horizontal

                        data={props.countySummaryChartData}
                        x='constituency_name'
                        y='number_of_facilities'
                    />
                </VictoryChart>
            </Segment>
        ) : (
                <Segment>
                    <Dimmer active inverted>
                        <Loader inverted>Loading</Loader>
                    </Dimmer>

                    <Image src='https://react.semantic-ui.com/assets/images/wireframe/short-paragraph.png' />
                </Segment>
            )
    )
}

// export const BarChart = (props) => {
//     const data = [
//         { quarter: 1, earnings: 13000 },
//         { quarter: 2, earnings: 16500 },
//         { quarter: 3, earnings: 14250 },
//         { quarter: 4, earnings: 19000 }
//     ];
//     const getTicks = (data) => {
//         const tickArray = []
//         data.map((item, i) => {
//             tickArray.push(i +1)
//         })
//         return tickArray
//     }
//     const getTickFormat = (data) =>{
//         const tickFormatArray = []
//         data.map((item,i) => {

//         })
//     }
//     return (
//         <div>
//             <VictoryChart
//                 theme={VictoryTheme.material}
//                 domainPadding={20}>
//                 <VictoryAxis
//                     // tickValues specifies both the number of ticks and where
//                     // they are placed on the axis
//                     tickValues={getTicks(data)}
//                     tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
//                 />
//                 <VictoryAxis
//                     dependentAxis
//                     // tickFormat specifies how ticks should be displayed
//                     tickFormat={(x) => (`$${x / 1000}k`)}
//                 />
//                 <VictoryBar
//                     data={data}
//                     x='quarter'
//                     y='earnings' />
//             </VictoryChart>
//         </div>
//     )
// }

export default BarChart