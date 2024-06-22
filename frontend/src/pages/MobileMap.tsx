import { defineCustomElements } from "@arcgis/map-components/dist/loader";
import MapView from "../components/MapView/MapView";
import PreIncidentMapView from "../components/MapView/PreIncidentMapView";
import logo from "../assets/image.png";
import { useState } from "react";

function MobileMap() {
  defineCustomElements(window, {
    resourcesUrl: "https://js.arcgis.com/map-components/4.29/assets",
  });
  const { totalTravelTime, totalDistance } = JSON.parse(localStorage.getItem('properties') ?? '{}');
  const [incidentAccepted, setIncidentAccepted] = useState(false);

  return (
    <div className="bg-black">
      <header className="flex justify-between items-center px-5 bg-black">
        <img
          src={logo}
          alt="Blueflare"
          className="w-52 object-cover pt-1 -translate-x-4"
        />
        <div className="flex mr-2.5">
          <button className="bg-black text-white px-4 py-2 rounded mr-6">
            Share
          </button>
          <button className="flex items-center justify-center rounded-full bg-gray-200 h-10 w-10 overflow-hidden">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAACUCAMAAABLLAe1AAAAM1BMVEXR1dr////N0tf5+fr///3R0tj19vbq7O78/PzY2d3V2d3f4OTv8PHi5OfZ3+Hm5+nr6e4RR3bZAAAEnUlEQVR4nO2d25qrIAxG5RBERZ33f9qNWve0nWoxsWJS19eb3pFfhJADFsXFxUVe9Pj7SrTWdaRp6qqOf3IP51gAiq7tyxCcM8a5EMqmgNyDOoz45NsyGK/uMaH5jkkQn307G2/tvQS+/AYFNJRPj/4/VolXAKAuXxt/Q7gCAD+r5sc50IpWoDPr9kcFfCV4L+gX3v3HlwDEOkZB2ff2K9/3bVNL1CCkmH/DlfJ8gjLp+Q+MzoEva1ES6Db98c+zQJACAFXK+vesQCNmQwBA2K+sq6TMgXf+z4IAKuQe+F7UGPsHhHjGOuDMt1bKMoBZAW5TQIIAev0AuIoX4RC9PQKt0OcePB3d4t+AwR3KPX4y2CXwBn8BCkcSgP8+0FCWAKV+uAuge5L9ylW5LSBCXAL4r4I1UQCf2wAqNW0NVCq3AUQ0cQ1kL0DcBDbEAl/BfA2IfiBRgC63CTQQwUBhAhDdAP4CEM7ClwCXAJcAiv82eAnw7QKQt8HcFhChRQQjnvsMoLrC7OMBLfEwxF0ATY0HsE+QkgXgHhMsiCGxnntujOoItLkNIFJXxBnQdqynQL1YGZ2KMayrZ1uVXB23DOeNkHwSGGBcKFNRkwIj7tsF8JcAue1AQ90DJ8wlQG470MAuuwDjRbAg54UGAl8BdLODH8S5VE53REd4hHNmgFweMZDbCApv+iSTYOwG7JEdZ30UKMhVggPMY2Lkd4CzF1DsUSTFOyJEzo1Zxk7AhIaeMAcMe/sj0KCdAcd9/k9Aj3SIPet46B0VUgDT5B75TgBSAPal8jMauQgE7s0SM9itUETX4ATKfiOiaXBEo8IC3Gsj7gBUcJRxKOwZaBD2i/ECIlAj3GEj5w2IIPYBQW9ApNo+BQRdohKBzbEx3pGwv9RpF0n9AnK8oBH9/ia1B+RdqqabLUWz7KvjXqCTbpObkLUDzEQFEucA+/rYBaBPE8DLiIT9JS4DSQIYzunQNVK7J7xcAZLs550QXyO5cFpKMPSZZAG4l4gvcQmQGhiSkBB7BaQeB8rcI/0QyQJI9QSToyJBVDTsl+TIoKxw4C/J1SLc+2UXgPQ+YnnhkIEN6RH+l+i9YoMAgtKid2yom3W5x/oJNl0lIHEV3HSxnkBXaONdEmIuVp/ZWjJqZGXGEJ0DQZYCm+23ohSAFlEfYF0rwxsAgIBrHfKliE/wQe8trlDSWvaFYgBbs8LPuApYJ8rxleJ3EjB1C4evau7SPT4EiBjOAl00u7ROTxI0/L4+1u3SOD3jS1bpsuHp0/vlHjEllyhJHGa3u/mTBJ3moAFUSL8nQYJw/mChrj9m/iTBuU8Iep+bg9aI/vFpJTjA/FGC/qwSbKiDI0pwwvy5LjBHXjTuZEUku7p9aYTuRMuhbg55+R/x5VnaCqGi9EcTcP0pYse6dQoZ8aBhlXf5+4omxyeH/SM+b1k1AOxwSQgFq0ydM1YA5LvT6fg+nwD73BdIJmTyDFHfk/4Iefrsz2N/HgUA0Qr4OY5XAE7y/s8cXloIZba9/zUH7wXkT2fsjj80Wkb+bsIHOPTuVfrHYz7Agdn03A7wazzCJ/4HIWw43m6p6eEAAAAASUVORK5CYII="
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </button>
        </div>
      </header>
      <div style={{ width: "100%", display: 'flex', flexDirection: 'column' }}>
        <button
          style={{
            backgroundColor: 'red',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '10px',
            marginLeft: '10px',
            marginRight: '10px',
            opacity: 1
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.opacity = '0.5';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          onClick={() => setIncidentAccepted(true)}
        >
          Accept Incident
        </button>
        <div className="map-header flex gap-x-2" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#000' }}>
          <div className="time-to-destination flex gap-x-2" style={{ alignItems: 'center', width: '200px', color: 'white' }}>
            <span>Time Remaining:</span>
            <span>{totalTravelTime} min</span>
          </div>
          <div className="distance-travelled flex gap-x-2" style={{ alignItems: 'center', width: '200px', color: 'white' }}>
            <span>Distance Travelled: </span>
            <span>{totalDistance} km</span>
          </div>
        </div>
        {incidentAccepted ? <MapView /> : <PreIncidentMapView />}
      </div>
    </div>
  );
}

export default MobileMap