import React from 'react'
import {APIProvider, Map, MapCameraChangedEvent, AdvancedMarker, Pin} from '@vis.gl/react-google-maps';
import "./styles/HomeScreen.css"

  type Poi ={ key: string, location: google.maps.LatLngLiteral }

  const locations: Poi[] = [
  {key: 'c1', location: { lat: 49.2606, lng: -123.2460 }},
  {key: 'c2', location: { lat: 49.2506, lng: -123.2560 }},
  {key: 'c3', location: { lat: 49.2406, lng: -123.2660 }},
];

const PoiMarkers = (props: {pois: Poi[]}) => {
  return (
    <>
      {props.pois.map( (poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}>
        <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
        </AdvancedMarker>
      ))}
    </>
  );
};

function HomeScreen() {
  return (
    <div className='HomeScreen' >
    <APIProvider apiKey={'AIzaSyDQ5luUuZcCXzct_Wcv8QI_dsTmANvKxu4'} onLoad={() => console.log('Maps API has loaded.')}>
   <Map
      defaultZoom={15}
      defaultCenter={ { lat: 49.2606, lng: -123.2460 } }
      mapId={"57c4a73f6befac68 "}
      onCameraChanged={ (ev: MapCameraChangedEvent) =>
        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)}>
   </Map>
   <PoiMarkers pois={locations} />
    </APIProvider>
    </div>
  )
}

export default HomeScreen
