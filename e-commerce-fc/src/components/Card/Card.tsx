import React from "react";
import style from "./card.module.css";
export interface Product {
  id: number;
  img: string;
  title: string;
  star?: React.ReactNode;
  reviews: string;
  prevPrice: string;
  newPrice: string;
  company: string;
  color: string;
  category: string;
  rating?: number;
}

export const Card = ({ product }: { product: Product }) => {
  return (
    <div key={product.id} className={style.card}>
      <img src={product.img} alt={product.title} className={style.cardImage} />
      <h3 className={style.cardName}>{product.title}</h3>
      <p className={style.cardPrevPrice}>{product.prevPrice}</p>
      <p className={style.cardPrice}>${product.newPrice}</p>
      <div className={style.cardRating}>
        {Array.from({ length: product.rating || 0 }, (_, index) => (
          <span key={index} className={style.ratingStar}>
            {product.star || <span>★</span>}
          </span>
        ))}
      </div>
    </div>
  );
};
