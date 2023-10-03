import React from 'react'
import MarkerClusterGroup from 'react-leaflet-cluster'
import {MapContainer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useState } from 'react'
// import  TileLayer  from 'leaflet'
import L from 'leaflet'
// import {addressPoints} from './realworld'
import { countrycodes } from './data'
import axios from 'axios';
import { useEffect } from 'react'
export const ClusterMap = () => {
  const[details1,setDetails1]=useState([]);
  const customIcon = new L.Icon({
    iconUrl: require('./location.svg').default,
    iconSize: new L.Point(40, 47),
  })
  const getAllDetails = async () => {
    const email = localStorage.getItem("email");
    try {
      const details = await axios.get(
        `http://localhost:5000/families/${email}`
      );
      if (details) {
        console.log("hello",details.data.allFamilyDetails);
        // console.log(details.data.allfamily1);
        let exactdetails=[];
        for(let i=0;i<details.data.allFamilyDetails.length;i++){
          if(details.data.allFamilyDetails[i]!=null){

            for(let j=0;j<countrycodes.length;j++){
              if(countrycodes[j].country.toLocaleLowerCase()==details.data.allFamilyDetails[i].members[0].address.toLocaleLowerCase()){
                exactdetails.push({...details.data.allFamilyDetails[i],...countrycodes[j]});
                break;
              }
            }
          }
        }
        setDetails1(exactdetails);
        
        console.log("details", exactdetails);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    getAllDetails();
  },[])
  return (
    <MapContainer
      style={{height: '500px'}}
      center={[38.9637, 35.2433]}
      zoom={1}
      scrollWheelZoom={true}
      maxZoom={10}
    >
       <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
      <MarkerClusterGroup
        chunkedLoading
      >
        {(details1).map((item, index) => (
          <Marker
            key={index}
            position={[item.latitude, item.longitude]}
            // title={address[2]}
            icon={customIcon}
          ></Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
}
export default ClusterMap;