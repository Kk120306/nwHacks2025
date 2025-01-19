import React, { useState, useRef, useEffect, useCallback } from 'react'
import {APIProvider, Map, MapCameraChangedEvent, AdvancedMarker, Pin, useMap} from '@vis.gl/react-google-maps';
import {MarkerClusterer} from '@googlemaps/markerclusterer';
import type {Marker} from '@googlemaps/markerclusterer';
import "./styles/MapComponent.css"
import BottomNav from './BottomNav';
import {initializeApp} from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyBONTlf49yDHmH85iLlIkN6MpGp-jQTt8g",
  authDomain: "cache-d4730.firebaseapp.com",
  projectId: "cache-d4730",
  storageBucket: "cache-d4730.firebasestorage.app",
  messagingSenderId: "738524778233",
  appId: "1:738524778233:web:26ba5908d3d1c1b9549c28",
  measurementId: "G-7FHSJ8QVTL"
};

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getCaches(db) {
  const cachesCol = collection(db, 'caches');
  const cacheSnapshot = await getDocs(cachesCol);
  const cacheList = cacheSnapshot.docs.map(doc => doc.data());
  console.log(cacheList);
}

getCaches(db)

const marker = document.createElement("img");

marker.src =
  "https://upload.wikimedia.org/wikipedia/commons/1/11/Pan_Green_Circle.png";

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

const PoiMarkers = (props: {pois: Poi[]}) => {
  const [currCache, setCurrCache] = useState("none")
  const [currUser, setCurrUser] = useState("none")
  const [currDesc, setCurrDesc] = useState("none")
  const [currPos, setCurrPos] = useState("none")
  const map = useMap();
  const [markers, setMarkers] = useState<{[key: string]: Marker}>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  // Initialize MarkerClusterer, if the map has changed
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({map});
    }
  }, [map]);

  // Update markers, if the markers array has changed
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers(prev => {
      if (marker) {
        return {...prev, [key]: marker};
      } else {
        const newMarkers = {...prev};
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  const handleClick = useCallback((latLng: google.maps.LatLngLiteral, key: object) => {
    if(!map) return;
    if(!latLng) return;
    console.log('marker clicked:', latLng.toString());
    map.panTo(latLng);
    map.setZoom(20)
    setCurrCache(key["cacheName"])
    setCurrUser(key["user"])
    setCurrDesc(key["desc"])
    setCurrPos(latLng)
    console.log(key)
  }, [map])

  const zoomOut = useCallback(() => {
    if (!map) return;
    map.setZoom(15)
  }, [map])

  return (
    <>
      {props.pois.map( (poi: Poi) => (
        <AdvancedMarker
          key={poi.key["cacheName"]}
          position={poi.location}
          ref={marker => setMarkerRef(marker, poi.key["cacheName"])}
          clickable={true}
          onClick={() => {
            handleClick(poi.location, poi.key)
          }}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/11/Pan_Green_Circle.png" width={20} height={20} ></img>
            {/* <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} /> */}
        </AdvancedMarker>
        
      ))}
      {currCache != "none" ? 
      <div className='MapComponent_CacheDesc'>
        <div className='MapComponent_CacheDesc_LeftWrapper'>
          <div className='MapComponent_CacheDesc_CacheName'>{currCache}</div>
          <div className='MapComponent_CacheDesc_CacheUser'>{currUser}</div>
          <div className='MapComponent_CacheDesc_CacheDesc'>{currDesc}</div>
          {calculateDistance(userPos, currPos) < 0.150 ? "Open audio" : "Move closer to interact"}
        </div>
        <button className='MapComponent_CacheDesc_Close' onClick={() => {
          setCurrCache("none")
          zoomOut()
        }}>X</button>
      </div> : 
      <BottomNav />
      }
    </>
  );
};

function MapComponent() {
  return (
    <div className='MapComponent' >
      <APIProvider apiKey={'AIzaSyDQ5luUuZcCXzct_Wcv8QI_dsTmANvKxu4'} onLoad={() => console.log('Maps API has loaded.')}>
        <Map
            defaultZoom={15}
            // defaultCenter={ { lat: userPos["lat"], lng: userPos["lng"] } }
            defaultCenter={ { lat: userPos["lat"], lng: userPos["lng"] } }
            mapId={"57c4a73f6befac68 "}
            mapTypeControl = {false}
            streetViewControl = {false}
            zoomControl = {false}
            onCameraChanged={ (ev: MapCameraChangedEvent) =>
            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)}>
        </Map>
        <PoiMarkers pois={cacheLocations} />
      </APIProvider>
    </div>
  )
}

export default MapComponent
