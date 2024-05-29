"use client";

import { useCart } from "@/entities/cart";
import { CartProductList } from "./cart-product-list";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { useLayoutEffect } from "react";

export const CartPage = () => {
  const { summary, products, deleteProducts, getProducts } = useCart();

  const currency = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  });

  useLayoutEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <main className="w-full md:py-20">
      {products.length === 0 ? (
        <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
          <span className="text-xl font-bold">Ваша корзина пуста</span>
          <span className="text-center mt-4">
            Похоже что вы ничего не добавили в корзину.
            <br />
            Вернитесь назад и продолжите покупки.
          </span>
          <Link href={"/"}>
            <Button className="py-4 px-8 mt-4">Продолжить покупки</Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Header Start */}
          <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
            <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
              Корзина
            </div>
          </div>
          {/* Cart Header End */}
          <div className="flex flex-col lg:flex-row gap-12 py-10">
            {/* Cart Items Start */}
            <div className="flex-[2]">
              <div className="text-lg font-bold">Товары</div>
              <CartProductList />
            </div>
            {/* Cart Items End */}

            {/* Summary Start */}
            <div className="flex-[1] z-10 sticky h-fit top-[80px]">
              <div className="text-lg font-bold">Сведения</div>

              <div className="p-5 my-5 dark:bg-white/[0.05] bg-black/[0.05] rounded-xl">
                <div className="flex justify-between">
                  <div className="uppercase text-md md:text-lg font-medium">
                    Сумма
                  </div>
                  <div className="text-md md:text-lg font-medium">
                    {currency.format(summary.Total)}
                  </div>
                </div>
                <div className="text-sm md:text-md py-5 border-t mt-5">
                  Промежуточная сумма отражает общую стоимость вашего заказа,
                  включая пошлины и налоги, без учета применимых скидок. Она не
                  включает стоимость доставки и комиссию за международные
                  транзакции.
                </div>
              </div>

              {/* Control Start */}
              <Button>Оформить заказ</Button>
              <Button
                className="bg-red-500 dark:bg-red-500 hover:bg-red-600 text-white dark:text-white"
                onClick={() => deleteProducts()}>
                Очистить корзину
              </Button>
              {/* Control End */}
            </div>
            {/* Summary End */}
          </div>
        </>
      )}
    </main>
  );
};
