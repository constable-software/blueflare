import { defineCustomElements } from "@arcgis/map-components/dist/loader";
import MapView from "../components/MapView/MapView";

function Map() {
  defineCustomElements(window, {
    resourcesUrl: "https://js.arcgis.com/map-components/4.29/assets",
  });
  return (
    <div>
      <header className="flex justify-between items-center bg-white">
        <h1 className="text-2xl font-bold">Blueflare</h1>
        <nav>
          <ul className="flex list-none">
            <li className="mr-2.5">Menu Item 1</li>
            <li className="mr-2.5">Menu Item 2</li>
            <li className="mr-2.5">Menu Item 3</li>
          </ul>
        </nav>
        <div className="flex mr-2.5">
          <button className="bg-black text-white px-4 py-2 rounded mr-6">
            Share
          </button>
          <button className="flex items-center justify-center rounded-full bg-gray-200 h-10 w-10 overflow-hidden">
            <img
              src="/path/to/profile-pic.jpg"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </button>
        </div>
      </header>
      <div style={{ width: "100%", display: 'flex' }}>
        <div style={{ width: "20rem" }}>Side</div>
        <MapView />
        <div style={{ width: "20rem" }}>Side</div>
      </div>
    </div>
  );
}

export default Map;
