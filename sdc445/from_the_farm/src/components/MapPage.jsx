/*
=========================================================
SDC445 - Interface Design
From the Farm

Description:
Interactive map page for discovering nearby farms,
farmers' markets, and local suppliers.
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
        <div className="map-canvas">
          <iframe
            className="google-map-frame"
            title="Interactive map of local farms and farmers markets near Charleston, South Carolina"
            src="https://www.google.com/maps?q=farmers%20markets%20and%20farms%20near%20Charleston%2C%20SC&z=10&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
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
