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

import "./SeasonalCalendar.css";

const seasons = [
  {
    name: "Spring",
    months: "March - May",
    icon: "🌱",
    produce: ["Asparagus", "Strawberries", "Spinach", "Radishes", "Peas", "Green Onions"]
  },
  {
    name: "Summer",
    months: "June - August",
    icon: "☀️",
    produce: ["Tomatoes", "Sweet Corn", "Peaches", "Watermelon", "Okra", "Cucumbers"]
  },
  {
    name: "Fall",
    months: "September - November",
    icon: "🍂",
    produce: ["Apples", "Pumpkins", "Sweet Potatoes", "Pecans", "Collards", "Winter Squash"]
  },
  {
    name: "Winter",
    months: "December - February",
    icon: "❄️",
    produce: ["Cabbage", "Kale", "Turnips", "Citrus", "Broccoli", "Carrots"]
  }
];

function SeasonalCalendar() {
  return (
    <section className="seasonal-page">
      <div className="page-heading">
        <p className="page-eyebrow">Plan with the seasons</p>
        <h2>Seasonal Calendar</h2>
        <p>
          Use this guide to see examples of produce commonly available during
          each season. Actual availability will vary by supplier and weather.
        </p>
      </div>

      <div className="season-grid">
        {seasons.map((season) => (
          <article className="season-card" key={season.name}>
            <div className="season-card-heading">
              <span className="season-icon" aria-hidden="true">
                {season.icon}
              </span>
              <div>
                <h3>{season.name}</h3>
                <p>{season.months}</p>
              </div>
            </div>

            <div className="season-produce">
              {season.produce.map((item) => (
                <span className="produce-tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="seasonal-note">
        <strong>Future feature:</strong> connect this calendar to supplier
        listings so customers can browse what is currently in season nearby.
      </div>
    </section>
  );
}

export default SeasonalCalendar;
