/*
=========================================================
SDC445 - Interface Design
From the Farm

Description:
Seasonal calendar page prototype. Displays sample produce
by season so customers can see what may be available from
local farms throughout the year.
=========================================================
*/

import { useMemo, useState } from "react";
import "./SeasonalCalendar.css";

const crops = {
  Tomatoes: {
    Spring:
      "Start seeds indoors 6–8 weeks before the last frost; transplant after frost danger passes.",
    Summer:
      "Warm-season growth and peak harvest. Water consistently and harvest ripe fruit often.",
    Fall:
      "Continue harvest while temperatures stay warm; protect late plants from early cold snaps.",
    Winter:
      "Outdoor plants finish after frost. Plan varieties and start very early indoor seedlings where appropriate.",
  },
  Basil: {
    Spring:
      "Start indoors or plant after nights are reliably warm.",
    Summer:
      "Peak growth. Pinch flowers and harvest frequently.",
    Fall:
      "Harvest before cold weather; preserve leaves by freezing or drying.",
    Winter:
      "Grow indoors in bright light or plan next season's planting.",
  },
  "Sweet Corn": {
    Spring:
      "Direct sow after soil warms and frost risk has passed.",
    Summer:
      "Main growing and harvest season; pick when ears are full and silks brown.",
    Fall:
      "Late plantings may finish early in the season depending on frost dates.",
    Winter:
      "No outdoor crop in most local conditions; choose varieties and plan succession planting.",
  },
  Peaches: {
    Spring:
      "Trees flower and set fruit; late frost can affect the crop.",
    Summer:
      "Primary harvest season for many varieties.",
    Fall:
      "Post-harvest tree care and preparation for dormancy.",
    Winter:
      "Dormant period; winter chill supports the next flowering cycle.",
  },
  Spinach: {
    Spring:
      "Excellent cool-season planting and harvest period.",
    Summer:
      "Heat encourages bolting; use shade or pause outdoor production.",
    Fall:
      "Plant again as temperatures cool for fall harvest.",
    Winter:
      "Can continue in mild weather with protection depending on local conditions.",
  },
};

const seasons = [
  ["Spring", "March – May", "🌱"],
  ["Summer", "June – August", "☀️"],
  ["Fall", "September – November", "🍂"],
  ["Winter", "December – February", "❄️"],
];

function SeasonalCalendar() {
  const [crop, setCrop] = useState("Tomatoes");
  const [cropInput, setCropInput] = useState("Tomatoes");
  const [zip, setZip] = useState("");
  const [zoneMessage, setZoneMessage] = useState("");

  const selected = useMemo(
    () => crops[crop] || crops.Tomatoes,
    [crop]
  );

  function applyCrop(event) {
    event.preventDefault();

    const match = Object.keys(crops).find(
      (name) =>
        name.toLowerCase() ===
        cropInput.trim().toLowerCase()
    );

    setCrop(match || "Tomatoes");

    if (!match) {
      setCropInput("Tomatoes");
    }
  }

  function handleZone(event) {
    event.preventDefault();

    if (!/^\d{5}$/.test(zip.trim())) {
      setZoneMessage("Enter a 5-digit ZIP code.");
      return;
    }

    setZoneMessage(
      "Zone lookup is not connected to a live USDA service in this class demo. Use the official USDA Plant Hardiness Zone Map to confirm your zone."
    );
  }

  return (
    <section className="seasonal-page">
      <div className="page-heading">
        <p className="page-eyebrow">
          Plan with the seasons
        </p>

        <h2>Seasonal Calendar</h2>

        <p>
          Search a crop to see how all four seasons relate to it.
          Timing still depends on frost dates, weather, and local
          growing conditions.
        </p>
      </div>

      <form
        className="crop-search"
        onSubmit={applyCrop}
      >
        <label htmlFor="crop-search-input">
          Search produce
        </label>

        <div>
          <input
            id="crop-search-input"
            list="crop-options"
            value={cropInput}
            onChange={(e) =>
              setCropInput(e.target.value)
            }
          />

          <datalist id="crop-options">
            {Object.keys(crops).map((name) => (
              <option
                value={name}
                key={name}
              />
            ))}
          </datalist>

          <button type="submit">
            Show calendar
          </button>
        </div>
      </form>

      <p className="calendar-showing">
        Showing seasonal guidance for{" "}
        <strong>{crop}</strong>
      </p>

      <div className="season-grid">
        {seasons.map(([name, months, icon]) => (
          <article
            className="season-card"
            key={name}
          >
            <div className="season-card-heading">
              <span
                className="season-icon"
                aria-hidden="true"
              >
                {icon}
              </span>

              <div>
                <h3>{name}</h3>
                <p>{months}</p>
              </div>
            </div>

            <p className="season-guidance">
              {selected[name]}
            </p>
          </article>
        ))}
      </div>

      <section className="zone-tool">
        <div>
          <p className="page-eyebrow">
            Location helper
          </p>

          <h3>What's My Zone?</h3>

          <p>
            USDA hardiness zones describe average annual extreme
            minimum winter temperatures. They are useful context,
            but they do not determine exact planting dates by
            themselves.
          </p>
        </div>

        <form onSubmit={handleZone}>
          <label htmlFor="zone-zip">
            ZIP code
          </label>

          <div>
            <input
              id="zone-zip"
              inputMode="numeric"
              maxLength="5"
              value={zip}
              onChange={(e) =>
                setZip(
                  e.target.value.replace(/\D/g, "")
                )
              }
              placeholder="29401"
            />

            <button type="submit">
              Check zone
            </button>
          </div>
        </form>

        {zoneMessage && (
          <p
            className="zone-message"
            aria-live="polite"
          >
            {zoneMessage}{" "}
            <a
              href="https://planthardiness.ars.usda.gov/"
              target="_blank"
              rel="noreferrer"
            >
              Open USDA map
            </a>
          </p>
        )}
      </section>
    </section>
  );
}

export default SeasonalCalendar;
