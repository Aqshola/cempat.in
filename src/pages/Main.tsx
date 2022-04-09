import React, { useEffect, useRef, useState } from "react";
import MapGL, { MapRef } from "react-map-gl";
import { GiHamburgerMenu } from "react-icons/gi";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { sideNavStore } from "store/navStore";
import EditorSection from "components/Main/EditorSection";
import Search from "components/Main/Search";
import { StoryMarker, PickedMarker } from "components/Main/Marker";
import Button from "components/Button/Button";
import clsx from "clsx";
import useGet from "hooks/cerita/useGet";
import { ApiLocation, Location } from "types/types";
import StoryList from "components/Main/ListStory";
import DetailStory from "components/Main/DetailStory";
import useRemoveDuplicate from "hooks/helper/useRemoveDuplicate";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

/*
 *TODO: Fetch location by bounding box ✅
 *TODO: Get story detail ✅
 *TODO: Add Toast
 */

export default function Main() {
  const mapGlRef = useRef<MapRef | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const latParams = searchParams.get("lat");
  const lngParams = searchParams.get("lng");
  const idParams = searchParams.get("id");

  const { showSideNav } = sideNavStore((state) => state);

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

  const [listLocation, setlistLocation] = useState<ApiLocation[]>([]);

  const [getMarker, dataMarker, loading] = useGet();

  const [storyListView, setstoryListView] = useState<boolean>(false);

  const [storyDetailView, setstoryDetailView] = useState<boolean>(false);

  const [viewStory, setviewStory] = useState<ApiLocation>({
    lat: 0,
    lng: 0,
    id: 0,
    jml_cerita: 0,
    place_name: "",
  });

  const _saveCallback = ({ lat, lng, id, place_name }: ApiLocation) => {
    setlistLocation([...listLocation, { lat, lng, id, place_name }]);
    setpickLocation(false);
  };

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
        place_name: detail ? detail[0]?.properties?.name : null,
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

  const _handleGet = () => {
    const bound = mapGlRef.current?.getBounds();
    let zoomLevel = mapGlRef.current?.getZoom() || 0;

    if (zoomLevel >= 10 && bound) {
      const ne = bound.getNorthEast();
      const sw = bound.getSouthWest();

      getMarker(ne.lng, sw.lng, ne.lat, sw.lat);
    }
  };

  const _handleStoryView = (count: number, data: ApiLocation) => {
    setviewStory(data);
    if (count > 1) {
      setstoryListView(true);
      setstoryDetailView(false);
    } else {
      navigate(`?id=${data.id}`);
      setstoryDetailView(true);
      setstoryListView(false);
    }
  };

  const _loadLocationStory = () => {
    const pushedArray = useRemoveDuplicate(listLocation, dataMarker.data, "id");
    if (pushedArray.length > 0) {
      setlistLocation([...pushedArray]);
    }
  };

  const viewLocation = (
    lat: number,
    long: number,
    bbox: [number, number, number, number],
    type: string
  ) => {
    console.log(lat, long);

    if (type === "poi") {
      mapGlRef.current?.flyTo({
        center: [lat, long],
        essential: true,
      });
    } else {
      mapGlRef.current?.fitBounds(bbox);
    }
  };

  useEffect(() => {
    if (!loading) {
      _loadLocationStory();
    }
  }, [loading]);

  return (
    <div className="h-screen" id="nav-btn" aria-label="nav-btn">
      <Button
        id="nav-btn"
        shape="round"
        className="p-2 absolute top-10 left-5 md:left-10 z-20"
        onClick={() => showSideNav(true)}
      >
        <GiHamburgerMenu className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </Button>

      <Search handleSearch={viewLocation} />

      <MapGL
        onLoad={() => {
          if (latParams && lngParams) {
            mapGlRef.current?.flyTo({
              center: [parseFloat(lngParams), parseFloat(latParams)],
              essential: true,
            });
          }
          _handleGet();

          if (idParams && !loading) {
            setstoryDetailView(true);
          }
        }}
        onMoveEnd={_handleGet}
        onZoomEnd={_handleGet}
        optimizeForTerrain={true}
        ref={mapGlRef}
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
          <PickedMarker lat={pickedLocation.lat} lng={pickedLocation.lng} />
        )}

        {listLocation.map((loc, i) => (
          <StoryMarker
            key={i}
            onClick={() => _handleStoryView(loc.jml_cerita || 0, loc)}
            lat={loc.lat}
            lng={loc.lng}
          />
        ))}
      </MapGL>

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

      <StoryList
        showEditor={storyListView}
        onCloseEditor={() => {
          setstoryListView(false);
        }}
        onOutsideEditor={() => {
          setstoryListView(false);
        }}
      />

      <DetailStory
        viewData={viewStory}
        showEditor={storyDetailView}
        onCloseEditor={() => {
          setstoryDetailView(false);
        }}
        onOutsideEditor={() => {
          setstoryDetailView(false);
        }}
      />

      <Button
        variant="danger"
        onClick={_cancelPick}
        className={clsx(
          "shadow w-max absolute z-10 left-10 bottom-10 md:right-20",
          pickLocation && ["visible opacity-100"],
          !pickLocation && [" invisible opacity-0"]
        )}
      >
        Batal
      </Button>

      <Button
        onClick={_newStory}
        className="absolute z-10 right-5 bottom-10 md:right-20 shadow"
        variant={pickLocation ? "secondary" : "primary"}
      >
        {pickLocation ? "Pilih lokasi " : "Tulis cerita"}
      </Button>
    </div>
  );
}
