import { useMemo, useState } from "react";
import "./Suppliers.css";
import { suppliers } from "../data/marketplaceData";

function Suppliers() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(suppliers[0].id);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) return suppliers;

    return suppliers.filter((supplier) =>
      [
        supplier.name,
        supplier.type,
        supplier.location,
        ...supplier.categories,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [query]);

  const selected =
    suppliers.find((supplier) => supplier.id === selectedId) ||
    filtered[0] ||
    suppliers[0];

  const mapSrc =
    `https://www.google.com/maps?q=${encodeURIComponent(
      selected.mapQuery
    )}&z=12&output=embed`;

  const mapsUrl =
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      selected.mapQuery
    )}`;

  return (
    <section className="suppliers-page">
      <div className="page-heading">
        <p className="page-eyebrow">
          Meet your local growers
        </p>

        <h2>Suppliers</h2>

        <p>
          Search nearby farms and producers, then select one to see where
          they are and what they offer.
        </p>
      </div>

      <label
        className="supplier-search-label"
        htmlFor="supplier-search"
      >
        Search suppliers, products, farms...
      </label>

      <input
        id="supplier-search"
        className="supplier-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Try honey, eggs, orchard..."
      />

      <div className="supplier-discovery-layout">
        <div
          className="supplier-list"
          aria-label="Supplier results"
        >
          {filtered.length ? (
            filtered.map((supplier) => (
              <button
                type="button"
                key={supplier.id}
                className={`supplier-row ${
                  supplier.id === selected.id
                    ? "is-selected"
                    : ""
                }`}
                onClick={() => setSelectedId(supplier.id)}
              >
                <img
                  src={supplier.image}
                  alt=""
                />

                <span>
                  <strong>
                    {supplier.name}
                  </strong>

                  <small>
                    {supplier.distance} · {supplier.type}
                  </small>

                  <small>
                    {supplier.categories.join(" • ")}
                  </small>
                </span>
              </button>
            ))
          ) : (
            <p className="empty-state">
              No suppliers match that search yet.
            </p>
          )}
        </div>

        <div className="supplier-map-panel">
          <iframe
            className="supplier-map-frame"
            title={`Map showing ${selected.name}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          <article className="supplier-preview-card">
            <img
              src={selected.image}
              alt=""
            />

            <div className="supplier-preview-copy">
              <p className="page-eyebrow">
                {selected.type}
              </p>

              <h3>
                {selected.name}
              </h3>

              <p>
                {selected.description}
              </p>

              <div className="supplier-facts">
                <span>
                  📍 {selected.location}
                </span>

                <span>
                  🚗 {selected.distance}
                </span>

                <span>
                  🕒 {selected.hours}
                </span>
              </div>
            </div>

            <a
              className="primary-link-button"
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open in Maps
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Suppliers;
