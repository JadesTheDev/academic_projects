function NewsCard({ title, description }) {
  return (
    <article className="card news-card">
      <div className="card-image-placeholder">
        News Image Placeholder
      </div>

      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

export default NewsCard;
