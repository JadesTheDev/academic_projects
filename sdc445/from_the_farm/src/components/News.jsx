import "./News.css";

import farmExpandsImage from "../assets/products/farm-expands.jpg";
import farmersMarketImage from "../assets/products/farmers-market.jpg";
import communityFarmDayImage from "../assets/products/community-farm.jpg";
import severeWeatherImage from "../assets/products/severe-weather.jpg";

const newsItems = [
  {
    id: 1,
    type: "Supplier Update",
    title: "First Late-Summer Harvest Is In",
    source: "Green Valley Farms",
    description:
      "Heirloom tomatoes, sweet corn, and herbs are arriving at the farm stand this week.",
    image: farmExpandsImage,
  },
  {
    id: 2,
    type: "Market",
    title: "Farmers' Market Returns Saturday",
    source: "Lowcountry Community Market",
    description:
      "Local growers, bakers, honey producers, and makers return Saturday from 8 AM–1 PM.",
    image: farmersMarketImage,
  },
  {
    id: 3,
    type: "Community Alert",
    title: "Storms Affect Some Local Crops",
    source: "Community Update",
    description:
      "Recent storms may temporarily reduce availability of delicate greens and other seasonal produce.",
    image: severeWeatherImage,
  },
  {
    id: 4,
    type: "Local Event",
    title: "Community Farm Day Announced",
    source: "Hilltop Orchard",
    description:
      "Farm tours, demonstrations, local vendors, and family activities are planned for the upcoming community day.",
    image: communityFarmDayImage,
  },
];

function News() {
  return (
    <section className="news-page">
      <div className="page-heading">
        <p className="page-eyebrow">Around the community</p>

        <h2>News & Farm Updates</h2>

        <p>
          Harvest notes, restocks, farmers markets, events, and announcements
          from the local food community.
        </p>
      </div>

      <div className="news-list">
        {newsItems.map((item) => (
          <article
            className="news-item"
            key={item.id}
          >
            <img
              className="news-image"
              src={item.image}
              alt=""
            />

            <div className="news-content">
              <div className="news-meta">
                <span className="news-type">
                  {item.type}
                </span>

                <span>
                  {item.source}
                </span>
              </div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default News;
