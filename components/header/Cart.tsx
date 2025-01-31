"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function Cart() {
  const [cartCount, setCartCount] = useState(0);
  const p = usePathname();

  // Initial load of cart items
  useEffect(() => {
    getCartItems(); // Retrieve cart count when component mounts

    // Listen to 'storage' event and 'cart-updated' event to detect changes in localStorage
    const handleStorageChange = () => {
      getCartItems(); // Update cart count when storage or cart is updated
    };

    window.addEventListener("cart-updated", handleStorageChange); // Listen to custom event

    return () => {
      window.removeEventListener("cart-updated", handleStorageChange); // Cleanup event listener
    };
  }, []);

  // Function to retrieve cart items from localStorage
  const getCartItems = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cartItems.length); // Update the cart count
  };

  return (
    <div className="relative flex items-center">
      <Link href="/cart" className={`
        sm:mx-5 relative 
        text-[14px] md:text-[16px]
        ${p.startsWith("/cart") && "text-[#C4A153]"}
        `}>
        Cart {cartCount > 0 && <span className="ml-1 absolute bg-[#C1A875] rounded-full w-5 h-5 text-[white] flex justify-center items-center -top-2 -right-5">{cartCount}</span>}
      </Link>
    </div>
  );
}

export default Cart;