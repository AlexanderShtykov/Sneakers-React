import { Link } from "react-router-dom";

function Header({ cartSneakers, onClickCart }) {
  const totalPrice = cartSneakers.reduce((sum, obj) => obj.price + sum, 0);
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width="40" heigth="40" src="/img/logo.png" />
          <div className="headerInfo">
            <h3 className="text-uppercase">React Sneakesr</h3>
            <p className="opacity-5">Магазин лучших кросовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex align-center">
        <li onClick={onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/cart.svg" alt="Корзина" />
          <span>{totalPrice} руб.</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img width={18} height={18} src="/img/heart.svg" alt="Закладки" />
          </Link>
        </li>
        <li>
          <img width={18} height={18} src="/img/user.svg" alt="Пользователей" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
