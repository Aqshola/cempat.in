import React, { useEffect, useRef, useState } from "react";
import MapGL, { MapRef, Source, Layer } from "react-map-gl";
import { FeatureCollection } from "geojson";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { StoryMarker } from "components/Peta/Marker";

import { authStore } from "store/authStore";
import clsx from "clsx";
import mapboxgl, { FeatureIdentifier, LngLat } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import useSortedUserStory from "hooks/journey/useSortedUserStory";
import {
  Route,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ApiLocation } from "types/types";
import DetailStory from "components/Peta/DetailStory";
import Button from "components/Button/Button";
import UserSection from "components/Peta/UserSection";
import useUserSummary from "hooks/journey/getUserSummary";

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
// mapboxgl.workerClass =require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export default function Journey() {
  //REF
  const mapGlRef = useRef<MapRef | null>();
  //HOOKS
  const navigate = useNavigate();
  const { username } = useParams();
  const [getStory, resultStory, loadingStory] = useSortedUserStory();
  const[getSummary, dataSummary,Loading]=useUserSummary()

  //DATA
  const authData = authStore((state) => state);
  const location = useLocation();
  

  //STATE
  const [summaryUser, setsummaryUser] = useState<boolean>(false);
  const [detailView, setdetailView] = useState(false);
  const [userSectionView, setuserSectionView] = useState(false);
  

  const [initialLocation, setinitialLocation] = useState({
    lat: 106.816666,
    long: -6.2,
  });

  const [listLocation, setlistLocation] = useState<ApiLocation[]>([]);

  const [flying, setflying] = useState(false);

  function handleDetailView(state: boolean) {
    setdetailView(state);
  }

  function handleUserSection(state: boolean) {
    setuserSectionView(state);
  }

  function flyTo(lng: number, lat: number) {
    mapGlRef.current?.once("moveend", () => {
      if (flying) {
        setflying(false);
      }
    });
    setTimeout(() => {
      mapGlRef.current?.flyTo({
        center: [lng, lat],
        essential: true,
        zoom: 10,
        duration: 2000,
      });
    }, 0);
  }

  useEffect(() => {
    if (username) {
      getStory(username);
      getSummary(username)
    }
  }, [username]);

  useEffect(() => {
    if (!loadingStory) {
      setlistLocation([...resultStory.data]);
    }
  }, [loadingStory]);
  

  


  

  const geojson: FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [...listLocation.map((el) => [el.lng, el.lat])],
        },
        properties: null,
      },
    ],
  };

  function markerAction(dataLocation: ApiLocation) {
    flyTo(dataLocation.lng, dataLocation.lat);
    navigate(`?id=${dataLocation.id}`);
  }

  return (
    <>
      <div
        className="h-screen w-full flex relative"
        id="nav-btn"
        aria-label="nav-btn"
      >

        <div className="absolute top-10 z-30 left-0 right-0 flex justify-center">
          <div
            onClick={() => {
              setsummaryUser(!summaryUser);
            }}
            className={clsx(
              "py-2 px-5 overflow-hidden bg-white box-summary rounded font-nunito text-center w-[250px] transition-all cursor-pointer",
              summaryUser && ["h-48 shadow-none"],
              !summaryUser && ["h-10 shadow-journey-box"]
            )}
          >
            <div>
              <p>
                Riwayat{" "}
                <span className="font-bold text-green-primary">{username}</span>
              </p>
            </div>
            <div className="mt-5 flex h-fit items-center justify-between gap-5">
              <div className="flex w-9 h-9">
                <svg
                  viewBox="0 0 28 28"
                  className={"fill-green-primary"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.2535 2.14902C13.1247 2.07856 12.9803 2.04163 12.8335 2.04163C12.6867 2.04163 12.5423 2.07856 12.4135 2.14902L3.30183 7.11902C3.10949 7.22401 2.93727 7.36226 2.79316 7.52735L12.8335 13.0025L22.8738 7.52502C22.7296 7.36036 22.5574 7.22252 22.3652 7.11785L13.2535 2.14785V2.14902ZM2.3335 18.375V9.26918L12.4135 14.7677C12.5423 14.8381 12.6867 14.8751 12.8335 14.8751C12.9803 14.8751 13.1247 14.8381 13.2535 14.7677L23.3335 9.26918V18.375C23.3335 19.3806 22.934 20.3451 22.2229 21.0561C21.5119 21.7672 20.5474 22.1667 19.5418 22.1667H6.12516C5.11955 22.1667 4.15513 21.7672 3.44405 21.0561C2.73297 20.3451 2.3335 19.3806 2.3335 18.375V18.375ZM24.5013 8.76285C25.0381 9.10547 25.4798 9.57787 25.7857 10.1364C26.0916 10.6949 26.2517 11.3216 26.2513 11.9583V18.9583C26.2513 20.5828 25.606 22.1407 24.4574 23.2894C23.3087 24.438 21.7508 25.0833 20.1263 25.0833H9.62633C8.98914 25.0841 8.36204 24.9242 7.80307 24.6183C7.2441 24.3124 6.77133 23.8705 6.4285 23.3333H20.1252C21.2855 23.3333 22.3983 22.8724 23.2188 22.0519C24.0392 21.2315 24.5002 20.1187 24.5002 18.9583V8.76285H24.5013Z"
                    fill="inherit"
                  />
                </svg>
              </div>
              <div className="w-full text-left">
                <p className="text-sm">
                  <span className="font-bold">{dataSummary.data.total_story}</span> Cerita ditulis
                </p>
              </div>
            </div>
            <div className="mt-5 flex h-fit items-center justify-between gap-5">
              <div className="flex w-9 h-9">
                <svg
                  viewBox="0 0 28 28"
                  xmlns="http://www.w3.org/2000/svg"
                  className={"fill-green-primary"}
                >
                  <path
                    d="M10.388 19.25H14.609C14.5922 19.444 14.5837 19.6386 14.5833 19.8334C14.5833 21.2345 15.1165 22.5879 16.0673 23.9027C15.4373 25.0215 14.7175 25.6655 14 25.6655C12.6035 25.6655 11.2 23.2225 10.4557 19.5942L10.388 19.2512V19.25ZM10.1197 17.5H15.0197C15.5936 16.0354 16.6838 14.8315 18.0845 14.1155V14.0012C18.0845 13.2009 18.0542 12.4204 17.9958 11.6679H10.0042L9.96567 12.2372C9.86429 13.9926 9.91582 15.7535 10.1197 17.5V17.5ZM21 13.4167C21.8557 13.4155 22.703 13.5861 23.4916 13.9183C24.2802 14.2506 24.994 14.7378 25.5908 15.351C25.7329 14.1224 25.6805 12.879 25.4357 11.6667H19.754L19.7983 12.4332C19.8158 12.7925 19.8263 13.1565 19.8322 13.5229C20.2102 13.4529 20.6022 13.4167 21 13.4167ZM3.577 19.2512H8.60067C9.02533 21.6802 9.7475 23.7475 10.6913 25.193C7.72512 24.3127 5.22836 22.2933 3.74733 19.5767L3.577 19.2512ZM2.5655 11.6679H8.24717C8.12512 13.3851 8.13799 15.1093 8.28567 16.8245L8.35217 17.5012H2.86533C2.27437 15.6133 2.17082 13.6066 2.56433 11.6679H2.5655ZM17.4347 3.00653L17.3087 2.80819C19.0427 3.32287 20.6338 4.23266 21.9569 5.46608C23.28 6.6995 24.2991 8.22294 24.934 9.91669H19.579C19.2103 7.09803 18.4625 4.67603 17.4347 3.00653V3.00653ZM10.549 2.85136L10.6913 2.80819C9.6635 4.38319 8.89933 6.69203 8.49333 9.40336L8.421 9.91669H3.06833C3.69423 8.24641 4.69377 6.74135 5.99052 5.51659C7.28727 4.29182 8.84689 3.37978 10.5502 2.85019L10.549 2.85136ZM14 2.33569C15.5388 2.33569 17.087 5.30136 17.7497 9.54919L17.8045 9.91669H10.1955C10.8267 5.47286 12.418 2.33569 14 2.33569ZM26.25 19.8334C26.25 18.441 25.6969 17.1056 24.7123 16.121C23.7277 15.1365 22.3924 14.5834 21 14.5834C19.6076 14.5834 18.2723 15.1365 17.2877 16.121C16.3031 17.1056 15.75 18.441 15.75 19.8334C15.75 22.0069 17.4067 24.2842 20.65 26.7167C20.751 26.7924 20.8738 26.8334 21 26.8334C21.1262 26.8334 21.249 26.7924 21.35 26.7167C24.5933 24.2842 26.25 22.0069 26.25 19.8334ZM19.25 19.8334C19.25 19.3692 19.4344 18.9241 19.7626 18.5959C20.0908 18.2677 20.5359 18.0834 21 18.0834C21.4641 18.0834 21.9092 18.2677 22.2374 18.5959C22.5656 18.9241 22.75 19.3692 22.75 19.8334C22.75 20.2975 22.5656 20.7426 22.2374 21.0708C21.9092 21.399 21.4641 21.5834 21 21.5834C20.5359 21.5834 20.0908 21.399 19.7626 21.0708C19.4344 20.7426 19.25 20.2975 19.25 19.8334Z"
                    fill="inherit"
                  />
                </svg>
              </div>
              <div className="w-full text-left">
                <p className="text-sm">
                  <span className="font-bold">{dataSummary.data.total_place}</span> Lokasi dikunjungi
                </p>
              </div>
            </div>
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
          <Source type="geojson" id="polylineLayer" data={geojson}>
            <Layer
              id="lineLayer"
              type="line"
              source="route"
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
              paint={{
                "line-color": "#0B4619",
                "line-width": 2.5,
                "line-opacity": 0.8,
                "line-translate-anchor": "viewport",
              }}
            />
            {listLocation.map((loc, i) => (
              <StoryMarker
                onClick={() => markerAction(loc)}
                markerId={loc.id.toString()}
                key={loc.id}
                lat={loc.lat}
                lng={loc.lng}
              />
            ))}
          </Source>
        </MapGL>
        <DetailStory
          authData={authData}
          handleDetailView={handleDetailView}
          stateDetailView={detailView}
          flying={flyTo}
          stateFlying={false}
        />
        <UserSection
          handleView={() => handleUserSection(true)}
          handleUserView={handleUserSection}
          stateUserView={userSectionView}
          showEditor={userSectionView}
        />
      </div>
    </>
  );
}
