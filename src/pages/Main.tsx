import React, { useRef, useState } from "react";
import MapGL, { Marker, MapRef } from "react-map-gl";
import { GiHamburgerMenu } from "react-icons/gi";
import "mapbox-gl/dist/mapbox-gl.css";
import { MdEditLocation } from "react-icons/md";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { sideNavStore } from "store/navStore";
import EditorSection from "components/Main/EditorSection";
import Search from "components/Main/Search";

type location = {
  lng: number;
  lat: number;
};

export default function Main() {
  const { showSideNav } = sideNavStore((state) => state);
  const [pickLocation, setpickLocation] = useState<boolean>(false);
  const [pickedLocation, setpickedLocation] = useState<location | null>(null);
  const [showEditor, setshowEditor] = useState<boolean>(false);
  const [detailPickedLocation, setdetailPickedLocation] = useState<
    string | any
  >();

  const mapGlRef = useRef<MapRef | null>(null);

  const _pickLocation = (obj: any) => {
    const detail = mapGlRef.current?.queryRenderedFeatures(obj.point);
    const { lng, lat } = obj.lngLat;

    if (detail !== undefined && detail.length > 0) {
      setdetailPickedLocation(detail[0]?.properties?.name || lng + "," + lat);
    } else {
      setdetailPickedLocation(lng + "," + lat);
    }
    if (pickLocation) {
      setpickedLocation({
        lng,
        lat,
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

  return (
    <div className="h-screen">
      <button
        id="nav-btn"
        className="p-3 bg-[#03C88E] rounded-full absolute top-10 left-10 z-20"
        onClick={() => showSideNav(true)}
      >
        <GiHamburgerMenu className="w-6 h-6 text-white" />
      </button>

      <Search />

      <MapGL
        ref={mapGlRef}
        onClick={(el) => _pickLocation(el)}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        initialViewState={{
          longitude: 106.816666,
          latitude: -6.2,
          zoom: 10,
          bearing: 0,
          pitch: 0,
        }}
        attributionControl={false}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {pickedLocation && (
          <Marker
            longitude={pickedLocation.lng}
            latitude={pickedLocation.lat}
            anchor="bottom"
          >
            <MdEditLocation className="text-[#03C88E] w-10 h-10" />
          </Marker>
        )}
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
        titleEditor={detailPickedLocation}
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
            ? " bg-white text-[#03C88E]"
            : " bg-[#03C88E] text-white")
        }
      >
        {pickLocation ? "Pilih lokasi " : "Tulis cerita"}
      </button>
    </div>
  );
}
