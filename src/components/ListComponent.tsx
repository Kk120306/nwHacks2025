import React from 'react'
import "./styles/ListComponent.css"
import BottomNav from './BottomNav';

let userPos = new Object()

navigator.geolocation.getCurrentPosition((position) => {
  userPos["lat"] = position.coords.latitude
  userPos["lng"] = position.coords.longitude
});

userPos = {lat: 49.2625931, lng: -123.2448568}

type Poi = { key: object, location: google.maps.LatLngLiteral }

const cacheLocations: Poi[] = [
  {key: {user: "Kai", cacheName: "Kai Cache", desc: "Kai's Cache"}, location: { lat: 49.2606, lng: -123.2460 }},
  {key: {user: "Chaitanya", cacheName: "Chaitanya Cache", desc: "Chaitanya's Cache"}, location: { lat: 49.2616, lng: -123.2460 }},
  {key: {user: "Soham", cacheName: "Soham Cache", desc: "Soham's Cache"}, location: { lat: 49.2616, lng: -123.2470 }},
  {key: {user: "Sidd", cacheName: "Sidd Cache", desc: "Sidd's Cache"}, location: { lat: 49.2596, lng: -123.2480 }},
];

function calculateDistance(pos1, pos2) {
    const toRadians = (deg) => (deg * Math.PI) / 180;

    const R = 6371; // Earth's radius in kilometers
    const lat1 = toRadians(pos1.lat);
    const lat2 = toRadians(pos2.lat);
    const deltaLat = toRadians(pos2.lat - pos1.lat);
    const deltaLng = toRadians(pos2.lng - pos1.lng);

    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
}

const sortedLocations = cacheLocations
    .map((poi) => {
        const distanceKm = calculateDistance(userPos, poi.location);
        const distance =
            distanceKm < 1
                ? `${(distanceKm * 1000).toFixed(0)} m` // Convert to meters if less than 1 km
                : `${distanceKm.toFixed(2)} km`; // Keep in kilometers otherwise

        return {
             name: poi.key["cacheName"],
             user: poi.key["user"],
             desc: poi.key["desc"],
             distance: distance,
        };
    })
    .sort((a, b) => {
        const distanceA = parseFloat(a.distance); // Parse distance for sorting
        const distanceB = parseFloat(b.distance);
        return distanceA - distanceB;
    });


function ListComponent() {
  console.log(sortedLocations);
  return (
    <div className='ListComponent' >
      <div className='ListComponent_List'>
        <div className='ListComponent_HLine'></div>
        {sortedLocations.map(_ => (
          <>
            <div className='ListComponent_List_Item' id={_["name"]} >
              <div className='ListComponent_List_Item_Left_Wrapper'>
                <div className='ListComponent_List_Item_Name'>
                  {_["name"]}
                </div>
                <div className='ListComponent_List_Item_User'>
                  {_["user"]}
                </div>
                <div className='ListComponent_List_Item_Desc'>
                  {_["desc"]}
                </div>
              </div>
              <div className='ListComponent_List_Item_Distance'>
                {_["distance"]}
              </div>
            </div>
            <div className='ListComponent_HLine'></div>
          </>
        ))}
      </div>
      <BottomNav />
    </div>
  )
}

export default ListComponent
