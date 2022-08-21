import React from "react";
import MapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

type Props = {};

export default function DummyMap() {
  return (
    <div className="w-full h-[300px] mt-10 md:mt-0  md:h-[600px] relative rounded-[50px] overflow-hidden   shadow-map-card ">
      <MapGL
        reuseMaps={true}
        optimizeForTerrain={true}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        initialViewState={{
          longitude: 106.816666,
          latitude: -6.2,
          zoom: 15,
        }}
        attributionControl={false}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        style={{
          width: "100%",
          height: "100%",
        }}
      ></MapGL>
    </div>
  );
}
