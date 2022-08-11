import MarkerStory from "components/Icon/MarkerStory";
import MarkerPicked from "components/Icon/MarkerPicked";
import { Marker } from "react-map-gl";
import { useRef } from "react";
import {motion} from "framer-motion"


type PickedMarkerProps = {
  lng: number;
  lat: number;
  className?: string;
  markerId:number
};

const PickedMarker = ({ lng, lat, className }: PickedMarkerProps) => {
  return (
    <>
      <Marker longitude={lng} latitude={lat} anchor="bottom">
        <MarkerPicked className={"animate-scale-up w-14 h-14 "+className} />
      </Marker>
    </>
  );
};

type StoryMarkerProps = PickedMarkerProps & {
  listStory?: any;
  onClick?: (...T: any) => void;
};

const StoryMarker = ({ onClick, lng, lat,markerId }: StoryMarkerProps) => {
  const refMarker = useRef<HTMLDivElement>(null);


  return (
    <Marker longitude={lng} latitude={lat} anchor="bottom" onClick={onClick}>
      <motion.div ref={refMarker} initial={{scale:0}} animate={{scale:1}} transition={{
        type:"spring",
        bounce:0.5,
        duration:0.5,
        // delay:0.2*markerId
      }}>
        <MarkerStory className="w-16 h-16" />
      </motion.div>
    </Marker>
  );
};

export { PickedMarker, StoryMarker };
