import React, { useEffect, useRef, useState } from "react";
import MapGL, { MapRef } from "react-map-gl";
import { GiHamburgerMenu } from "react-icons/gi";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { sideNavStore } from "store/navStore";
import EditorSection from "components/Main/EditorSection";
import Search from "components/Main/Search";
import LocationStory from "components/Main/LocationStory";
import { StoryMarker, PickedMarker } from "components/Main/Marker";

type location = {
  lng: number;
  lat: number;
  name?: string | null;
};

const DummyLocation: location[] = [
  {
    lng: 106.90352863381321,
    lat: -6.155869565812196,
  },
  {
    lng: 106.7779687262435,
    lat: -6.2247635894896405,
  },
  {
    lng: 106.84203073952887,
    lat: -6.21108910838403,
  },
];

export default function Main() {
  const { showSideNav } = sideNavStore((state) => state);
  const [pickLocation, setpickLocation] = useState<boolean>(false);
  const [pickedLocation, setpickedLocation] = useState<location | null>({
    lng: 0,
    lat: 0,
  });
  const [showEditor, setshowEditor] = useState<boolean>(false);

  const [showStory, setshowStory] = useState<boolean>(false);
  const [initialLocation, setinitialLocation] = useState({
    lat: 106.816666,
    long: -6.2,
  });

  const [zoomLevel, setzoomLevel] = useState<number | any>(10);

  const mapGlRef = useRef<MapRef | null>(null);

  const _pickLocation = (obj: any) => {
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
        name: detail ? detail[0]?.properties?.name : null,
      });
    }
  };

  const _cancelPick = () => {
    setshowEditor(false);
    setpickedLocation(null);
    setpickLocation(false);
  };

  const _newStory = () => {
    if (pickLocation) {
      setshowEditor(true);
    } else {
      setpickLocation(true);
    }
  };

  const viewLocation = (
    lat: number,
    long: number,
    bbox: [number, number, number, number],
    type: string
  ) => {
    setinitialLocation({
      lat: lat,
      long: long,
    });

    if (type === "poi") {
      mapGlRef.current?.flyTo({
        center: [lat, long],
        essential: true,
      });
    } else {
      mapGlRef.current?.fitBounds(bbox);
    }
  };

  const onZoom = () => {
    setzoomLevel(mapGlRef.current?.getZoom());
  };

  return (
    <div className="h-screen">
      <button
        id="nav-btn"
        className="p-2 md:p-3 bg-green-primary rounded-full absolute top-10 left-5 md:left-10 z-20"
        onClick={() => showSideNav(true)}
      >
        <GiHamburgerMenu className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>

      <Search handleSearch={viewLocation} />

      <MapGL
        onZoomEnd={onZoom}
        optimizeForTerrain={true}
        ref={mapGlRef}
        onClick={(el) => _pickLocation(el)}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        initialViewState={{
          longitude: initialLocation.lat,
          latitude: initialLocation.long,
          zoom: zoomLevel,
        }}
        attributionControl={false}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {pickedLocation && (
          <PickedMarker lat={pickedLocation.lat} lng={pickedLocation.lng} />
        )}

        {DummyLocation.map((loc, i) => (
          <>
            <StoryMarker
              key={i}
              onClick={(e) => {
                if (!pickLocation) {
                  setshowStory(true);
                }
              }}
              lat={loc.lat}
              lng={loc.lng}
            />
          </>
        ))}
      </MapGL>

      <EditorSection
        showEditor={showEditor}
        onCloseEditor={() => {
          setshowEditor(false);
        }}
        onSaveEditor={_newStory}
        onOutsideEditor={() => {
          setshowEditor(false);
        }}
        infoLocation={pickedLocation}
      />

      <LocationStory
        showEditor={showStory}
        onCloseEditor={() => {
          setshowStory(false);
        }}
        onOutsideEditor={() => {
          setshowStory(false);
        }}
      />

      <button
        onClick={_cancelPick}
        className={
          "transition-all shadow w-max rounded-lg px-3 py-2 absolute z-10 left-10 bottom-10 md:right-20 text-sm md:text-base  font-semibold bg-red-500 text-white" +
          (pickLocation ? " visible opacity-100" : " invisible opacity-0")
        }
      >
        Batal
      </button>

      <button
        onClick={_newStory}
        className={
          "transition-all shadow  rounded-lg px-3 py-2 absolute z-10 right-5 bottom-10 md:right-20 text-sm md:text-base  font-semibold " +
          (pickLocation
            ? " bg-white text-green-primary"
            : " bg-green-primary text-white")
        }
      >
        {pickLocation ? "Pilih lokasi " : "Tulis cerita"}
      </button>
    </div>
  );
}
