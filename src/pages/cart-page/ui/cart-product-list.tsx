"use client";

import { getProductsList } from "@/shared/api/cart";
import { CartProductItem } from "./cart-product-item";
import { useCart } from "@/entities/cart";
import { useCallback, useLayoutEffect } from "react";

export const CartProductList = () => {
  const { products } = useCart();

  return (
    <>
      {products.length > 0 &&
        products.map((product) => {
          return <CartProductItem key={product.Id} {...product} />;
        })}
    </>
  );
};
