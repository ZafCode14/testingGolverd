import useAuthUser from "@/hooks/user";
import CreateForm from "./createForm";
import FilledForm from "./filledForm";
import Loading from "../loading";
import { useState, useEffect } from 'react';
import { firestore } from "../../lib/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";


interface Address {
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
}
interface Addresses  {
  [id: string]: Address;
};

function Delivery() {
  const [theuser, loading] = useAuthUser();
  const [addresses, setAddresses] = useState<Addresses>({});
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState("");

  const userId = theuser?.id || "";

  useEffect(() => {
    // Fetch the default address on component mount
    const fetchDefaultAddress = async () => {
      if (!userId) return;
      try {
        const userRef = doc(firestore, 'users', userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setDefaultAddress(userDoc.data()?.defaultAddress || "");
        }
      } catch (error) {
        console.error("Error fetching default address:", error);
      }
    };

    fetchDefaultAddress();
  }, [userId]);

  useEffect(() => {
    if (theuser) {
      setAddresses(theuser.addresses);
    }
  }, [theuser]);

  const handleDefaultAddressChange = async (addressId: string) => {
    try {
      const userRef = doc(firestore, "users", userId);
      await updateDoc(userRef, { defaultAddress: addressId });

      setDefaultAddress(addressId); // Update state globally
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  const handleNewAddress = (newAddress: Address) => {
    setAddresses((prev) => ({
      ...prev,
      [newAddress.addressId]: newAddress,
    }));
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => {
      const updatedAddresses = { ...prev };
      delete updatedAddresses[id]; // Removes the address with the specified id
      return updatedAddresses;
    });
  };

  
  if (loading) {
    return <Loading />;
  }

  if (theuser === null) {
    return null; // Return null or an appropriate fallback
  }

  return (
    <div className="px-5 pb-24">
      {
        addresses && Object.keys(addresses).length > 0 ? (
          <div className="w-full flex flex-col items-center">
            {
              Object.entries(addresses).map(([id, address]) => {
                const addr = address as Address;
                return (
                  <FilledForm
                    key={id}
                    addressId={id}
                    country={addr.country}
                    governate={addr.governate}
                    city={addr.city}
                    postal={addr.postalCode}
                    apartment={addr.apartment}
                    phoneNumber={addr.phoneNumber}
                    firstName={addr.firstName}
                    lastName={addr.lastName}
                    address={addr.address}
                    userId={theuser.id}
                    onAddressAdded={handleNewAddress}
                    onAddressDeleted={handleDeleteAddress}
                    defaultAddress={defaultAddress}
                    onMakeDefault={handleDefaultAddressChange}
                  />
                )
              })
            }
            <div className={`w-[100vw] h-[100vh] bg-[#000000bb] justify-center ${showCreateNew ? "flex" : "hidden"} items-center absolute top-0 right-0`}>
              <div onClick={() => setShowCreateNew(false)} className="absolute top-[10vw] left-[10vw] w-[50px] h-[50px] text-white text-[70px]">&times;</div>
              <div className="w-[800px] max-w-[95%]">
                <CreateForm
                  userId={theuser.id} 
                  onAddressAdded={handleNewAddress} // Pass the callback function
                  setShowCreateNew={setShowCreateNew}
                  onAddressDeleted={handleDeleteAddress}
                />
              </div>
            </div>
            <button onClick={() => setShowCreateNew(true)} className="mb-10 bg-[white] py-2 px-10 rounded-md">New Address</button>
          </div>
        ) : (
          <CreateForm 
            userId={theuser.id} 
            onAddressAdded={handleNewAddress} // Pass the callback function
            setShowCreateNew={setShowCreateNew}
            onAddressDeleted={handleDeleteAddress}
          />
        )
      }
    </div>
  );
}

export default Delivery;