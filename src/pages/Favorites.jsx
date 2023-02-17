import Card from "../components/Card";

function Favorites({ favorites, onAddToFavorite }) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>
      <div className="d-flex flex-wrap">
        {favorites
          .filter((favoritesItem) => favoritesItem.favorited === true)
          .map((favorites) => (
            <Card
              key={favorites.id}
              id={favorites.id}
              title={favorites.title}
              price={favorites.price}
              imageUrl={favorites.imageUrl}
              favorited={true}
              onFavorite={(obj) => onAddToFavorite(obj)}
            />
          ))}
      </div>
    </div>
  );
}

export default Favorites;
