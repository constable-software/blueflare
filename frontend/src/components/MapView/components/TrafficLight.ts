import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";

// Traffic light images
const trafficLightImages = [
  "https://iili.io/d29hlf9.png", // green
  "https://iili.io/d29hYVS.png", // orange
  "https://iili.io/d29hRDl.png", // red
];

// Initial traffic light symbol
let trafficLightSymbol = new PictureMarkerSymbol({
  url: trafficLightImages[0],
  width: "10px",
  height: "10px",
});

// Create a point for the traffic light
const trafficLightPoint = new Point({
  longitude: 115.85964968087654,
  latitude: -31.95588577469807,
});

// Function to update traffic light symbol
const updateTrafficLightSymbol = (url: string) => {
  trafficLightSymbol = new PictureMarkerSymbol({
    url: url,
    width: "48px",
    height: "48px",
  });
  trafficLightGraphic.symbol = trafficLightSymbol;
};

// Function to animate traffic light images every 1 second
export const animateTrafficLights = () => {
  let index = 0;
  setInterval(() => {
    index = (index + 1) % trafficLightImages.length;
    updateTrafficLightSymbol(trafficLightImages[index]);
  }, 1000);
};

// Create a graphic for the traffic light and add the geometry and symbol to it
export const trafficLightGraphic = new Graphic({
  geometry: trafficLightPoint,
  symbol: trafficLightSymbol,
});
