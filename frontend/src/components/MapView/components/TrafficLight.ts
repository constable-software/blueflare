import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";

// Traffic light images
const trafficLightImages = [
  "https://iili.io/d29hlf9.png", // green
  "https://iili.io/d29hYVS.png", // orange
  "https://iili.io/d29hRDl.png", // red
];

// Function to create traffic light graphic
export const createTrafficLightGraphic = (longitude: number, latitude: number) => {
  // Initial traffic light symbol
  let trafficLightSymbol = new PictureMarkerSymbol({
    url: trafficLightImages[0],
    width: "10px",
    height: "10px",
  });

  // Create a point for the traffic light
  const trafficLightPoint = new Point({
    longitude: longitude,
    latitude: latitude,
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
  let index = 0;
  setInterval(() => {
    index = (index + 1) % trafficLightImages.length;
    updateTrafficLightSymbol(trafficLightImages[index]);
  }, 1000);

  // Create a graphic for the traffic light and add the geometry and symbol to it
  const trafficLightGraphic = new Graphic({
    geometry: trafficLightPoint,
    symbol: trafficLightSymbol,
  });

  return trafficLightGraphic;
};
