export type VendorBranch = {
  active: boolean;
  maps: string;
  name: string;
  numbers: string[];
  address: string;
}
export type Vendor = {
  name: string;
  joinDate: string;
  docID: string;
  chosenShopStyle: string;
  branchesNew: {
    1: VendorBranch;
  }
  logo: string;
}

export type Product = {
  docID: string;
  branches: {
    [branchName: string]: {
      inStock: number;
      lastStocked: string;
      revenue: number;
      sold: number;
    } 
  };
  images: string[];
  name: string;
  price: number;
  brandDocID: string;
  category: string;
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses: {
    id: {
      country: string;
      governate: string;
      city: string;
      postalCode: string;
      apartment: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      address: string;
      addressId: string;
      id: string;
    }
  }
  defaultAddress: string;
}