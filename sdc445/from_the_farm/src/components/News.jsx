/*
=========================================================
SDC445 - Interface Design
From the Farm

Description:
News page displaying local farm updates, community news,
market announcements, and seasonal events.

=========================================================
*/

import "./News.css";
import farmExpandsImage from "../assets/products/farm-expands.jpg";
import farmersMarketImage from "../assets/products/farmers-market.jpg";
import communityFarmDayImage from "../assets/products/community-farm.jpg";
import severeWeatherImage from "../assets/products/severe-weather.jpg";

const News = () => {
  const newsItems = [
    {
      id: 1,
      type: "Good News",
      title: "Local Farm Expands",
      description:
        "A nearby family farm is expanding its growing operation, bringing more fresh seasonal produce to the local community.",
      image: farmExpandsImage,
    },
    {
      id: 2,
      type: "Good News",
      title: "Farmers' Market Returns",
      description:
        "The local farmers' market is returning for another season with expanded weekend hours and new community vendors.",
      image: farmersMarketImage,
    },
    {
      id: 3,
      type: "Community Update",
      title: "Severe Weather Damages Local Crops",
      description:
        "Recent storms have damaged crops at several local farms, which may affect the availability of some seasonal produce.",
      image: severeWeatherImage,
    },
    {
      id: 4,
      type: "Local Announcement",
      title: "Community Farm Day Announced",
      description:
        "A local farm will host a community day featuring farm tours, demonstrations, local vendors, and family activities.",
      image: communityFarmDayImage,
    },
  ];

  return (
    <section className="news-page">
      <div className="news-container">
        <h1>From the Farm News</h1>

        <p className="news-intro">
          Stay up to date with local farms, seasonal produce, and events in
          your community.
        </p>

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
                <p className="news-type">
                  {item.type}
                </p>

                <h2>{item.title}</h2>

                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
