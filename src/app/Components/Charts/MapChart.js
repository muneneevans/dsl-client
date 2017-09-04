import React from 'react'
import { feature } from "topojson-client";
import { geoMercator, geoPath } from "d3-geo";
import { json } from "d3"

export const MapChart = ({ data, width, height }) => {
    const dataMap = feature(data, data.objects.kenya2).features    
    var projection = () => {
        return geoMercator()
            .scale(600)
            .center([,])            
            .translate([width/2, height/2  ])
    }
    var data = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson";
    return (
        <div>
            <h1>Map</h1>
            <svg width={width} height={height}  >
                <g className="countries" >
                    {
                        dataMap.map((d, i) => (
                            <path
                                onClick={() => { alert(`${d}`) }}
                                key={`path-${i}`}
                                d={geoPath().projection(projection())(d)}
                                className="country"
                                fill={`rgba(38,50,56,${1 / dataMap.length * i})`}
                                stroke="#FFFFFF"
                                strokeWidth={0.5}
                            />
                        ))
                    }
                </g>
                
            </svg>
        </div>
    )
}

export default MapChart