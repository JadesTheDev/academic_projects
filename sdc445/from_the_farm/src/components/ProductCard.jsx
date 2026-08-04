function ProductCard({ name, price }) {
  return (
    <article className="card product-card">
      <div className="card-image-placeholder">
        Product Image Placeholder
      </div>

      <div className="card-content">
        <h3>{name}</h3>
        <p className="product-price">{price}</p>
      </div>
    </article>
  );
}

export default ProductCard;
