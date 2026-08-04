function Searchbar({ searchText, onSearchTextChange, onSearch }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSearch();
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label className="search-label" htmlFor="farm-search">
        Search for farms, markets, products, or events
      </label>

      <div className="search-controls">
        <input
          id="farm-search"
          className="search-input"
          type="text"
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
          placeholder="Enter a search term"
        />

        <button className="search-button" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}

export default Searchbar;
