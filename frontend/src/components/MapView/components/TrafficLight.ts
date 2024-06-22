import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";

// Traffic light images
const trafficLightImages = {
  green: "https://iili.io/d29hlf9.png",
  yellow: "https://iili.io/d29hYVS.png",
  red: "https://iili.io/d29hRDl.png",
};

// Function to create traffic light graphic
export const createTrafficLightGraphic = (longitude: number, latitude: number, currentColour?: 'red' | 'green' | 'yellow') => {
  const symbolSize = "20px"; // Set the width and height as a constant

  // Initial traffic light symbol
  let trafficLightSymbol = new PictureMarkerSymbol({
    url: currentColour ? trafficLightImages[currentColour] : trafficLightImages.green,
    width: symbolSize,
    height: symbolSize,
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
      width: symbolSize,
      height: symbolSize,
    });
    trafficLightGraphic.symbol = trafficLightSymbol;
  };

  // Function to animate traffic light images every 1 second
  // let index = 0;
  // const trafficLightColors = Object.keys(trafficLightImages);
  // setInterval(() => {
  //   index = (index + 1) % trafficLightColors.length;
  //   updateTrafficLightSymbol(trafficLightImages[trafficLightColors[index]]);
  // }, 1000);

  // Create a graphic for the traffic light and add the geometry and symbol to it
  const trafficLightGraphic = new Graphic({
    geometry: trafficLightPoint,
    symbol: trafficLightSymbol,
  });

  return trafficLightGraphic;
};
