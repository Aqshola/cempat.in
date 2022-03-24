import MarkerStory from "components/Icon/MarkerStory";
import MarkerPicked from "components/Icon/MarkerPicked";
import { Marker } from "react-map-gl";

type PickedMarkerProps = {
  lng: number;
  lat: number;
  classnames?: string;
};

const PickedMarker = ({ lng, lat, classnames }: PickedMarkerProps) => {
  return (
    <>
      <Marker longitude={lng} latitude={lat} anchor="bottom">
        <MarkerPicked className="animate-scale-up w-10 h-10" />
      </Marker>
    </>
  );
};

type StoryMarkerProps = PickedMarkerProps & {
  listStory?: any;
  onClick?: () => void;
};

const StoryMarker = ({ onClick, lng, lat }: StoryMarkerProps) => {
  return (
    <Marker longitude={lng} latitude={lat} anchor="bottom" onClick={onClick}>
      <MarkerStory className="w-16 h-16" />
    </Marker>
  );
};

export {
    PickedMarker,
    StoryMarker
}
