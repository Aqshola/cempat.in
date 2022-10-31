import React, { useEffect, useRef, useState } from "react";
import MapGL, { MapRef, Source,Layer } from "react-map-gl";
import { FeatureCollection } from "geojson";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { StoryMarker } from "components/Peta/Marker";

import { authStore } from "store/authStore";
import mapboxgl, { FeatureIdentifier, LngLat } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import useSortedUserStory from "hooks/journey/useSortedUserStory";
import { Route, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ApiLocation } from "types/types";
import DetailStory from "components/Peta/DetailStory";
import Button from "components/Button/Button";
import UserSection from "components/Peta/UserSection";

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass =require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export default function Journey() {
  //REF
  const mapGlRef = useRef<MapRef|null>()
  //HOOKS
  const navigate=useNavigate()
  const { username } = useParams();
  const [getStory, resultStory, loadingStory] = useSortedUserStory();

  //DATA
  const authData=authStore(state=>state)

  //STATE

  const [detailView, setdetailView] = useState(false)
  const [userSectionView, setuserSectionView] = useState(false)
  
  const [initialLocation, setinitialLocation] = useState({
    lat: 106.816666,
    long: -6.2,
  });

  const [listLocation, setlistLocation] = useState<ApiLocation[]>([]);

  const [flying, setflying] = useState(false)

  function handleDetailView(state:boolean){
    setdetailView(state)
  }

  function handleUserSection(state:boolean){
    setuserSectionView(state)
  }

  function flyTo(lng:number, lat:number){
    mapGlRef.current?.once("moveend",()=>{
      if(flying){
        setflying(false)
      }
    })
    setTimeout(() => {
      mapGlRef.current?.flyTo({
        center: [lng, lat],
        essential: true,
        zoom:10,
        duration:2000,
      });
    }, 0);
  }

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

  const geojson:FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {type: 'Feature', geometry: {type: "LineString",
      coordinates: [
        ...listLocation.map(el=>[el.lng,el.lat])
      ]},properties:null}
    ]
  };

  function markerAction(dataLocation:ApiLocation){
        flyTo(dataLocation.lng,dataLocation.lat)
      navigate(`?id=${dataLocation.id}`)
  } 

  

  

  

  return (
    <>
      <div className="h-screen w-full flex relative" id="nav-btn" aria-label="nav-btn">
        <div className="absolute top-10 left-5 z-40">
          <Button variant="invert_primary" onClick={()=>navigate("/peta")}>Back</Button>
        </div>

        <div className="absolute top-10 z-30 w-screen mx-auto max-w-screen-2xl flex justify-center">
            <div className="py-2 px-5 bg-white rounded font-nunito shadow-journey-box text-center w-[200px] transition-shadow cursor-pointer">
              <p>
                Riwayat  <span className="font-bold text-green-primary">{username}</span>
              </p>
            </div>
        </div>
        <MapGL
        ref={(e) => {
          mapGlRef.current = e;
        }}
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
          <Source
            type="geojson"
            id="polylineLayer" 
            data={geojson}
          >
            <Layer
            id="lineLayer"
            type="line"
            source="route"
            layout={{
              
              "line-join": "round",
              "line-cap": "round"
            }}
            paint={{
              
              "line-color": "#0B4619",
              "line-width": 2.5,
              "line-opacity":0.8,
              "line-translate-anchor":"viewport"
            }}
          />
            {listLocation.map((loc, i) => (
              <StoryMarker onClick={()=>markerAction(loc)} markerId={loc.id.toString()} key={loc.id} lat={loc.lat} lng={loc.lng} />
            ))}
          </Source>
        </MapGL>
        <DetailStory authData={authData} handleDetailView={handleDetailView} stateDetailView={detailView} flying={flyTo} stateFlying={false}/>
        <UserSection handleView={()=>handleUserSection(true)} handleUserView={handleUserSection} stateUserView={userSectionView} showEditor={userSectionView} />
      </div>
    </>
  );
}
