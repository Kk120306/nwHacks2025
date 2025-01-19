import React from 'react';
import './styles/ListComponent.css';
import BottomNav from './BottomNav';

let userPos = new Object();

navigator.geolocation.getCurrentPosition((position) => {
  userPos['lat'] = position.coords.latitude;
  userPos['lng'] = position.coords.longitude;
});

userPos = { lat: 49.2625931, lng: -123.2448568 };

type PoiKey = {
  user: string;
  cacheName: string;
  desc: string;
};

type Poi = { key: PoiKey; location: google.maps.LatLngLiteral };

const cacheLocations: Poi[] = [
  {
    key: { user: 'Kai', cacheName: 'Kai Cache', desc: "Kai's Cache" },
    location: { lat: 49.2606, lng: -123.2460 },
  },
  {
    key: { user: 'Chaitanya', cacheName: 'Chaitanya Cache', desc: "Chaitanya's Cache" },
    location: { lat: 49.2616, lng: -123.2460 },
  },
  {
    key: { user: 'Soham', cacheName: 'Soham Cache', desc: "Soham's Cache" },
    location: { lat: 49.2616, lng: -123.2470 },
  },
  {
    key: { user: 'Sidd', cacheName: 'Sidd Cache', desc: "Sidd's Cache" },
    location: { lat: 49.2596, lng: -123.2480 },
  },
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
      name: poi.key.cacheName,
      user: poi.key.user,
      desc: poi.key.desc,
      distance: distance,
      image: `https://via.placeholder.com/150?text=${poi.key.user}`, // Placeholder image based on user's name
    };
  })
  .sort((a, b) => {
    const distanceA = parseFloat(a.distance); // Parse distance for sorting
    const distanceB = parseFloat(b.distance);
    return distanceA - distanceB;
  });

function ListComponent() {
  return (
    <div className="ListComponent">
      <div className="ListComponent_Header">Team Members</div>
      <div className="ListComponent_List">
        <div className="ListComponent_HLine"></div>
        {sortedLocations.map((location) => (
          <div className="ListComponent_List_Item" key={location.name}>
            <div className="ListComponent_List_Item_Left_Wrapper">
              <img
                src={location.image}
                alt={location.user}
                className="ListComponent_List_Item_ProfileImage"
              />
              <div className="ListComponent_List_Item_Name">{location.name}</div>
              <div className="ListComponent_List_Item_User">{location.user}</div>
              <div className="ListComponent_List_Item_Desc">{location.desc}</div>
            </div>
            <div className="ListComponent_List_Item_Distance">{location.distance}</div>
          </div>
        ))}
        <div className="ListComponent_HLine"></div>
      </div>
      <BottomNav />

      {/* Attribution Footer */}
      <footer className="ListComponent_Footer">
        <p>
          <a
            href="https://www.flaticon.com/free-icons/people"
            title="people icons"
          >
            People icons created by Creartive - Flaticon
          </a>
        </p>
      </footer>
    </div>
  );
}

export default ListComponent;
