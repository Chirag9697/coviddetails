import React, {Component} from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import {ReactMapboxGlCluster} from 'react-mapbox-gl-cluster';
import {data} from './data';
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode"

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiY2hpcmFnMjEyIiwiYSI6ImNsbXA5azd1MTB6NXAybXIyZnUyaW5xMnYifQ.RLxPNDIgNTopILBiHGceYw",
});

const mapProps = {
  center: [-95.7129, 37.0902],
  zoom: [3],
  style: 'mapbox://styles/mapbox/streets-v8',
};


export const Mapdata = () => {
 function getEventHandlers() {
    return {
      onClick: (properties, coords, offset) =>
        console.log(`Receive event onClick at properties: ${properties}, coords: ${coords}, offset: ${offset}`),
      onMouseEnter: (properties, coords, offset) =>
        console.log(`Receive event onMouseEnter at properties: ${properties}, coords: ${coords}, offset: ${offset}`),
      onMouseLeave: (properties, coords, offset) =>
        console.log(`Receive event onMouseLeave at properties: ${properties}, coords: ${coords}, offset: ${offset}`),
      onClusterClick: (properties, coords, offset) =>
        console.log(`Receive event onClusterClick at properties: ${properties}, coords: ${coords}, offset: ${offset}`),
    };
  }
  setDefaults({
    key: "AIzaSyB5BA_XNWjFnzgc4prxdeD2V_soTveqiBM", // Your API key here.
    language: "en", // Default language for responses.
    region: "es", // Default region for responses.
  });
  setKey("AIzaSyB5BA_XNWjFnzgc4prxdeD2V_soTveqiBM");
  setLanguage("en"); // Default language for responses.
  // Set default response region (optional).
  // This sets the default region for geocoding responses.
  setRegion("es"); 
  fromAddress("Eiffel Tower")
  .then(({ results }) => {
    const { lat, lng } = results[0].geometry.location;
    console.log(lat, lng);
  })
  .catch(console.error);


  return (
    <div className="App">
        <Map {...mapProps}  >
          <ReactMapboxGlCluster data={data} {...getEventHandlers()} />
        </Map>
      </div>
  );
};
