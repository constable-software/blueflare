
// MapComponent.js

import React, { useRef} from "react";
import useMobileMap from "../../pages/useMobileMap";
import useMapView from "./useMapView";

const MapComponent = () => {

  const currentLocation = { lat: 40.7128, long: -74.0060 }; // Dummy coordinates for New York City
  const incident = { lat: 34.0522, long: -118.2437 }; // Dummy coordinates for Los Angeles
  const _ = useMobileMap(currentLocation, incident);
  console.log(_)
  const mapDiv = useRef(null);

  useMapView({mapDiv});

  return <div className="mapDiv" ref={mapDiv} style={{height: '100vh', width: "100%", margin: "0 auto"}}></div>;
}

export default MapComponent;
