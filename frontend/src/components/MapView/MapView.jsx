
import React, { useEffect, useRef, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import useMobileMap from "../../pages/useMobileMap";
import Polyline from "@arcgis/core/geometry/Polyline";
import EsriMap from "@arcgis/core/Map";
import Graphic from "@arcgis/core/Graphic";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import { createTrafficLightGraphic } from "./components/TrafficLight";


const MapComponent = ({currentLocation}) => {
  const mapDiv = useRef(null);
  const [mapCorners, setMapCorners] = useState({ topLeft: null, bottomRight: null });
  const incident = { lat: -31.886050214319926, long: 116.00576453014557 }; // 5km away from Perth CBD

  useEffect(() => {

  }, [mapCorners])

  const roadRouteQuery = useMobileMap(currentLocation, incident);
  // const signalQuery = useSignals()
  // console.log(signalQuery)

  useEffect(() => {
    if (currentLocation && roadRouteQuery.isSuccess && roadRouteQuery.data && roadRouteQuery.data.geojson.features) {
      console.log("Road route query was successful and data is available.");
      const geoJSONData = roadRouteQuery.data.geojson;

      const map = new EsriMap({
        basemap: "dark-gray" // Changed basemap to dark-gray for a dark theme
      });
    
      const view = new MapView({
        container: mapDiv.current,
        map: map,
        center: [currentLocation?.long ?? 0, currentLocation?.lat ?? 0],
        scale: 10000,
        spatialReference: {
          wkid: 4326
        }
      });

      // Add click event to display lat and long
      view.on("click", function (event) {
        console.log([event.mapPoint.longitude, event.mapPoint.latitude]);
      });

      // Store the top left and bottom right coordinates of the map in state
      view.watch("extent", function (extent) {
        const newMapCorners = {
          topLeft: { lat: extent.ymax, long: extent.xmin },
          bottomRight: { lat: extent.ymin, long: extent.xmax }
        };
        if (JSON.stringify(newMapCorners) !== JSON.stringify(mapCorners)) {
          setMapCorners(newMapCorners);
        }
      });

      if (mapCorners.topLeft && mapCorners.bottomRight) {
        console.log("Fetching signals with map corners:", mapCorners);
        fetch(`http://localhost:3000/api/trpc/getSignals?batch=1&input={"0":{"topLeftCorner":{"lat":${mapCorners.topLeft.lat},"long":${mapCorners.topLeft.long}},"bottomRightCorner":{"lat":${mapCorners.bottomRight.lat},"long":${mapCorners.bottomRight.long}}}}`)
          .then(response => {
            console.log("Received response:", response);
            return response.json();
          })
          .then(data => {
            console.log("Received data:", data);
            if (data[0] && data[0].result && data[0].result.data) {
              const features = data[0].result.data.features;
              console.log("Processing features:", features);
              features.forEach(feature => {
                const trafficLightGraphic = createTrafficLightGraphic(feature.geometry.coordinates[0], feature.geometry.coordinates[1], feature.properties.currentColour);
                console.log("Adding traffic light graphic to view:", trafficLightGraphic);
                view.graphics.add(trafficLightGraphic);
              });
            }
          });
      }

      const geometryType = geoJSONData.features[0].geometry.type;
      const properties = geoJSONData.features[0].properties;
      localStorage.setItem('properties', JSON.stringify(properties));

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

      const featureLayer = new FeatureLayer({
        source: [{ geometry: polyline, attributes: {} }],
        objectIdField: "objectId",
        spatialReference: view.spatialReference,
        geometryType: validGeometryType,
      });

      map.add(featureLayer);
      console.log("Feature layer added to the map view.");

      // Add markers for current location and incident with white borders
      const currentLocationMarker = new Graphic({
        geometry: {
          type: "point",
          longitude: currentLocation.long,
          latitude: currentLocation.lat
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

      const incidentMarker = new Graphic({
        geometry: {
          type: "point",
          longitude: incident.long,
          latitude: incident.lat
        },
        symbol: new SimpleMarkerSymbol({
          color: "orange",
          size: "8px",
          outline: {
            color: "white",
            width: 1
          }
        })
      });

      view.graphics.addMany([currentLocationMarker, incidentMarker]);

    } else if (roadRouteQuery.error) {
      console.error("Error fetching road route:", roadRouteQuery.error.message);
    } else {
      console.log("Road route query is still in progress or has not started yet.");
    }
  }, [currentLocation, roadRouteQuery, mapCorners]);

  return <div ref={mapDiv} style={{ height: "100vh", width: "100vw" }} />;
};

export default MapComponent;



