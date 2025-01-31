import { firestore } from "@/lib/firebase";
import { arrayUnion, arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";

// Function to add a product to the wishlist
const putWishlist = async (userId: string, productId: string) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    const updatedUserSnap = await getDoc(userRef);
    const updatedUserData = updatedUserSnap.data();
    const currentWishlist = updatedUserData?.wishlist || [];

    if (currentWishlist.includes(productId)) {
      console.log("Product is already in the wishlist");
      return "Product is already in the wishlist";
    }

    await updateDoc(userRef, {
      wishlist: arrayUnion(productId),
    });

    console.log("Product added to the wishlist");
    return "Product added to wishlist";

  } catch (err) {
    console.error("Error adding product to wishlist: ", err);
    throw new Error("Failed to add to wishlist");
  }
};

// Function to get the wishlist
const getWishlist = async (userId: string) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.log("No wishlist found for this user.");
      return [];
    }

    console.log("Wishlist found");
    const userData = userSnap.data();
    const wishlist = userData?.wishlist || [];
    return wishlist;

  } catch (err) {
    console.error("Error retrieving wishlist: ", err);
    throw new Error("Failed to retrieve wishlist");
  }
};

// Function to remove a product from the wishlist
const removeFromWishlist = async (userId: string, productId: string) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    const updatedUserSnap = await getDoc(userRef);
    const updatedUserData = updatedUserSnap.data();
    const currentWishlist = updatedUserData?.wishlist || [];

    if (!currentWishlist.includes(productId)) {
      console.log("Product is not in the wishlist");
      return "Product is not in the wishlist";
    }

    await updateDoc(userRef, {
      wishlist: arrayRemove(productId), // Use arrayRemove to remove the product
    });

    console.log("Product removed from the wishlist");
    return "Product removed from wishlist";

  } catch (err) {
    console.error("Error removing product from wishlist: ", err);
    throw new Error("Failed to remove from wishlist");
  }
};

export { putWishlist, getWishlist, removeFromWishlist };