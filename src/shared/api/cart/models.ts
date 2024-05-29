export interface Product {
  Id: number;
  Name: string;
  Description: string;
  Quantity: number;
  Unit: string;
  Сurrency: string;
  Price: number;
  DiscountedPrice: number;
  Images: Image[];
}

export interface Image {
  FileName: string;
  FileExtension: string;
  Image: string;
}

export interface ChangeProductResponse {
  Name: string;
  Description: string;
}
