import React, { useState, useEffect, useRef } from "react";
import { addSingleMarkers } from "./Markers";

const DEFAULT_CENTER = { lat: 	36.110336, lng: 128.4112384};
const DEFAULT_ZOOM = 16;


export const GoogleMaps = ({location, className}) => {
  const ref = useRef(null);
   //⭐ 맵의 상태 
  const [map, setMap] = useState(null);

  // 지도 초기화 하는 useEffect
  useEffect(() => {

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA7cuC-dzEXgBRPgwQiQp_jBVRaZtphYK0&callback=initMap&v=weekly`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);


    if (ref.current && !map) { // Check if map is not initialized yet
      const newMap = new window.google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
      });
      setMap(newMap); // Set the map state


      return () => {
        document.body.removeChild(script);
      }

    }
  }, [ref, map]); // Include map and mapCenter in dependency array


  console.log(location)


  useEffect(() => {
    if (map && location) {
      // 새로운 마커 추가
      addSingleMarkers({ location, map });
      // 지도 중심 변경
      map.setCenter(location);
    }
  }, [map, location]);


  return (
    <div
      ref={ref}
      style={{ width: "350px", height: "350px" }}
    />
  );
};
