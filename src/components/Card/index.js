import React from "react";
import styles from "./Card.module.scss";

function Card({
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  id,
  added = false,
}) {
  const [isAdded, setIsAdded] = React.useState(added);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({ id, title, imageUrl, price });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    const favorited = !isFavorite;
    onFavorite({ id, title, imageUrl, price, favorited });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <>
        <div className={styles.favorite} onClick={onClickFavorite}>
          <img
            src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
            alt="Unliked"
          />
        </div>
        <img width="133" height="112" src={imageUrl} alt="" />
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price}</b>
          </div>
          <img
            className={styles.plus}
            onClick={onClickPlus}
            src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
            alt="Plus"
          />
        </div>
      </>
    </div>
  );
}

export default Card;
