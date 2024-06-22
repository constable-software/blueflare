
import React, { useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import EsriMap from "@arcgis/core/Map";
import Graphic from "@arcgis/core/Graphic";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

const MapComponent = () => {
  const mapDiv = useRef(null);
  const incident = { lat: -31.886050214319926, long: 116.00576453014557 }; // 5km away from Perth CBD

  const map = new EsriMap({
    basemap: "dark-gray" // Changed basemap to dark-gray for a dark theme
  });

  const view = new MapView({
    container: mapDiv.current,
    map: map,
    center: [incident.long, incident.lat], // Centering the map on the incident
    scale: 10000
  });

  const incidentMarker = new Graphic({
    geometry: {
      type: "point",
      longitude: incident.long,
      latitude: incident.lat
    },
    symbol: new SimpleMarkerSymbol({
      color: "grey",
      size: "8px",
      outline: {
        color: "white",
        width: 1
      }
    })
  });

  view.graphics.add(incidentMarker);

  return <div ref={mapDiv} style={{ height: "100vh", width: "100vw" }} />;
};

export default MapComponent;
