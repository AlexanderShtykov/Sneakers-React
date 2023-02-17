import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [sneakers, setSneakers] = React.useState([]);
  const [cartSneakers, setCartSneakers] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function getSneakers() {
      const sneakersResponse = await axios.get(
        "https://63c6e893dcdc478e15cc08ac.mockapi.io/sneakers"
      );
      const cartResponse = await axios.get(
        "https://63c6e893dcdc478e15cc08ac.mockapi.io/cart"
      );
      setIsLoading(false);
      setSneakers(sneakersResponse.data);
      setCartSneakers(cartResponse.data);
    }

    getSneakers();
  }, []);

  const onAddToCart = (obj) => {
    if (cartSneakers.find((item) => Number(item.id) === Number(obj.id))) {
      setCartSneakers((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      axios.post("https://63c6e893dcdc478e15cc08ac.mockapi.io/cart", obj);
      setCartSneakers((prev) => [...prev, obj]);
    }
  };

  const onRemoveSneakers = (id) => {
    axios.delete(`https://63c6e893dcdc478e15cc08ac.mockapi.io/cart/${id}`);
    setCartSneakers((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      await axios.put(
        `https://63c6e893dcdc478e15cc08ac.mockapi.io/sneakers/${obj.id}`,
        obj
      );
    } catch (error) {
      alert("Не удалось добавить в фавориты");
    }
    axios
      .get("https://63c6e893dcdc478e15cc08ac.mockapi.io/sneakers")
      .then((res) => {
        setSneakers(res.data);
      });
    setFavorites((prev) => [...prev, obj]);
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          cartSneakers={cartSneakers}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveSneakers}
        />
      )}
      <Header
        onClickCart={() => setCartOpened(true)}
        cartSneakers={cartSneakers}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              sneakers={sneakers}
              cartSneakers={cartSneakers}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />
          }
        ></Route>
        <Route
          path="/favorites"
          element={
            <Favorites favorites={sneakers} onAddToFavorite={onAddToFavorite} />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
