
import React, { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import EsriMap from "@arcgis/core/Map";
import Graphic from "@arcgis/core/Graphic";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import { createTrafficLightGraphic } from "./components/TrafficLight"; // Assuming this function exists
import Polyline from "@arcgis/core/geometry/Polyline";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

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
            const trafficLightGraphic = createTrafficLightGraphic(feature.geometry.coordinates[0], feature.geometry.coordinates[1], 'green');
            view.graphics.add(trafficLightGraphic);
          });
        }
      });

      console.log("Fetching road route...");
      fetch(`http://localhost:3000/api/trpc/getRoadRoute?batch=1&input={"0":{"a":{"lat":${currentLocation?.lat},"long":${currentLocation?.long}},"b":{"lat":${incident.lat},"long":${incident.long}}}}`)
        .then(response => {
          console.log("Received response from road route fetch:", response);
          return response.json();
        })
        .then(data => {
          console.log("Received data from road route fetch:", data);
          if (data[0].result && data[0].result.data) {
            const geoJSONData = data[0].result.data.geojson;
            console.log("GeoJSON data:", geoJSONData);

            const geometryType = geoJSONData.features[0].geometry.type;
            console.log("Geometry type:", geometryType);
            let validGeometryType;

            switch (geometryType) {
              case 'LineString':
                validGeometryType = 'polyline';
                break;
              default:
                console.error('Invalid geometry type:', geometryType);
                return;
            }

            const polyline = new Polyline({
              paths: geoJSONData.features[0].geometry.coordinates,
              spatialReference: { wkid: 4326 }
            });
            console.log("Created polyline:", polyline);

            const featureLayer = new FeatureLayer({
              source: [{ geometry: polyline, attributes: {} }],
              objectIdField: "objectId",
              spatialReference: view.spatialReference,
              geometryType: validGeometryType,
            });
            console.log("Created feature layer:", featureLayer);

            map.add(featureLayer);
            console.log("Feature layer added to the map view.");

            // Add properties of features[0] to local storage
            const properties = geoJSONData.features[0].properties;
            localStorage.setItem('properties', JSON.stringify(properties));
          }
        })
        .catch(error => {
          console.error("Error fetching route:", error.message);
        });

      view.graphics.add(incidentMarker);

    return () => {
      if (view) {
        view.destroy();
        console.log("Map view destroyed");
      }
      if (map) {
        map.destroy();
        console.log("Map destroyed");
      }
    };
  }, []);

  return <div ref={mapDiv} style={{ height: "100vh", width: "100vw" }} />;
};

export default MapComponent;
