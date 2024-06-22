

import { useEffect, useState, useCallback, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { trafficLightGraphic, animateTrafficLights } from "./components/TrafficLight";
import { orangePointGraphic } from "./components/IncidentLocation";
import { createPointGraphic } from './components/CurrentLocation';
import { trpc } from "../../../utils/trpc";

function useMapView({ mapDiv }) {
  const [currentLocation, setCurrentLocation] = useState([115.8575, -31.9505]); // Default coordinates for Perth, Australia
  const incidentLocation = [115.8575, -31.9505]; // Dummy incident location, should be updated based on actual logic
  const [geoJSONData, setGeoJSONData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const viewRef = useRef(null);

  const fetchGeoJSONData = useCallback(async () => {
    if (!geoJSONData) {
      const roadRouteQuery = await trpc.getRoadRoute.useQuery({
        a: currentLocation,
        b: incidentLocation,
      });
      if (roadRouteQuery.result) {
        setGeoJSONData(roadRouteQuery.result.data);
        setIsLoading(false);
      }
    }
  }, [currentLocation, incidentLocation, geoJSONData]);

  useEffect(() => {
    fetchGeoJSONData();
  }, [fetchGeoJSONData]);

  useEffect(() => {
    if (mapDiv.current && !isLoading && geoJSONData && !viewRef.current) {
      /**
       * Initialize application
       */
      const view = new MapView({
        container: mapDiv.current, // The id or node representing the DOM element containing the view.
        center: currentLocation, // Coordinates for current location
        scale: 10000 // Represents the map scale at the center of the view.
      });

      // Create a FeatureLayer with the data from useMobileMap
      const featureLayer = new FeatureLayer({
        source: geoJSONData.features, // GeoJSON features
        objectIdField: "objectId", // GeoJSON objectIdFieldName
        spatialReference: view.spatialReference, // GeoJSON spatialReference
        geometryType: geoJSONData.features[0].geometry.type, // GeoJSON geometryType
      });

      // Add the FeatureLayer to the view
      view.map.add(featureLayer);

      // Add onclick event to the view to console.log the coordinates
      view.on("click", function (event) {
        console.log([event.mapPoint.longitude, event.mapPoint.latitude]);
      });

      animateTrafficLights();

      // Add the graphics to the view
      view.graphics.add(createPointGraphic(currentLocation));
      view.graphics.add(trafficLightGraphic);
      view.graphics.add(orangePointGraphic);

      viewRef.current = view;

      return () => view && view.destroy();
    }
  }, [mapDiv, currentLocation, geoJSONData, isLoading]);

  // get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation([position.coords.longitude, position.coords.latitude]);
      });
    }
  }, []);
}

export default useMapView;

