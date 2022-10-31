export default async function mapMatching(coordinates:any, radiuses:any) {
  let token=process.env.REACT_APP_MAPBOX_TOKEN
  const query = await fetch(`
     https://api.mapbox.com/matching/v5/mapbox/driving/${coordinates}?geometries=geojson&radiuses=${radiuses}&steps=true&access_token=${token}
  `);

  const response=await query.json()

  if(response.code !=="Ok"){
    console.log("error")
    return
  }

  const coords=response[0].matchings[0].geometry
  console.log(coords)
}
