"use client";
import CheckoutForm from "@/components/checkout/form";
import { firestore } from "@/lib/firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { addDoc, collection, doc, getDocs, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define types for product and cart items
interface Product {
  name: string;
  price: number;
  images: string[];
  brandDocID: string;
  docID: string;
}

interface CartItem {
  product: Product;
  amount: number;
}

interface FormData {
  country: string;
  governate: string;
  city: string;
  postalCode: string;
  apartment: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
}

function Page() {
  const [formData, setFormData] = useState<FormData>({
    country: '',
    governate: '',
    city: '',
    postalCode: '',
    apartment: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
  });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [confirmedAddress, setConfirmedAddress] = useState(false);
  const [user, setUser] = useState<User | null>(null); // User is from Firebase Auth
  const auth = getAuth();
  const router = useRouter();

  // Function to get cart items from localStorage with proper type handling
  const getCartItems = (): CartItem[] => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(cart);
        if (Array.isArray(parsedCart)) {
          return parsedCart.map((item) => {
            const { product, amount } = item;
            return { product, amount };
          });
        }
      } catch (error) {
        console.error("Error parsing cart items from localStorage", error);
      }
    }
    return [];
  };

  console.log(cartItems);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user when authenticated
      } else {
        setUser(null); // Handle case where user is not authenticated
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, [auth]);

  useEffect(() => {
    // Fetch cart items from localStorage when the component mounts
    const items = getCartItems();
    setCartItems(items);
  }, []);

  // Group cart items by vendor
  const groupItemsByVendor = (cartItems: CartItem[]) => {
    return cartItems.reduce((acc, item) => {
      const vendorID = item.product.brandDocID;
      if (!acc[vendorID]) {
        acc[vendorID] = [];
      }
      acc[vendorID].push(item);
      return acc;
    }, {} as { [vendorID: string]: CartItem[] });
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.amount,
    0
  );

  // Define gem discount (e.g., 10% discount)
  const gemDiscount = subtotal * 0.1; // 10% discount

  // Define flat delivery fee
  const deliveryFee = 55; // Flat delivery fee in EGP

  // Calculate total price after discount and adding delivery fee
  const totalPrice = subtotal - gemDiscount + deliveryFee;

  // Function to get the count of orders for a specific vendor
  const getVendorOrdersCount = async (vendorID: string): Promise<number> => {
    try {
      // Reference the 'orders' collection
      const ordersRef = collection(firestore, 'orders');
      
      // Create a query to get orders for the specific vendor
      const q = query(ordersRef, where("vendorID", "==", vendorID));

      // Execute the query
      const querySnapshot = await getDocs(q);

      // Return the count of orders
      return querySnapshot.size; // Return the number of documents found
    } catch (error) {
      console.error("Error getting vendor orders count:", error);
      return 0; // Return 0 if there's an error
    }
  };

  // handle on click payment
  const handlePayment = async () => {
    if (user) {
      const userId = user.uid;

      const now = new Date();
      const estimatedArrival = new Date();
      estimatedArrival.setDate(now.getDate() + 2);

      // Group cart Items by vendor
      const groupedItems = groupItemsByVendor(cartItems);

      const userOrderData = {
        userId: userId,
        address: formData,
        products: cartItems.map((product) => ({
          quantity: product.amount,
          product: product.product,
        })),
        price: {
          subtotal: subtotal,
          total: totalPrice,
          discount: gemDiscount,
          delivery: deliveryFee,
        },
        status: "pending",
        paymentMethod: "cash",
        createdAt: Timestamp.now(),
        estimatedArrival: estimatedArrival,
      };

      try {
        await addDoc(collection(firestore, 'usersOrders'), userOrderData);

        // Loop through each vendor's items and create separate orders
        for (const [vendorID, vendorItems] of Object.entries(groupedItems)) {
          const docRef = doc(collection(firestore, 'orders'));
          // Get the order count and create the vendor order data
          const orderCount = await getVendorOrdersCount(vendorID);

          // Create the charges object with product names as keys
          const charges = vendorItems.reduce((acc: { [key: string]: { price: number; quantity: number } }, item) => {
            acc[item.product.name] = {
              price: item.product.price,
              quantity: item.amount,
            };
            return acc;
          }, {});

          const vendorOrderData = {
            address: formData,
            branch: "Online Store", // branch location
            charges, // like in the previous time
            clientEmail: user.email,
            clientID: userId,
            clientName: `${formData.firstName} ${formData.lastName}`,
            clientPhoneNumber: formData.phoneNumber,
            deliveryDate: estimatedArrival,
            id: docRef.id, // the id of the document
            invoice: orderCount + 1,// this is how many orders did this branch have,
            items: vendorItems.reduce((acc: { [key: string]: number }, item) => {
              acc[item.product.docID] = item.amount;
              return acc;
            }, {}),
            orderDate: Timestamp.now(),
            paymentMethod: "cash",
            price: vendorItems.reduce((total, item) => total + item.product.price * item.amount, 0),
            promocode: "",
            status: "pending",
            vendorID: vendorID,
          };

          // Add a separate document for each vendor's order
          await addDoc(collection(firestore, "orders"), vendorOrderData);

        // Check if the client exists in the `clients` collection for this vendor
        const clientsRef = collection(firestore, "clients");
        const q = query(clientsRef, where("vendorID", "==", vendorID), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // Client does not exist for this vendor, so add them
          const clientData = {
            code: "20",
            email: user.email,
            exactDate: Timestamp.now(),
            name: formData.firstName,
            number: formData.phoneNumber,
            vendor: vendorID,
          };

        // Add client to the `clients` collection
        const docRef = await addDoc(clientsRef, clientData);
        const docId = docRef.id;
        
        // Update the client document to include the ID
        await updateDoc(docRef, {
          id: docId // Add the generated ID to the client document
        });

          console.log("Client added to vendor's clients list.");
        } else {
          console.log("Client already exists for this vendor.");
        }

        }

        localStorage.clear();
        window.dispatchEvent(new Event("cart-updated"));
        console.log("Order created successfully!", userOrderData);
        router.push('/account?tab=orders')
      } catch (error) {
        console.error(error);
      } 
    }
  }

  return (
    <main className="flex justify-center bg-[#FFFFFF] overflow-hidden min-h-screen">
        <div className="flex-col w-[1200px] mx-5 md:mx-32 h-full mt-24 md:mt-32">
          <p className="mb-2">Delivery Address</p>
          <div className="flex flex-col lg:flex-row w-full h-full">
            <div className="w-full mb-5">
              <CheckoutForm 
              setConfirmedAddress={setConfirmedAddress} 
              confirmedAddress={confirmedAddress}
              formData={formData}
              setFormData={setFormData}
              />
            </div>

            {/* Price Breakdown */}
            <div className="w-full lg:w-[35%] flex flex-col items-center">
              <div className="flex flex-col lg:ml-5 w-full bg-[#F1F1F1] p-5 rounded-md justify-center">
                {/* Sub Total */}
                <div className="flex justify-between mb-4 text-[16px]">
                  <p>Subtotal</p>
                  <p>{subtotal} EGP</p>
                </div>

                {/* Gem Discount */}
                <div className="flex justify-between mb-4 text-[14px]">
                  <p>Gem Discount</p>
                  <p>-{gemDiscount} EGP</p>
                </div>

                {/* Delivery */}
                <div className="flex justify-between mb-4 text-[14px]">
                  <p>Delivery</p>
                  <p>{deliveryFee} EGP</p>
                </div>

                <div className="border-b border-[#c9c9c9] mb-4"></div>

                {/* Total */}
                <div className="flex justify-between font-bold text-[16px]">
                  <p>Total Price</p>
                  <p>{totalPrice} EGP</p>
                </div>
                <p className="self-center text-[#C1A875]">Cash on Delivery</p>
              </div>

              <button 
                onClick={handlePayment}
                className={`mb-10 mt-10 py-3 w-[200px] ${confirmedAddress ? "bg-[#C1A875]" : "bg-[#c0c0c0]"}  text-white rounded-md`}
                disabled={!confirmedAddress}
              >Proceed to Payment</button>
            </div>

          </div>
        </div>
    </main>
  );
}

export default Page;