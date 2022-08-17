import React, { useEffect, useRef, useState } from "react";
import MapGL, { MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
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
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  setSessionStorage,
  getSessionStorage,
} from "hooks/helper/useSessionStorage";

import UserSection from "components/Peta/UserSection";
import HelmetTitle from "components/Helper/HelmetTitle";
import toast, { Toaster } from "react-hot-toast";
import { authStore } from "store/authStore";

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
// mapboxgl.workerClass =
//   require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

/*
 *TODO: Fetch location by bounding box ✅
 *TODO: Get story detail ✅
 *TODO: Add Toast ✅
 */

export default function Peta() {
  const isAuth = authStore((state) => state.isAuth);
  const mapGlRef = useRef<MapRef | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const latParams = searchParams.get("lat");
  const lngParams = searchParams.get("lng");
  const id = searchParams.get("id");

  const [headContent, setheadContent] = useState<{
    title: string;
    desc: string | null;
  }>({
    title: "Peta",
    desc: null,
  });

  const [pickLocation, setpickLocation] = useState<boolean>(false);

  const [pickedLocation, setpickedLocation] = useState<Location | null>({
    lng: 0,
    lat: 0,
  });
  const [showEditor, setshowEditor] = useState<boolean>(false);

  const [initialLocation, setinitialLocation] = useState({
    lat: 106.816666,
    long: -6.2,
  });

  const [loadedMap, setloadedMap] = useState<boolean>(false);

  const [listLocation, setlistLocation] = useState<ApiLocation[]>([]);

  const [getMarker, dataMarker, loading] = useGet();

  const [storyDetailView, setstoryDetailView] = useState<boolean>(false);

  const [viewStory, setviewStory] = useState<ApiLocation>({
    lat: 0,
    lng: 0,
    id: 0,
    jml_cerita: 0,
    place_name: "",
  });

  const [userSectionView, setuserSectionView] = useState<boolean>(false);

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

    if (pickLocation) {
      setpickedLocation({
        lng,
        lat,
        place_name: detail ? detail[0]?.properties?.name : null,
      });
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
              onClick={() => {
                if (!pickLocation) {
                  _handleStoryView(loc.jml_cerita || 0, loc);
                }
              }}
              lat={loc.lat}
              lng={loc.lng}
            />
          ))}
        </MapGL>

        <DetailStory
          handleHelmetTitle={handleTitleHelmet}
          viewData={viewStory}
          showEditor={storyDetailView}
          onCloseEditor={() => {
            setstoryDetailView(false);
          }}
          onOutsideEditor={() => {
            setstoryDetailView(false);
          }}
        />
        <UserSection
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
        )}
      </div>
    </>
  );
}
