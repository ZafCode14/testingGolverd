export interface Branch {
  inStock: number;
  address: string;
  numbers: string[];
  location: string;
  maps: string;
}
export interface VendorBranch {
  active: boolean;
  maps: string;
  name: string;
  numbers: string[];
  address: string;
}
export interface Product {
  docID: string;
  brandDocID: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  branches: {[key: string]: Branch};
}
export interface Vendors {
  id: string;
  chosenShopStyle: string;
  spots: {[key: string]: {[key:string]: {image: string}}}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  joinDate: any;
}