
// MapComponent.js

import React, { useRef, useEffect, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import Polyline from "@arcgis/core/geometry/Polyline";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";

const MapComponent = () => {

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

      view.on("click", function(event){
        // Create a point from where the user clicked
        const point = new Point({
          longitude: event.mapPoint.longitude,
          latitude: event.mapPoint.latitude
        });

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
