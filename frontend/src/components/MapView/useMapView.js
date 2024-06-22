
import {  useEffect, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import { trafficLightGraphic, animateTrafficLights } from "./components/TrafficLight";
import { orangePointGraphic } from "./components/IncidentLocation";
import {createPointGraphic} from './components/CurrentLocation'

function useMapView({mapDiv}) {
    
    const [currentLocation, setCurrentLocation] = useState([115.8575, -31.9505]); // Default coordinates for Perth, Australia
    useEffect(() => {
        if (mapDiv.current) {
          /**
           * Initialize application
           */
          const webmap = new Map({
            basemap: "dark-gray-vector"
          });
    
          const view = new MapView({
            container: mapDiv.current, // The id or node representing the DOM element containing the view.
            map: webmap, // An instance of a Map object to display in the view.
            center: currentLocation, // Coordinates for current location
            scale: 10000 // Represents the map scale at the center of the view.
          });

          // Add onclick event to the view to console.log the coordinates
          view.on("click", function(event){
            console.log([event.mapPoint.longitude, event.mapPoint.latitude]);
          });

    
          animateTrafficLights();

          // Add the graphics to the view
          view.graphics.add(createPointGraphic(currentLocation));
          view.graphics.add(trafficLightGraphic);
          view.graphics.add(orangePointGraphic);
    
          return () => view && view.destroy()
    
        }
      }, [location]);
        // get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation([position.coords.longitude, position.coords.latitude]);
      });
    }
  }, []);
}

export default useMapView