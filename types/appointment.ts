export interface Branch {
  address: string;
  inStock: number;
  location:string;
  phoneNumbers: string[];
}
export interface Appointment {
  branch: string;
  ClientId: string;
  clientName: string;
  clientNumber: string;
  exactDate: string;
  id: string;
  vendorId: string;
  branchInfo: Branch;
  productId: string;
  productImage: string;
  productName: string;
  productPrice: string;
  date: string;
  time: string;
  status: string;
}