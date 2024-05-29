import { apiInstance } from "../base";
import { ChangeProductResponse, Product } from "./models";

const BASE_URL = "/ShoppingCart";

export const getProductsList = (): Promise<Product[]> => {
  return apiInstance.get(`${BASE_URL}/products`);
};

export const deleteProductsList = (): Promise<ChangeProductResponse> => {
  return apiInstance.delete(`${BASE_URL}/products`);
};

export type DeleteProductByParams = {
  ProductId: number;
  UserGuid: string;
};

export const deleteProduct = (
  params: DeleteProductByParams,
): Promise<ChangeProductResponse> => {
  return apiInstance.delete(`${BASE_URL}/product`, { data: { ...params } });
};

export type ProductSummary = {
  TotalProducts: number;
  Discount: number;
  Total: number;
};

export const getProductsSummary = (): Promise<ProductSummary> => {
  return apiInstance.get(`${BASE_URL}/baskedsummary`);
};

export type ChangeProductQuantityParams = {
  type: "inc" | "dec";
  UserGuid: string;
  ProductId: number;
};

export const changeProductQuantity = ({
  type,
  ...params
}: ChangeProductQuantityParams): Promise<ChangeProductResponse> => {
  return apiInstance.post(`${BASE_URL}/quantity${type}`, { ...params });
};

export type HeaderResponse = {
  LogoImg: string;
  UsedGuid: string;
  UserName: string;
};

export const getHeader = async (): Promise<HeaderResponse> => {
  return apiInstance.get(`${BASE_URL}/header`);
};
