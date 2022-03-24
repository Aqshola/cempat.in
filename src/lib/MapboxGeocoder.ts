import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

let apitoken=process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const geocoder = new MapboxGeocoder({
    accessToken:apitoken || "",
    types: "country,region,place,postcode,locality,neighborhood,district,address,poi",
});

export default geocoder

