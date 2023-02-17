function Drawer({ onClose, onRemove, cartSneakers = [] }) {
  const totalPrice = cartSneakers.reduce((sum, obj) => obj.price + sum, 0);
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            onClick={onClose}
            className="cu-p"
            src="/img/btn-remove.svg"
            alt="Close"
          ></img>
        </h2>
        <div className="items">
          {cartSneakers.map((sneakers) => (
            <div className="cartItem d-flex align-center mb-20">
              <div
                className="cartItemImg"
                style={{ backgroundImage: `url(${sneakers.imageUrl})` }}
              ></div>
              <div className="mr-20 flex">
                <p className="mb-5">{sneakers.title}</p>
                <b>{sneakers.price}</b>
              </div>
              <img
                onClick={() => onRemove(sneakers.id)}
                className="removeBtn"
                src="/img/btn-remove.svg"
                alt="Remove"
              ></img>
            </div>
          ))}
        </div>
        <div className="cartTotalBlock">
          <ul>
            <li className="d-flex">
              <span>Итого:</span>
              <div></div>
              <b>{totalPrice} руб.</b>
            </li>
            <li className="d-flex">
              <span>Налог 5%:</span>
              <div></div>
              <b>{totalPrice * 0.05} руб.</b>
            </li>
          </ul>
          <button
            className="greenButton"
            onClick={() => alert("Ваш заказ оформлен!")}
          >
            Оформить заказ
            <img src="/img/arrow.svg" alt="Arrow"></img>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
