import React, { Component } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import worldData from "./kenya"
class WorldMap extends Component {
    constructor() {
        super();
        this.state = {
            featureCollection: {},
            worldData: []
        }
    }

    projection(data) {
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


    componentDidMount() {
        let featureCollection = feature(worldData, worldData.objects.kenya);
        this.setState({
            featureCollection: featureCollection,
            worldData: featureCollection.features
        })
    }

    render() {
        let p = this.projection(this.state.featureCollection);
        return (
            <div>
                <svg style={{ height: "auto", width: "auto", maxHeight: "100%", maxWidth: "100%" }} viewBox="0 0 1000 1000">
                    <g className="countries">
                        {
                            this.state.worldData.map((d, i) => (
                                <path
                                    key={`path-${i}`}
                                    d={geoPath().projection(p)(d)}
                                    className="country"
                                    fill={`rgba(38,50,56,${1 / this.state.worldData.length * i})`}
                                    stroke="#FFFFFF"
                                    strokeWidth={0.5}
                                />
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
        );
    }
}

export default WorldMap
