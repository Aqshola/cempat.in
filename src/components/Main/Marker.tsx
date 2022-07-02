import MarkerStory from "components/Icon/MarkerStory";
import MarkerPicked from "components/Icon/MarkerPicked";
import { Marker } from "react-map-gl";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type PickedMarkerProps = {
  lng: number;
  lat: number;
  classnames?: string;
};

const PickedMarker = ({ lng, lat, classnames }: PickedMarkerProps) => {
  return (
    <>
      <Marker longitude={lng} latitude={lat} anchor="bottom">
        <MarkerPicked className="animate-scale-up w-14 h-14" />
      </Marker>
    </>
  );
};

type StoryMarkerProps = PickedMarkerProps & {
  listStory?: any;
  onClick?: (...T: any) => void;
};

const StoryMarker = ({ onClick, lng, lat }: StoryMarkerProps) => {
  const refMarker = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.fromTo(
      refMarker.current,
      {
        scale: 0,
      },
      {
        scale: 1,
        duration: 2,
        ease: "elastic",
      }
    );
  }, []);

  return (
    <Marker longitude={lng} latitude={lat} anchor="bottom" onClick={onClick}>
      <div ref={refMarker}>
        <MarkerStory className="w-16 h-16" />
      </div>
    </Marker>
  );
};

export { PickedMarker, StoryMarker };
