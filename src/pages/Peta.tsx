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
import mapboxgl from 'mapbox-gl';
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
  const id = searchParams.get("id");

  


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

  const [pickLocation, setpickLocation] = useState<boolean>(false);
  const [pickedLocation, setpickedLocation] = useState<Location | null>({
    lng: 0,
    lat: 0,
  });

  const [pickedLocationData, setpickedLocationData] = useState<Location | null>({
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


  



  //FUNCTION FOR COMPONENT ACTION
  function storyMarkerAction(dataLocation:ApiLocation){
      if(userEvent=='netral'){
        navigate(`?id=${dataLocation.id}`);
        flyTo(dataLocation.lng,dataLocation.lat)
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

  function newStory(){
    if(userEvent==="picking_location"){
        toast.error("Hayoo, pilih tempat dulu ya")
    }else{
      handleDetailSectionView(true)
    }
  }

  function cancelNewStory(){
    setpickedLocationData(null)
    handleEditorSectionView(false)
    setuserEvent("netral")
  }


  
  const [showEditor, setshowEditor] = useState<boolean>(false);

  const [initialLocation, setinitialLocation] = useState({
    lat: 106.816666,
    long: -6.2,
  });

  const [storyDetailView, setstoryDetailView] = useState<boolean>(false);

  const [viewStory, setviewStory] = useState<ApiLocation>({
    lat: 0,
    lng: 0,
    id: 0,
    jml_cerita: 0,
    place_name: "",
  }); 

  function _saveCallback({ lat, lng, id, place_name }: ApiLocation) {
    setlistLocation([...listLocation, { lat, lng, id, place_name }]);
    setpickLocation(false);
  }

  function _pickLocation(obj: any) {
    const { lng, lat } = obj.lngLat;

    mapGlRef.current?.flyTo({
      center: [lng, lat],
      essential: true,
    });

    const detail = mapGlRef.current?.queryRenderedFeatures(obj.point);

    if(!isClash){
      if (pickLocation) {
        setpickedLocation({
          lng,
          lat,
          place_name: detail ? detail[0]?.properties?.name : null,
        });
      }
    }else{
      setpickedLocation(null)
      
      setisClash(false)
    }
  }

  function _cancelPick() {
    setshowEditor(false);
    setpickedLocation(null);
    setpickLocation(false);
  }

  function _newStory() {
    if (pickLocation) {
      if (
        !pickedLocation ||
        (pickedLocation.lat === 0 && pickedLocation.lng === 0)
      ) {
        toast.error("Hayoo, pilih tempat dulu ya");
      } else {
        setshowEditor(true);
      }
    } else {
      setpickLocation(true);
    }
  }

  function _handleGet() {
    const bound = mapGlRef.current?.getBounds();
    let zoomLevel = mapGlRef.current?.getZoom() || 0;

    if (zoomLevel >= 10 && bound) {
      const ne = bound.getNorthEast();
      const sw = bound.getSouthWest();

      getMarker(ne.lng, sw.lng, ne.lat, sw.lat);
    }
  }

  function _getCurrentPosition() {
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

  function _handleStoryView(count: number, data: ApiLocation) {
    setviewStory(data);
    navigate(`?id=${data.id}`);
    setstoryDetailView(true);
    setuserSectionView(false);
  }

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
    _getCurrentPosition();
    let localData = getSessionStorage<ApiLocation[]>("list_location");
    if (localData != null) {
      setlistLocation([...localData]);
    }
  }, []);

  useEffect(() => {
    _getCurrentPosition();
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

  useEffect(() => {
    if (id) {
      setstoryDetailView(true);
    }
  }, [id]);

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
          onLoad={() => {
            _handleGet();
          }}
          reuseMaps={true}
          onMoveEnd={_handleGet}
          onZoomEnd={_handleGet}
          optimizeForTerrain={true}
          ref={(e) => {
            mapGlRef.current = e;

            if (mapGlRef.current !== null) {
              setloadedMap(true);
            }
          }}
          onClick={(el) => _pickLocation(el)}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          initialViewState={{
            longitude: initialLocation.lat,
            latitude: initialLocation.long,
            zoom: 10,
          }}
          attributionControl={false}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {pickedLocation && (
            <PickedMarker
              markerId={1}
              className="z-10"
              lat={pickedLocation.lat}
              lng={pickedLocation.lng}
            />
          )}

          {listLocation.map((loc, i) => (
            <StoryMarker
              markerId={i}
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
          viewData={viewStory}
          handleDetailView={handleDetailSectionView}
          stateDetailView={detailSectionView}
          stateFlying={flying}
          
        />
        {/* <UserSection
          handleHelmetTitle={handleTitleHelmet}
          viewData={viewStory}
          showEditor={userSectionView}
          onCloseEditor={() => {
            setuserSectionView(false);
          }}
          onOutsideEditor={() => {
            setuserSectionView(false);
          }}
          handleView={() => {
            setuserSectionView(true);
          }}
        />
        {isAuth && (
          <>
            <EditorSection
              showEditor={showEditor}
              onCloseEditor={() => {
                setshowEditor(false);
              }}
              onSaveEditor={_saveCallback}
              onOutsideEditor={() => {
                setshowEditor(false);
              }}
              infoLocation={pickedLocation}
            />

            <Button
              variant="danger"
              onClick={_cancelPick}
              className={clsx(
                "shadow w-max absolute left-10 md:left-40 bottom-20 md:right-20",
                pickLocation && ["visible opacity-100"],
                !pickLocation && [" invisible opacity-0"]
              )}
            >
              Batal
            </Button>

            <Button
              onClick={_newStory}
              className={clsx(
                "absolute  right-5 bottom-20 md:right-20 shadow",
                !pickLocation && ["visible opacity-100"],
                pickLocation && [" invisible opacity-0"]
              )}
              variant={"primary"}
            >
              Buat Cerita
            </Button>

            <Button
              onClick={_newStory}
              className={clsx(
                "absolute  right-5 bottom-20 md:right-20 shadow",
                pickLocation && ["visible opacity-100"],
                !pickLocation && [" invisible opacity-0"]
              )}
              variant={"secondary"}
            >
              Pilih lokasi
            </Button>
          </>
        )}

        {!isAuth && (
          <Button
            onClick={()=>navigate("/login")}
            className="absolute  right-5 bottom-20 md:right-20 shadow"
            variant={"primary"}
          >
            Buat Cerita
          </Button>
        )} */}
      </div>
    </>
  );
}
