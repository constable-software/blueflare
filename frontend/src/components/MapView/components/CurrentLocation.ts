
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

export function createPointGraphic(location: [number, number]) {
// Create a symbol for the current location marker
const currentLocationMarkerSymbol = new SimpleMarkerSymbol({
    color: [0, 0, 255], // Blue color
    outline: {
    color: [255, 255, 255],
    width: 2
    }
});

// Create a point from current location
const point = new Point({
    longitude: location[0],
    latitude: location[1]
});

// Create a graphic and add the geometry and symbol to it
return new Graphic({
    geometry: point,
    symbol: currentLocationMarkerSymbol
});
}
