import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Drawer from './components/Drawer';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios'
import Home from './pages/Home'
import Favorites from './pages/Favorites'

function App() {
  const [sneakers, setSneakers] = React.useState([]);
  const [cartSneakers, setCartSneakers] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios.get('https://63c6e893dcdc478e15cc08ac.mockapi.io/sneakers').then(res => {
      setSneakers(res.data);
    });
    axios.get('https://63c6e893dcdc478e15cc08ac.mockapi.io/cart').then(res => {
      setCartSneakers(res.data);
    });
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://63c6e893dcdc478e15cc08ac.mockapi.io/cart', obj);
    setCartSneakers(prev => [ ...prev, obj]);
  };

  const onRemoveSneakers = (id) => {
    axios.delete(`https://63c6e893dcdc478e15cc08ac.mockapi.io/cart/${id}`);
    setCartSneakers((prev) => prev.filter(item => item.id !== id));
  }

  const onAddToFavorite = async (obj) => {
    try {
      await axios.put(`https://63c6e893dcdc478e15cc08ac.mockapi.io/sneakers/${obj.id}`, obj);
    } catch(error) {
      alert("Не удалось добавить в фавориты")
    }
    axios.get('https://63c6e893dcdc478e15cc08ac.mockapi.io/sneakers').then(res => {
      setSneakers(res.data);
    });
    setFavorites((prev) => [...prev, obj]);
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <div className='wrapper clear'>
      {cartOpened && <Drawer cartSneakers={cartSneakers} onClose={() => setCartOpened(false)} onRemove={onRemoveSneakers} />}
      <Header onClickCart={() => setCartOpened(true)}/>
      <Routes>
        <Route path='/' element={
          <Home
            sneakers={sneakers}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
          />
        }>
        </Route>
        <Route path="/favorites" element={<Favorites favorites={sneakers} onAddToFavorite={onAddToFavorite} />}></Route>
      </Routes>
    </div>
  );
}

export default App;