import React, { Component } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import {scaleLinear} from "d3-scale"
import someMapData from "./kenya"


export const MapChart = (props) => {    
    const featureCollection = feature(someMapData, someMapData.objects.subunits);
    const mapData = featureCollection.features

    const projection = (data) => {
        let height = 500;
        let width = 1000;
        // Create a unit projection.
        var projection = geoMercator()
            .scale(1)
            .translate([0, 0]);

        // Create a path generator.
        var path = geoPath()
            .projection(projection);

        // Compute the bounds of a feature of interest, then derive scale & translate.
        var b = path.bounds(data),
            s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
            t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

        // Update the projection to use computed scale & translate.
        return projection
            .scale(s)
            .translate(t);
    }

    const linearPalleteScale = (value) => {
        // const dataValues = this.props.regionData.map(function(data) { return data.value });
        const minVal = Math.min(...props.data.countyCodeFacilityCount);
        const maxVal = Math.max(...props.data.countyCodeFacilityCount);        
        return scaleLinear().domain([minVal, maxVal]).range(["#EFEFFF","#F44336"])(value);
      }

    const p = projection(featureCollection);    
    return (
        <div>
            <svg style={{ height: "auto", width: "auto", maxHeight: "100%", maxWidth: "100%" }} viewBox="0 0 1000 1000">
                <g className="countries">
                    {
                        mapData.map((d, i) => (
                            <path
                                key={`path-${i}`}
                                d={geoPath().projection(p)(d)}
                                className="county"
                                fill={linearPalleteScale( props.data.countyCodeFacilityCount[d.properties.COUNTY3_ID]) }
                                stroke="#FFFFFF"
                                strokeWidth={0.5}
                                value={props.data.countyCodeFacilityCount[d.properties.COUNTY3_ID]}
                                name={d.properties.COUNTY}
                                code={d.properties.COUNTY3_ID}>
                                </path>
                        ))
                    }
                </g>
                <g className="markers">
                    <circle
                        cx={p([8, 48])[0]}
                        cy={p([8, 48])[1]}
                        r={10}
                        fill="#E91E63"
                        className="marker"
                    />
                </g>
            </svg>
        </div>
    )
}




export default MapChart
