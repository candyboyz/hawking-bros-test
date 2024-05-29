import {
  ChangeProductQuantityParams,
  DeleteProductByParams,
  ProductSummary,
  changeProductQuantity,
  deleteProduct,
  deleteProductsList,
  getProductsList,
  getProductsSummary,
} from "@/shared/api/cart";
import { Product } from "@/shared/api/cart/models";
import { create } from "zustand";

export interface UseCart {
  products: Product[];
  summary: ProductSummary;
  userGuid: string;
  setUserGuid: (userGuid: string) => void;
  getProducts: () => Promise<void>;
  deleteProducts: () => Promise<void>;
  deleteProduct: (params: DeleteProductByParams) => Promise<void>;
  changeQuantityProduct: (params: ChangeProductQuantityParams) => Promise<void>;
}

export const useCart = create<UseCart>()((set) => ({
  products: [],
  summary: { Total: 0, TotalProducts: 0, Discount: 0 },
  userGuid: "",
  setUserGuid: (userGuid) => {
    set({ userGuid: userGuid });
  },
  getProducts: async () => {
    set({
      products: await getProductsList(),
      summary: await getProductsSummary(),
    });
  },
  deleteProducts: async () => {
    await deleteProductsList();
    set((state) => {
      state.getProducts();
      return state;
    });
  },
  deleteProduct: async ({ UserGuid, ProductId }) => {
    await deleteProduct({ UserGuid, ProductId });
    set((state) => {
      state.getProducts();
      return state;
    });
  },
  changeQuantityProduct: async (params) => {
    await changeProductQuantity(params);
    set((state) => {
      state.products.forEach((product) => {
        if (product.Id === params.ProductId)
          product.Quantity =
            params.type === "inc"
              ? product.Quantity + 1
              : params.type === "dec" && product.Quantity > 1
              ? product.Quantity - 1
              : product.Quantity;
      });

      return state;
    });
    set({ summary: await getProductsSummary() });
  },
}));
