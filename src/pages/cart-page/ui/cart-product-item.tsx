"use client";

import { FiMinus, FiPlus } from "react-icons/fi";
import { Product } from "@/shared/api/cart/models";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCart } from "@/entities/cart";

export const CartProductItem: React.FC<Product> = ({
  Images,
  Name,
  Description,
  Сurrency,
  Price,
  Quantity,
  Id,
}: Product) => {
  const changeQuantityProduct = useCart((state) => state.changeQuantityProduct);
  const userGuid = useCart((state) => state.userGuid);
  const deleteProduct = useCart((state) => state.deleteProduct);

  const currency = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: Сurrency,
  });

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* Image Start */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <Image
          src={`data:image/${Images[0].FileExtension};base64,${Images[0].Image}`}
          height={120}
          width={120}
          alt={Images[0].FileName}
        />
        {/* <div className="h-[120px] w-[120px] bg-white"></div> */}
      </div>
      {/* Image End */}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Product Title Start */}
          <div className="text-lg md:text-2xl font-semibold">{Name}</div>
          {/* Product Title End */}

          {/* Product MdSubtitle Start */}
          <div className="text-sm md:text-md dark:text-white/[0.5] text-black/[0.5] font-medium block md:hidden">
            {Description}
          </div>
          {/* Product MdSubtitle End */}

          {/* Product Price Start */}
          <div className="text-sm dark:text-white/[0.5] text-black/[0.5] md:text-md font-bold mt-2">
            {currency.format(Price)}
          </div>
          {/* Product Price End */}
        </div>

        {/* Product LgSubtitle Start */}
        <div className="text-md dark:text-white/[0.5] text-black/[0.5] font-medium hidden md:block">
          {Description}
        </div>
        {/* Product LgSubtitle End */}

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-2">
                <button
                  className="dark:bg-white/[0.2] bg-black/[0.2] rounded-lg p-1.5"
                  onClick={() =>
                    changeQuantityProduct({
                      ProductId: Id,
                      UserGuid: userGuid,
                      type: "dec",
                    })
                  }>
                  <FiMinus />
                </button>
                <span className="font-medium">{Quantity}</span>
                <button
                  className="bg-green-500 rounded-lg p-1.5"
                  onClick={() =>
                    changeQuantityProduct({
                      ProductId: Id,
                      UserGuid: userGuid,
                      type: "inc",
                    })
                  }>
                  <FiPlus />
                </button>
              </div>
            </div>
          </div>

          <RiDeleteBin6Line
            onClick={() =>
              deleteProduct({
                ProductId: Id,
                UserGuid: userGuid,
              })
            }
            className="cursor-pointer dark:text-white/[0.5] text-black/[0.5] hover:text-red-600 transition-all text-[16px] md:text-[20px]"
          />
        </div>
      </div>
    </div>
  );
};
