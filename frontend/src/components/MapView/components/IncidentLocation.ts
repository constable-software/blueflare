          import Graphic from "@arcgis/core/Graphic";
          import Point from "@arcgis/core/geometry/Point";
          import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

          // Create a symbol for the orange point
          const orangePointSymbol = new SimpleMarkerSymbol({
            color: [255, 165, 0], // Orange color
            outline: {
              color: [255, 255, 255],
              width: 2
            }
          });
    
          // Create a point for the orange point
          const orangePoint = new Point({
            longitude: 115.86328432181115,
            latitude: -31.950910295285375
          });
    
          // Create a graphic for the orange point and add the geometry and symbol to it
          export const orangePointGraphic = new Graphic({
            geometry: orangePoint,
            symbol: orangePointSymbol
          });