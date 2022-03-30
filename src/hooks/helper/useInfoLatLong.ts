import React, {  useState } from "react";

let apitoken=process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
function useInfoLatLong():[(long:number, lat:number)=>any, boolean,any] {
  const [loading, setloading] = useState<boolean>(true);
  const [error, seterror] = useState<any>();
  
  return [
    async (long,lat) => {
      try {
        const fetching = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${apitoken}`
        );
        setloading(false);
        return await fetching.json();
      } catch (error) {
        seterror(error);
        setloading(false);
      }
      
    },
    loading,
    error,
  ];
}

export default useInfoLatLong;
