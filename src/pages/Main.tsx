import React, { useRef, useState } from "react";
import MapGL, { Marker,MapRef } from "react-map-gl";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { MdAccountCircle } from "react-icons/md";
import { FaEnvelopeOpen, FaMapMarked } from "react-icons/fa";
import "mapbox-gl/dist/mapbox-gl.css";
import { MdEditLocation } from "react-icons/md";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import useOutsideClick from "helper/useOutsideClick";


type location = {
  lng: number;
  lat: number;
};

export default function Main() {
  const [sideNav, setsideNav] = useState<boolean>(false);
  const [pickLocation, setpickLocation] = useState<boolean>(false);
  const [pickedLocation, setpickedLocation] = useState<location | null>(null);
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const [showEditor, setshowEditor] = useState<boolean>(false);

  const [detailPickedLocation, setdetailPickedLocation] = useState()

  const rightNavRef = useRef(null);
  const mapGlRef = useRef<MapRef|null>(null)

  useOutsideClick(rightNavRef, () => {
    setshowEditor(false)
  });

  const _pickLocation = (obj: any) => {
    console.log(obj.point);
    

    const detail=mapGlRef.current?.queryRenderedFeatures(obj.point)
    
    
    if(detail !== undefined && detail.length>0){
      setdetailPickedLocation(detail[0]?.properties?.name)
    }
    
    
    const { lng, lat } = obj.lngLat;
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
    <>
      <div className="max-w-screen-2xl h-screen mx-auto relative overflow-x-hidden">
        <button
          id="nav-btn"
          className="p-3 bg-[#03C88E] rounded-full absolute top-10 left-10 z-20"
          onClick={() => setsideNav(true)}
        >
          <GiHamburgerMenu className="w-6 h-6 text-white" />
        </button>

        <div
          id="search"
          className="hidden p-2 w-96 h-12 md:flex bg-white shadow rounded absolute z-10 right-10 top-10"
        >
          <input
            type="text"
            className="bg-transparent flex-grow h-full p-2 text-[#03C88E] placeholder:text-[#03C88E] placeholder:text-sm text-sm"
            placeholder="Cari lokasi"
          />
          <button className="mx-2">
            <BiSearch className="text-[#03C88E] w-5 h-5" />
          </button>
          <span className="w-[2px] bg-[#03C88E] opacity-30 h-full  block"></span>
          <button className="mx-2">
            <BiCurrentLocation className="text-[#03C88E] w-5 h-5" />
          </button>
        </div>

        <div
          id="side-nav"
          className={
            "transition-all duration-500  min-h-screen absolute w-full md:w-1/4  z-50 bg-[#03C88E] py-5 px-6 flex flex-col " +
            (sideNav ? "translate-x-0 visible" : "-translate-x-full invisible")
          }
        >
          <button onClick={() => setsideNav(false)}>
            <CgClose className="w-6 h-6 text-white" />
          </button>
          <div className="mt-16">
            <MdAccountCircle className="w-16 h-16 text-white mx-auto" />
            <p className="font-semibold text-2xl text-center text-white mt-2">
              John doe
            </p>
          </div>
          <div className="mt-7 flex flex-col gap-2">
            <a
              href="/"
              className="flex  bg-white rounded-md text-lg px-3 py-3 font-semibold  text-[#03C88E]"
            >
              <FaEnvelopeOpen className="w-6 h-6 mr-5" />
              <span>Tulisan Cerita</span>
            </a>
            <a href="/" className="px-3 py-3 text-lg flex text-white">
              <FaMapMarked className="w-7 h-7 mr-5 text-white" />
              <span>Tempat yang dikunjungi</span>
            </a>
          </div>
        </div>


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

        <div
          ref={rightNavRef}
          id="right-nav"
          className={
            "transition-all duration-500 min-h-screen w-full md:w-1/2 absolute right-0 top-0 bg-white z-20 py-7 px-4 flex flex-col " +
            (showEditor
              ? "translate-x-0 visible"
              : " translate-x-full invisible")
          }
        >
          <button className="w-fit h-fit" onClick={() => setshowEditor(false)}>
            <CgClose className="w-6 h-6 text-[#03C88E]" />
          </button>
          <h1 className="text-[#03C88E] font-semibold mt-10 text-2xl">
            {detailPickedLocation}
          </h1>
          <div className="mt-10 w-full">
            <Editor
              placeholder="Tulis ceritamu disini"
              editorState={editorState}
              onEditorStateChange={seteditorState}
              toolbar={{
                options: ["inline", "fontSize", "list", "textAlign", "history"],
                inline: { inDropdown: false },
                list: { inDropdown: true },
                textAlign: { inDropdown: false },
                link: { inDropdown: true },
                history: { inDropdown: true },
              }}
            />
          </div>


          <button
          onClick={_newStory}
          className={
            "rounded-lg px-3 py-2 text-sm md:text-base w-fit self-end mt-20 font-semibold bg-[#03C88E] text-white" 
            
          }
        >
          Simpan
        </button>
        </div>

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
    </>
  );
}
