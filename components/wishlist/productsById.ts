import { firestore } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const getProductById = async (productId: string) => {
  try {
    // Reference to the product document in the 'products' collection
    const productRef = doc(firestore, 'products', productId);

    // Fetch the document snapshot
    const productSnap = await getDoc(productRef);

    // Check if the document exists
    if (!productSnap.exists()) {
      console.log("No product found with this ID.");
      return null; // Return null if the product does not exist
    }

    // Return the product data
    const productData = productSnap.data();
    return productData;

  } catch (err) {
    console.error("Error retrieving product: ", err);
    throw new Error("Failed to retrieve product");
  }
};

export default getProductById;