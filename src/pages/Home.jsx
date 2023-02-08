import Card from "../components/Card";
import ContentLoader from "react-content-loader";

function Home({
  sneakers,
  cartSneakers,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
  const renderSneakers = () => {
    return isLoading
      ? [...Array(6)].map(() => (
          <ContentLoader
            speed={2}
            width={155}
            height={250}
            viewBox="0 0 160 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
            <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
            <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
            <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
            <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
          </ContentLoader>
        ))
      : Array.isArray(sneakers) &&
          sneakers
            .filter((sneakersItem) =>
              sneakersItem.title
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            )
            .map((sneakers) => (
              <Card
                key={sneakers.id}
                id={sneakers.id}
                title={sneakers.title}
                price={sneakers.price}
                imageUrl={sneakers.imageUrl}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                loading={isLoading}
                added={cartSneakers.some(
                  (obj) => Number(obj.id) === Number(sneakers.id)
                )}
              />
            ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block">
          <img src="/img/search.png" alt="Search"></img>
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="Clear"
            ></img>
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
          ></input>
        </div>
      </div>
      <div className="d-flex flex-wrap">{renderSneakers()}</div>
    </div>
  );
}

export default Home;
