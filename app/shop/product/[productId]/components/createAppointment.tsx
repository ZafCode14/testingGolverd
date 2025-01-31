import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import ChoseBranch from "./choseBranch";
import { Product, Vendor } from "@/lib/types";

interface Prop {
  setAppointment: React.Dispatch<React.SetStateAction<boolean>>;
  vendor: Vendor;
  product: Product;
}


function CreateAppointment({ setAppointment, vendor, product }: Prop) {
  const [userId, setUserId] = useState<string | null>(null);
  const auth = getAuth();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);


  if (userId) {
    return (
      <div className="w-full h-full fixed flex justify-center items-center top-0 right-0 bg-[#000000a1] z-10 px-5">
        <ChoseBranch 
          setAppointment={setAppointment}
          userId={userId}
          vendor={vendor}
          product={product}
        />
      </div>
    );
  }
}

export default CreateAppointment;