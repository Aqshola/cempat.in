import React, { useEffect, useRef, useState } from "react";
import MapGL, { MapRef } from "react-map-gl";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EditorSection from "components/Peta/EditorSection";
import Search from "components/Peta/Search";
import { StoryMarker, PickedMarker } from "components/Peta/Marker";
import Button from "components/Button/Button";
import clsx from "clsx";
import useGet from "hooks/cerita/useGet";
import { ApiLocation, Location } from "types/types";
import DetailStory from "components/Peta/DetailStory";
import removeDuplicate from "hooks/helper/useRemoveDuplicate";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import {
  setSessionStorage,
  getSessionStorage,
} from "hooks/helper/useSessionStorage";

import UserSection from "components/Peta/UserSection";
import HelmetTitle from "components/Helper/HelmetTitle";
import toast, { Toaster } from "react-hot-toast";
import { authStore } from "store/authStore";
import mapboxgl, { LngLat } from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass =require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;


export default function Peta() {

  const authData= authStore(state=>state)
  const mapGlRef = useRef<MapRef | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const latParams = searchParams.get("lat");
  const lngParams = searchParams.get("lng");


  //HOOKS
  const [getMarker, dataMarker, loading] = useGet();


  //STATE

  //STATE FOR HEAD
  const [headContent, setheadContent] = useState<{
    title: string;
    desc: string | null;
  }>({
    title: "Peta",
    desc: null,
  });


  
  //STATE FOR PICKED LOCATION
  const [pickedLocationData, setpickedLocationData] = useState<Location &{
    minLng?: number, 
    minLat?: number, 
    maxLng? : number, 
    maxLat? : number
  } | null>({
    lng: 0,
    lat: 0,
  });

  //STATE FOR USER ACTION
  const [userEvent, setuserEvent] = useState<'netral'|'picking_location'|'picked_location'|"create_story">("netral")

  //STATE FOR SECTION VIEW
  const [detailSectionView, setdetailSectionView] = useState<boolean>(false)
  const [editorSectionView, seteditorSectionView] = useState<boolean>(false)
  const [userSectionView, setuserSectionView] = useState<boolean>(false);

  //STATE FOR COMPONENT KIADED
  const [loadedMap, setloadedMap] = useState<boolean>(false);

  //STATE FOR DATA
  const [listLocation, setlistLocation] = useState<ApiLocation[]>([]);

  //HELPER STATE
  const [isClash, setisClash] = useState(false)
  const [flying, setflying] = useState(false)

  const [initialLocation, setinitialLocation] = useState({
    lat: 106.816666,
    long: -6.2,
  });


  //FUNCTION FOR COMPONENT ACTION
  function storyMarkerAction(dataLocation:ApiLocation){
      if(userEvent==='netral'){
        navigate(`?id=${dataLocation.id}`);
        if(mapGlRef.current && mapGlRef.current.getZoom()<15){
          flyTo(dataLocation.lng,dataLocation.lat)
        }
      }else{
        setisClash(true)
      }
  }

  function handleDetailSectionView(state:boolean){
      setdetailSectionView(state)
      if(state){
        seteditorSectionView(false)
        setuserSectionView(false)
      }
  }

  function handleUserSectionView(state:boolean){
    setuserSectionView(state)
    if(userSectionView){
      setdetailSectionView(false)
      seteditorSectionView(false)
    }
  }

  function handleEditorSectionView(state:boolean){
    seteditorSectionView(state)
    if(state){
      setdetailSectionView(false)
      setuserSectionView(false)
    }
  }

  function pickLocation(obj:mapboxgl.MapLayerMouseEvent){
    const {lat,lng}=obj.lngLat
    const detailData= mapGlRef.current?.queryRenderedFeatures(obj.point)
    
    
    

    if(userEvent==="picking_location" || userEvent==="picked_location"){
      if(!isClash){
        mapGlRef.current?.flyTo({
          center: [lng, lat],
          essential: true,
        })
        setpickedLocationData({
          lat,
          lng,
          place_name:detailData?detailData[0]?.properties?.name:null
        })
        setuserEvent("picked_location")



      }else{
        toast.error("Jangan pilih lokasi yang nimpa orang ya",{
          duration:2000
        })
        setisClash(false)
      }
    }else{
      setisClash(false) 
      setpickedLocationData(null)
    }
  } 

  function cancelPickLocation(){
    setuserEvent("netral")
    setpickedLocationData(null)
    handleEditorSectionView(false)
  }

  
  //FUNCTION STORY USECASE
  function newStory(){
    if(userEvent==="picking_location"){
        toast.error("Hayoo, pilih tempat dulu ya")
    }else{
        if(pickedLocationData){
          if(mapGlRef.current && mapGlRef.current?.getZoom()<15){
            mapGlRef.current?.zoomTo(15)
          }
          handleEditorSectionView(true)
        }
        
    }
  }


  function saveStoryCallback({ lat, lng, id, place_name }: ApiLocation) {
    setlistLocation([...listLocation, { lat, lng, id, place_name }]);
    setpickedLocationData(null)
    setuserEvent("netral")
  }
  
  
  //FUNCTION GET DATA
  function getAllStory() {
    const bound = mapGlRef.current?.getBounds();
    let zoomLevel = mapGlRef.current?.getZoom() || 0;
    setSessionStorage("zoomLevel",zoomLevel)

    
    
    if (bound) {
      const ne = bound.getNorthEast();
      const sw = bound.getSouthWest();
      setSessionStorage("bound",[ne.lng, ne.lat, sw.lng,  sw.lat])
      
      // setSessionStorage("bound",[ne.lat, sw.lat, ne.lng, sw.lng])
      if(zoomLevel >= 10){
        getMarker(ne.lng, sw.lng, ne.lat, sw.lat);
      }
    }
    // else{
    //   const sessionBound=getSessionStorage("bound") as any
    //   console.log(sessionBound)
    //   if(sessionBound){
    //     mapGlRef.current?.fitBounds([sessionBound.ne.lng,  sessionBound.sw.lng, sessionBound.ne.lat, sessionBound.sw.lat])
    //     console.log(sessionBound)
    //     getMarker(sessionBound.ne.lng,  sessionBound.sw.lng, sessionBound.ne.lat, sessionBound.sw.lat);
    //   }
    // }
  }

  function getCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((e) => {
        setinitialLocation({
          lat: e.coords.longitude,
          long: e.coords.latitude,
        });
      });
    } else {
      toast.error("Yah, browser kamu belum support lokasi nih 😟");
    }
  }

  

  //FUNCTION HELPER
  function viewLocation(
    lat: number,
    long: number,
    bbox: [number, number, number, number],
    type: string
  ) {
    if (type === "poi") {
      mapGlRef.current?.flyTo({
        center: [lat, long],
        essential: true,
        zoom: 15,
      });
    } else {
      mapGlRef.current?.fitBounds(bbox, {
        zoom: 15,
      });
    }
  }

  function handleTitleHelmet(title: string, desc: string | null) {
    setheadContent({
      title,
      desc,
    });
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
        zoom:15,
        duration:2000,
      });
    }, 0);
    // mapGlRef.current?.on("flyend", () => {
    //   console.log('sasa')
    //   setflying(false)
    // });

    // mapGlRef.current?.on("moveend", () => {
    //   if (flying) {
    //     setflying(false)
    //   }
    // });
  }

  

  


  
  useEffect(() => {
    getCurrentPosition();
    let localData = getSessionStorage<ApiLocation[]>("list_location");
    if (localData != null) {
      setlistLocation([...localData]);
    }
  }, []);

  useEffect(() => {
    getCurrentPosition();
    let localData = getSessionStorage<ApiLocation[]>("list_location");
    if (localData == null) {
      const bound = mapGlRef.current?.getBounds();
      if (bound) {
        const ne = bound.getNorthEast();
        const sw = bound.getSouthWest();
        getMarker(ne.lng, sw.lng, ne.lat, sw.lat);
      }
    }
  }, [mapGlRef.current]);

  useEffect(() => {
    if (!loading && dataMarker.data.length > 0) {
      const pushedArray = removeDuplicate(listLocation, dataMarker.data, "id");
      if (pushedArray.length > 0) {
        setlistLocation([...pushedArray]);
        setSessionStorage<ApiLocation[]>("list_location", listLocation);
      }
    }
  }, [loading, dataMarker.data]);

  useEffect(() => {
    if (loadedMap) {
      if (latParams && lngParams) {
        let flying = true;
        mapGlRef.current?.flyTo({
          center: [parseFloat(lngParams), parseFloat(latParams)],
          essential: true,
          zoom: 15,
        });

        mapGlRef.current?.on("flyend", () => {
          flying = false;
        });

        mapGlRef.current?.on("moveend", () => {
          if (flying) {
            flying = false;
          }
        });
      }
    }
  }, [loadedMap, latParams, lngParams]);

  

  return (
    <>
      <HelmetTitle title={headContent.title} description={headContent.desc} />
      <Toaster />
      <div className="h-screen" id="nav-btn" aria-label="nav-btn">
        <Search handleSearch={viewLocation} />

        {!authData.isAuth && (
          <div className="absolute left-5 md:left-10 top-10 w-64 md:w-auto z-10">
            <Link to={"/"} className=" rounded-md p-2 font-bold font-nunito bg-white w-10 h-10 flex" >
              <img className="w-full" src="/icon/filled/cempatin-logo-filled.svg" alt="cempatin logo" />
            </Link>
          </div>
        )}

        <MapGL
        fog={{
          range:[0.8, 8],
          color:"#dc9f9f",
          "horizon-blend":0.5,
        }}
          
          keyboard={true}
          onLoad={() => {
            getAllStory();
          }}
          reuseMaps={true}
          onMoveEnd={getAllStory}
          onZoomEnd={getAllStory}
          optimizeForTerrain={true}
          ref={(e) => {
            mapGlRef.current = e;

            if (mapGlRef.current !== null) {
              setloadedMap(true);
            }
          }}
          onClick={pickLocation}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          initialViewState={{
            bounds:getSessionStorage("zoomLevel")?getSessionStorage("bound")|| undefined:undefined,
            longitude: initialLocation.lat,
            latitude: initialLocation.long,
            zoom: getSessionStorage("zoomLevel")|| 10,
          }}
          attributionControl={false}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {pickedLocationData && (userEvent==="picking_location" || userEvent==="picked_location")  &&(
            <PickedMarker
              markerId={`${pickedLocationData.lat} - ${pickedLocationData.lat}`}
              className="z-10"
              lat={pickedLocationData.lat}
              lng={pickedLocationData.lng}
            />
          )}

          {listLocation.map((loc, i) => (
            <StoryMarker
              markerId={loc.id.toString()}
              key={i}
              onClick={(()=>storyMarkerAction(loc))}
              lat={loc.lat}
              lng={loc.lng}
            />
          ))}
        </MapGL>

        <DetailStory
          authData={authData}
          flying={flyTo}
          handleHelmetTitle={handleTitleHelmet}
          handleDetailView={handleDetailSectionView}
          stateDetailView={detailSectionView}
          stateFlying={flying}
          zoomLevel={mapGlRef.current?.getZoom()}
          
        />
        <UserSection
          handleHelmetTitle={handleTitleHelmet}
          showEditor={userSectionView}
          handleUserView={handleUserSectionView}
          stateUserView={userSectionView}
          handleView={() => {
            setuserSectionView(true);
          }}
        />
        {authData.isAuth && (
          <>
            <EditorSection
              showEditor={editorSectionView}
              handleEditorView={handleEditorSectionView}
              onSaveEditor={saveStoryCallback}
              infoLocation={pickedLocationData}
            />

            <Button
              variant="danger"
              onClick={cancelPickLocation}
              className={clsx(
                "shadow w-max absolute left-10 md:left-40 bottom-20 md:right-20",
                (userEvent==="picked_location" || userEvent==="picking_location") && ["visible opacity-100"],
                (userEvent !=="picked_location" && userEvent !=="picking_location") && [" invisible opacity-0"]
              )}
            >
              Batal
            </Button>

            <Button
              onClick={()=>{setuserEvent("picking_location")}}
              className={clsx(
                "absolute  right-5 bottom-20 md:right-20 shadow",
                userEvent==="netral" && ["visible opacity-100"],
                userEvent!=="netral" && [" invisible opacity-0"]
              )}
              variant={"primary"}
            >
              Buat Cerita
            </Button>

            <Button
              onClick={newStory}
              className={clsx(
                "absolute  right-5 bottom-20 md:right-20 shadow",
                userEvent ==="picked_location" && ["visible opacity-100"],
                userEvent !== "picked_location" && [" invisible opacity-0"]
              )}
              variant={"secondary"}
            >
              Pilih lokasi
            </Button>
          </>
        )}

        {!authData.isAuth && (
          <Button
            onClick={()=>navigate("/login")}
            className="absolute  right-5 bottom-20 md:right-20 shadow"
            variant={"primary"}
          >
            Buat Cerita
          </Button>
        )}
      </div>
    </>
  );
}
