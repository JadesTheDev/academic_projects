/*
=========================================================
SDC445 - Interface Design
From the Farm

Description:
Interactive map page for discovering nearby farms,
farmers' markets, and local suppliers.
=========================================================
*/

import { useMemo, useState } from "react";
import "./MapPage.css";
import { mapCategories, suppliers } from "../data/marketplaceData";

function MapPage() {
  const [search, setSearch] = useState("farms and farmers markets");
  const [locationText, setLocationText] = useState("Charleston, SC");
  const [locationMessage, setLocationMessage] = useState(
    "Location is optional. Charleston is used for the demo map."
  );

  const mapSrc = useMemo(
    () =>
      `https://www.google.com/maps?q=${encodeURIComponent(
        `${search} near ${locationText}`
      )}&z=10&output=embed`,
    [search, locationText]
  );

  function useMyLocation() {
    if (!navigator.geolocation) {
      setLocationMessage(
        "Location services are not supported by this browser."
      );
      return;
    }

    setLocationMessage("Requesting your location...");

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocationText(
          `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`
        );

        setLocationMessage(
          "Using your approximate device location for this map search."
        );
      },
      () =>
        setLocationMessage(
          "Location permission was not granted. You can keep using the app without it."
        ),
      {
        enableHighAccuracy: false,
        timeout: 8000,
      }
    );
  }

  return (
    <section className="map-page">
      <div className="page-heading">
        <p className="page-eyebrow">Explore nearby</p>
        <h2>Local Food Map</h2>
        <p>
          Search for farms, markets, products, and producers. Location access
          is optional.
        </p>
      </div>

      <div className="map-search-panel">
        <div className="map-search-row">
          <label htmlFor="map-search">Search the map</label>

          <input
            id="map-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            type="button"
            className="secondary-button"
            onClick={useMyLocation}
          >
            Use my location
          </button>
        </div>

        <div className="map-category-buttons">
          {mapCategories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setSearch(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="helper-text" aria-live="polite">
          {locationMessage}
        </p>
      </div>

      <div className="map-layout">
        <div className="map-canvas">
          <iframe
            className="google-map-frame"
            title="Interactive local food map"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="map-results">
          <h3>Featured nearby</h3>

          {suppliers.slice(0, 4).map((supplier, index) => (
            <article
              className="location-card"
              key={supplier.id}
            >
              <div className="location-number">
                {index + 1}
              </div>

              <div>
                <p className="location-type">
                  {supplier.type}
                </p>

                <h4>{supplier.name}</h4>

                <p>
                  {supplier.categories.join(" • ")}
                </p>

                <span>
                  {supplier.distance} away
                </span>
              </div>

              <a
                className="map-open-link"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  supplier.mapQuery
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Open in Maps
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MapPage;
