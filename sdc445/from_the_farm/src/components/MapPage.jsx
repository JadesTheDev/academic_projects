/*
=========================================================
SDC445 - Interface Design
From the Farm

Description:
Map page prototype for discovering nearby farms, markets,
and local food listings. Locations are sample data and the
map is a visual placeholder for a future mapping service.
=========================================================
*/

import "./MapPage.css";

const locations = [
  {
    id: 1,
    name: "Lowcountry Family Farm",
    type: "Farm",
    distance: "2.4 miles",
    note: "Vegetables, eggs, and seasonal herbs"
  },
  {
    id: 2,
    name: "Saturday Community Market",
    type: "Farmers' Market",
    distance: "4.1 miles",
    note: "Local produce, baked goods, honey, and crafts"
  },
  {
    id: 3,
    name: "Creekside Honey & Produce",
    type: "Supplier",
    distance: "6.8 miles",
    note: "Wildflower honey, tomatoes, peppers, and squash"
  }
];

function MapPage() {
  return (
    <section className="map-page">
      <div className="page-heading">
        <p className="page-eyebrow">Explore nearby</p>
        <h2>Local Food Map</h2>
        <p>
          Find farms, farmers&apos; markets, and local suppliers near you.
        </p>
      </div>

      <div className="map-layout">
        <div className="map-canvas" aria-label="Map preview placeholder">
          <div className="map-road map-road-one" />
          <div className="map-road map-road-two" />
          <div className="map-road map-road-three" />

          <button className="map-pin pin-one" type="button" aria-label="Lowcountry Family Farm">
            <span>1</span>
          </button>
          <button className="map-pin pin-two" type="button" aria-label="Saturday Community Market">
            <span>2</span>
          </button>
          <button className="map-pin pin-three" type="button" aria-label="Creekside Honey and Produce">
            <span>3</span>
          </button>

          <div className="map-placeholder-label">
            Interactive map coming in a future version
          </div>
        </div>

        <div className="map-results">
          <h3>Nearby locations</h3>

          {locations.map((location, index) => (
            <article className="location-card" key={location.id}>
              <div className="location-number">{index + 1}</div>
              <div>
                <p className="location-type">{location.type}</p>
                <h4>{location.name}</h4>
                <p>{location.note}</p>
                <span>{location.distance} away</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MapPage;
