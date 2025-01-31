"use client";
import { auth, firestore } from "@/lib/firebase";
import { User } from "@/lib/types";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

function AccountLogin() {
  const user = auth.currentUser;
  const [userInfo, setUserInfo] = useState<User | null>(null);

  {/** Get user Info from the Users Table */}
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDocRef = doc(firestore, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserInfo({ id: userDoc.id, ...(userDoc.data() as Omit<User, 'id'>) });
          } else {
            setUserInfo(null); // User document does not exist
          }
        } catch (error) {
          console.error(error)
        }
      } else {
        setUserInfo(null); // No authenticated user
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);
  return (
    <>
      {user ? (
        // Display round gray circle if user is authenticated
        <Link href={'/account?tab=wishlist'} className="flex items-center mx-5">
          <p className={`
            sm:absolute right-10
            w-[30px] h-[30px] md:w-[40px] md:h-[40px] 
            text-black bg-[white] 
            rounded-full md:mr-10 
            flex justify-center items-center 
            text-[16px] 
            font-bold
          `}>
            {user !== null && userInfo?.firstName.charAt(0).toUpperCase()}
          </p>
        </Link>
      ) : (
        // Display "Login/Sign up" if no user is authenticated
        <Link
          href="/login"
          className={`
            flex justify-center items-center
            mx-1 md:mx-5 bg-[#C4A153]
            px-2 md:my-2 py-[3px]
            rounded-md text-[10px] md:text-[14px]
            font-bold
          `}
        >
          Login/Sign up
        </Link>
      )}
    </>
  );
}

export default AccountLogin;