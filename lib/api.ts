import { collection, getDocs, query, where, limit, doc, getDoc } from "firebase/firestore";
import { firestore } from "./firebase";
import { Product, Vendor } from "./types";

// Convert Firestore Timestamp to plain JavaScript Date or other primitive value
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertTimestamp = (data: any) => {
  if (data && typeof data === "object" && data.seconds && data.nanoseconds) {
    const date = new Date(data.seconds * 1000 + data.nanoseconds / 1e6);
    return date.toString();
  }
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const refactorProductData = (doc: any) => {
  const data = doc.data();

  // Process exactDate
  const exactDate = convertTimestamp(data.exactDate);

  // Handle branches object and convert lastStocked for each branch
  const branches = data.branches || {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updatedBranches = Object.keys(branches).reduce((acc:any, branchName) => {
    const branch = branches[branchName];

    // Convert lastStocked if it exists
    if (branch.lastStocked) {
      branch.lastStocked = convertTimestamp(branch.lastStocked);
    }

    // Add the updated branch to the accumulator object
    acc[branchName] = branch;
    return acc;
  }, {});

  return {
    ...data,
    docID: doc.id,
    exactDate,
    branches: updatedBranches,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const refactorVendorData = (doc: any) => {
  const data = doc.data();
  return {
    ...data,
    joinDate: convertTimestamp(data.joinDate),
    docID: doc.id
  };
}

// Fetch approved vendors
const fetchVendors = async ():Promise<Vendor[]> => {
  try {
    // Reference to the vendors collection
    const vendorsRef = collection(firestore, "vendors");

    // Create a base query for approved vendors
    const approvedVendorsQuery = query(vendorsRef, where("status", "==", "approved"));

    // Execute the query
    const querySnapshot = await getDocs(approvedVendorsQuery);

    // Extract data from the query result
    const approvedVendors = querySnapshot.docs.map((doc) => {
      return refactorVendorData(doc)
    });
    return approvedVendors;
  } catch (error) {
    console.error("Error fetching approved vendors:", error);
    throw error;
  }
};

// Fetch the first 10 products based on approved vendors
const fetchTenProducts = async ():Promise<Product[]> => {
  try {
    // Fetch all approved vendors
    const approvedVendors = await fetchVendors();
    const approvedVendorIds = approvedVendors.map((vendor) => vendor.docID);

    if (approvedVendorIds.length === 0) {
      console.log("No approved vendors found.");
      return [];
    }

    // Reference to the products collection
    const productsRef = collection(firestore, "products");

    // Query to fetch products where brandDocID matches any approved vendor ID, limited to 10
    const productsQuery = query(
      productsRef, where("brandDocID", "in", approvedVendorIds),
      limit(10)
    );

    // Execute the query
    const productsSnapshot = await getDocs(productsQuery);

    // Extract data from the query result and process exactDate and lastStocked
    const products = productsSnapshot.docs.map((doc) => {
      return refactorProductData(doc);
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch the all products based on approved vendors
const fetchAllProducts = async ():Promise<Product[]> => {
  try {
    // Fetch all approved vendors
    const approvedVendors = await fetchVendors();
    const approvedVendorIds = approvedVendors.map((vendor) => vendor.docID);

    if (approvedVendorIds.length === 0) {
      console.log("No approved vendors found.");
      return [];
    }

    // Reference to the products collection
    const productsRef = collection(firestore, "products");

    // Query to fetch products where brandDocID matches any approved vendor ID, limited to 10
    const productsQuery = query(
      productsRef, where("brandDocID", "in", approvedVendorIds)
    );

    // Execute the query
    const productsSnapshot = await getDocs(productsQuery);

    // Extract data from the query result and process exactDate and lastStocked
    const products = productsSnapshot.docs.map((doc) => {
      return refactorProductData(doc);
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch product by productId
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getProductAndVendorByProductId = async (productId: string): Promise<any> => {
  try {
    // 1. Get product by product.docID
    const productRef = doc(firestore, "products", productId);
    const productSnap = await getDoc(productRef);
    const product = refactorProductData(productSnap);
    const brandDocID = product?.brandDocID;

    // 2. Get vendor by product.brandDocID
    const vendorRef = doc(firestore, "vendors", brandDocID);
    const vendorSnap = await getDoc(vendorRef);
    const vendor = refactorVendorData(vendorSnap);

    // 3. Get all products by vendor.brandDocID
    const productsRef = collection(firestore, "products");
    const productsQuery = query(
      productsRef, where("brandDocID", "==", brandDocID)
    );
    const productsSnapshot = await getDocs(productsQuery);
    const products = productsSnapshot.docs.map((doc) => {
      return refactorProductData(doc);
    });

    return { product, vendor, products };

  } catch (error) {
    console.error("Error fetching product or vendor:", error);
  }
};

// Fetch product by productId
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getVendorAndProductsByVendorId = async (vendorId: string): Promise<any> => {
  try {

    // 2. Get vendor by Id
    const vendorRef = doc(firestore, "vendors", vendorId);
    const vendorSnap = await getDoc(vendorRef);
    const vendor = refactorVendorData(vendorSnap);

    // 3. Get all products by vendor.brandDocID
    const productsRef = collection(firestore, "products");
    const productsQuery = query(
      productsRef, where("brandDocID", "==", vendorId)
    );
    const productsSnapshot = await getDocs(productsQuery);
    const products = productsSnapshot.docs.map((doc) => {
      return refactorProductData(doc);
    });

    return { vendor, products };

  } catch (error) {
    console.error("Error fetching product or vendor:", error);
  }
};


export { fetchVendors, fetchTenProducts, fetchAllProducts, getProductAndVendorByProductId, getVendorAndProductsByVendorId };