import React, { useEffect, useRef, useState } from "react";
import MapGL, { MapRef, Source } from "react-map-gl";
import { FeatureCollection } from "geojson";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { StoryMarker } from "components/Peta/Marker";

import { authStore } from "store/authStore";
import mapboxgl, { FeatureIdentifier, LngLat } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import useSortedUserStory from "hooks/journey/useSortedUserStory";
import { useParams, useSearchParams } from "react-router-dom";
import { ApiLocation } from "types/types";

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass =require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export default function Journey() {
  //HOOKS
  const { username } = useParams();
  const [getStory, resultStory, loadingStory] = useSortedUserStory();

  //DATA


  //STATE

  const [initialLocation, setinitialLocation] = useState({
    lat: 106.816666,
    long: -6.2,
  });

  const [listLocation, setlistLocation] = useState<ApiLocation[]>([]);

  useEffect(() => {
    if (username) {
      getStory(username);
    }
  }, [username]);

  useEffect(() => {
    if (!loadingStory) {
      setlistLocation([...resultStory.data]);
    }
  }, [loadingStory]);



  const geojson: FeatureCollection = {
    type: 'FeatureCollection',
    features: [{ type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [-122.4, 37.8] } }],
  };

  


  return (
    <>
      <div className="h-screen w-full flex" id="nav-btn" aria-label="nav-btn">
        {/* <Source type="geojson"
          data={geojson}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
          > */}
          <MapGL
            reuseMaps={true}
            optimizeForTerrain={true}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            initialViewState={{
              longitude:
                listLocation.length > 0
                  ? listLocation[0].lng
                  : initialLocation.lat,
              latitude:
                listLocation.length > 0
                  ? listLocation[0].lat
                  : initialLocation.long,
              zoom: 9,
            }}
            attributionControl={false}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            {listLocation.map((loc, i) => (
              <StoryMarker markerId={i} key={i} lat={loc.lat} lng={loc.lng} />
            ))}
          </MapGL>
        {/* </Source> */}
      </div>
    </>
  );
}
