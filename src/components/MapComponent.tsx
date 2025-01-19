import React, { useState, useRef, useEffect, useCallback } from 'react'
import {APIProvider, Map, MapCameraChangedEvent, AdvancedMarker, Pin, useMap} from '@vis.gl/react-google-maps';
import {MarkerClusterer} from '@googlemaps/markerclusterer';
import type {Marker} from '@googlemaps/markerclusterer';
import "./styles/MapComponent.css"

let userPos = new Object()

navigator.geolocation.getCurrentPosition((position) => {
  userPos["lat"] = position.coords.latitude
  userPos["lng"] = position.coords.longitude
});

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
    setCurrCache(key["cacheName"])
    setCurrUser(key["user"])
    setCurrDesc(key["desc"])
    console.log(key)
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
            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
        </AdvancedMarker>
        
      ))}
      {currCache != "none" ? 
      <div className='MapComponent_CacheDesc'>
        {currCache}
        {currUser}
        {currDesc}
      </div> : ""}
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
            defaultCenter={ { lat: 49.2625931, lng: -123.2448568 } }
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
