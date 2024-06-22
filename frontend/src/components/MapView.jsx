
// MapComponent.js

import React, { useRef, useEffect, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import Polyline from "@arcgis/core/geometry/Polyline";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import useMobileMap from "../pages/useMobileMap";

const MapComponent = () => {

  const currentLocation = { lat: 40.7128, long: -74.0060 }; // Dummy coordinates for New York City
  const incident = { lat: 34.0522, long: -118.2437 }; // Dummy coordinates for Los Angeles
  const _ = useMobileMap(currentLocation, incident);
  console.log(_)

  const mapDiv = useRef(null);
  const [location, setLocation] = useState([115.8575, -31.9505]); // Default coordinates for Perth, Australia

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation([position.coords.longitude, position.coords.latitude]);
      });
    }
  }, []);

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
        center: location, // Coordinates for current location
        scale: 100000 // Represents the map scale at the center of the view.
      });

      // Create a symbol for the current location marker
      const currentLocationMarkerSymbol = new SimpleMarkerSymbol({
        color: [0, 0, 255], // Blue color
        outline: {
          color: [255, 255, 255],
          width: 2
        }
      });

      // Create a symbol for the clicked location marker
      const clickedLocationMarkerSymbol = new SimpleMarkerSymbol({
        color: [226, 119, 40], // Original color
        outline: {
          color: [255, 255, 255],
          width: 2
        }
      });

      // Create a symbol for the route line
      const routeLineSymbol = new SimpleLineSymbol({
        color: [226, 119, 40], // Original color
        width: 4
      });

      // Traffic light images
      const trafficLightImages = [
        "https://iili.io/d29hlf9.png", // green
        "https://iili.io/d29hYVS.png", // orange
        "https://iili.io/d29hRDl.png"  // red
      ];
      
      // Initial traffic light symbol
      let trafficLightSymbol = new PictureMarkerSymbol({
        url: trafficLightImages[0],
        width: "48px",
        height: "48px"
      });

      // Create a point for the traffic light
      const trafficLightPoint = new Point({
        longitude: 115.8947512293657,
        latitude: -31.94800289811695
      });

      // Create a graphic for the traffic light and add the geometry and symbol to it
      const trafficLightGraphic = new Graphic({
        geometry: trafficLightPoint,
        symbol: trafficLightSymbol
      });

      // Function to update traffic light symbol
      const updateTrafficLightSymbol = (url) => {
        trafficLightSymbol = new PictureMarkerSymbol({
          url: url,
          width: "48px",
          height: "48px"
        });
        trafficLightGraphic.symbol = trafficLightSymbol;
      };

      // Function to animate traffic light images every 1 second
      const animateTrafficLights = () => {
        let index = 0;
        setInterval(() => {
          index = (index + 1) % trafficLightImages.length;
          updateTrafficLightSymbol(trafficLightImages[index]);
        }, 1000);
      };

      animateTrafficLights();

      // Create a point from current location
      const point = new Point({
        longitude: location[0],
        latitude: location[1]
      });

      // Create a graphic and add the geometry and symbol to it
      const pointGraphic = new Graphic({
        geometry: point,
        symbol: currentLocationMarkerSymbol
      });

      // Add the graphic to the view
      view.graphics.add(pointGraphic);
      view.graphics.add(trafficLightGraphic);

      view.on("click", function(event){
        // Create a point from where the user clicked
        const point = new Point({
          longitude: event.mapPoint.longitude,
          latitude: event.mapPoint.latitude
        });

        console.log(point.longitude, point.latitude)

        // Create a graphic and add the geometry and symbol to it
        const pointGraphic = new Graphic({
          geometry: point,
          symbol: clickedLocationMarkerSymbol
        });

        // Add the graphic to the view
        view.graphics.add(pointGraphic);

        // Create a polyline from current location to clicked location
        const polyline = new Polyline({
          paths: [
            [location[0], location[1]],
            [event.mapPoint.longitude, event.mapPoint.latitude]
          ]
        });

        // Create a graphic and add the geometry and symbol to it
        const polylineGraphic = new Graphic({
          geometry: polyline,
          symbol: routeLineSymbol
        });

        // Add the graphic to the view
        view.graphics.add(polylineGraphic);
      });

      return () => view && view.destroy()

    }
  }, [location]);

  return <div className="mapDiv" ref={mapDiv} style={{height: '100vh', width: "100%", margin: "0 auto"}}></div>;
}

export default MapComponent;
