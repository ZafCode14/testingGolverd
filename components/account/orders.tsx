import { useEffect, useState } from "react";
import Link from "next/link";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import ActiveOrders from "../orders/activeOrders";

type Address = {
  address: string;
  firstName: string;
  city: string;
  country: string;
  apartment: string;
  postalCode: string;
};

type Product = {
  name: string;
  images: string[];
  price: string;
  docID: string;
}

type Products = {
  product: Product;
  quantity: number;
};

type Price = {
  total: number;
  subtotal: number;
  discount: number;
  delivery: number;
}

type Order = {
  id: string;
  userId: string;
  address: Address;
  products: Products[];
  totalPrice: number;
  price: Price;
  status: string;
  paymentMethod: string;
  createdAt: Timestamp;
  estimatedArrival: Timestamp;
};
function Orders() {
  const [orderTab, setOrderTab] = useState<string>("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null); // User is from Firebase Auth
  const auth = getAuth();

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
    if (user) {
      const getOrderData = async () => {
        try {
          const ordersRef = collection(firestore, "usersOrders");
          const q = query(ordersRef, where("userId", "==", user.uid))

          const querySnapshot = await getDocs(q);
          const ordersData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Order[];

          setOrders(ordersData);
        } catch (error) {
          console.error(error)
        }
      }
      getOrderData();
    }
  }, [user])

  return (
    <div className="w-full px-5" style={{
      height: "calc(100vh - 205px)"
    }}>
      <div className="w-full flex">
        <p 
        onClick={() => setOrderTab("orders")} 
        className={`
          flex justify-center items-center 
          w-[50%] border-black pb-1 cursor-pointer 
          ${orderTab === "orders" ? "border-b-2 font-bold" : "border-b"}
        `}>Orders</p>
        <p 
        onClick={() => setOrderTab("previous orders")} 
        className={`
          flex justify-center items-center cursor-pointer 
          w-[50%] border-black pb-1
          ${orderTab === "previous orders" ? "border-b-2 font-bold" : "border-b"}
        `}>Previous Orders</p>
      </div>
      <div className="flex flex-col justify-start items-center overflow-y-auto" style={{
        height: "calc(100vh - 235px)"
      }}>
      {
        orderTab === "orders" 
        ?
        <div className="w-full flex flex-col justify-center items-center">
          {
            orders.filter((order) => 
              order.estimatedArrival.toMillis() > Date.now() // Check if estimated arrival is greater than now
            ).length > 0 ?
            <ActiveOrders 
              orders={orders.filter((order) => 
                order.estimatedArrival.toMillis() > Date.now() // Filter for Active Orders
              )} 
              status={"pending"}
            />
            :
            <div className="mt-20 flex flex-col items-center">
              <p className="text-[#BF9944] mb-1">Start shopping and make your first order!</p>
              <Link href={"/shop"} className="text-[#85563C] underline">Shop Now</Link>
            </div>
          }
        </div>
        : 
        <div className="w-full flex flex-col justify-center items-center">
          {
            orders.filter((order) => 
              order.estimatedArrival.toMillis() <= Date.now() // Check if estimated arrival is less than or equal to now
            ).length > 0 ?
            <ActiveOrders 
              orders={orders.filter((order) => 
                order.estimatedArrival.toMillis() <= Date.now() // Filter for Fulfilled Orders
              )} 
              status={"fulfilled"}
            />
            :
            <div className="mt-20">
              <p className="text-[#BF9944] mb-1">You currently have no delivered orders!</p>
            </div>
          }
        </div>
      }

      </div>
    </div>
  )
}

export default Orders;