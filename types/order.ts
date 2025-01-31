export interface Address {
  address: string;
  apartment: string;
  city: string;
  country: string;
  firstName: string;
  governate: string;
  lastName: string;
  phoneNumber: string;
  postalCode: string;
}
export interface Products {
  
}
export interface Price {
  delivery: number;
  discount: number;
  subtotal: number;
  total: number;
}
export interface Order {
  address: Address;
  branch: string;
  charges: { [key: string]: string };
  clientEmail: string;
  clientID: string;
  clientName: string;
  clientPhoneNumber: string;
  orderDate: string;
  deliveryDate: string;
  id: string;
  invoice: number;
  items: { [key: string]: string };
  paymentMethod: string;
  price: number;
  priceDetails: Price;
  promocode: string;
  status: string;
  vendorID: string;
  products: Products[];
  userId: string;
}