
import React, { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import EsriMap from "@arcgis/core/Map";
import Graphic from "@arcgis/core/Graphic";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import { createTrafficLightGraphic } from "./components/TrafficLight"; // Assuming this function exists

const MapComponent = ({currentLocation, }) => {
  const mapDiv = useRef(null);
  const incident = { lat: -31.943389292967396, long: 115.86419464836511 } // 5km away from Perth CBD and 20 meters to the left

  useEffect(() => {
    const map = new EsriMap({
      basemap: "dark-gray" // Changed basemap to dark-gray for a dark theme
    });

    const view = new MapView({
      container: mapDiv.current,
      map: map,
      center: [currentLocation?.long ?? 0, currentLocation?.lat ?? 0],
      scale: 10000
    });

    // Add click event to display lat and long
    view.on("click", function (event) {
      console.log([event.mapPoint.longitude, event.mapPoint.latitude]);
    });

    const incidentMarker = new Graphic({
      geometry: {
        type: "point",
        longitude: incident.long,
        latitude: incident.lat
      },
      symbol: new SimpleMarkerSymbol({
        color: "red",
        size: "8px",
        outline: {
          color: "white",
          width: 1
        }
      })
    });
    const currentLocationMarker = new Graphic({
      geometry: {
        type: "point",
        longitude: currentLocation?.long ?? 0,
        latitude: currentLocation?.lat ?? 0
      },
      symbol: new SimpleMarkerSymbol({
        color: "blue",
        size: "8px",
        outline: {
          color: "white",
          width: 1
        }
      })
    });

    
    view.graphics.add(currentLocationMarker);

    // Fetch and add traffic lights
    fetch(`http://localhost:3000/api/trpc/getSignals?batch=1&input={"0":{"topLeftCorner":{"lat":${currentLocation?.lat + 0.05},"long":${currentLocation?.long - 0.05}},"bottomRightCorner":{"lat":${currentLocation?.lat - 0.05},"long":${currentLocation?.long + 0.05}}}}`)
      .then(response => response.json())
      .then(data => {
        if (data[0] && data[0].result && data[0].result.data) {
          const features = data[0].result.data.features;
          features.forEach(feature => {
            const trafficLightGraphic = createTrafficLightGraphic(feature.geometry.coordinates[0], feature.geometry.coordinates[1], feature.properties.currentColour);
            view.graphics.add(trafficLightGraphic);
          });
        }
      });

      view.graphics.add(incidentMarker);


  }, []);

  return <div ref={mapDiv} style={{ height: "100vh", width: "100vw" }} />;
};

export default MapComponent;
