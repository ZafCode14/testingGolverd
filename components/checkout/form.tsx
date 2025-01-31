import { useState, useEffect } from 'react';
import { firestore } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth, User, onAuthStateChanged } from 'firebase/auth';

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

// Define a type for the default address if needed
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
}

interface Prop {
  setConfirmedAddress: React.Dispatch<React.SetStateAction<boolean>>;
  confirmedAddress: boolean;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>; 
}
function CheckoutForm({ setConfirmedAddress, confirmedAddress, formData, setFormData }:Prop) {

  const [isFormComplete, setIsFormComplete] = useState(false);
  const [user, setUser] = useState<User | null>(null); // User is from Firebase Auth
  const auth = getAuth();

  // Check if all form fields are filled
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(field => field.trim() !== '');
    setIsFormComplete(allFieldsFilled);
  }, [formData]);

  // Set up authentication state listener
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

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userId = user.uid;
        const userRef = doc(firestore, 'users', userId);

        try {
          const userDoc = await getDoc(userRef);
          const userData = userDoc.data();

          if (userData) {
            const defaultAddressId = userData.defaultAddress as string;

            // Check if defaultAddressId exists and addresses field is valid
            if (defaultAddressId && userData.addresses && userData.addresses[defaultAddressId]) {
              const defaultAddress = userData.addresses[defaultAddressId] as Address;
              setFormData(defaultAddress); // Set formData based on the fetched address
            } else {
              console.warn("No default address found. User may need to manually fill in the address.");
              // Optionally set empty formData if no default address is found
              setFormData({
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
            }
          } else {
            console.warn("User document not found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user, setFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };


  return (
    <div className="w-full bg-[#F8F8F7] flex flex-col rounded-md relative">

      <form className="flex flex-col sm:flex-row" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full sm:w-[50%] p-5 pb-0 sm:pb-5">
          <input
            name="country"
            placeholder="Country/Region"
            className={`flex text-center py-2 sm:py-4 rounded-md mb-3 sm:mb-5 ${confirmedAddress ? "text-[gray]" : "text-[black]"}`}
            onChange={handleChange}
            value={formData.country}
            disabled={confirmedAddress}
          />
          <input
            name="governate"
            placeholder="Governate"
            className={`flex text-center py-2 sm:py-4 rounded-md mb-3 sm:mb-5 ${confirmedAddress ? "text-[gray]" : "text-[black]"}`}
            onChange={handleChange}
            value={formData.governate}
            disabled={confirmedAddress}
          />
          <div className="flex mb-3 sm:mb-5">
            <input
              name="city"
              placeholder="City"
              className={`flex text-center py-2 sm:py-4 rounded-md w-[50%] mr-3 sm:mr-5 ${confirmedAddress ? "text-[gray]" : "text-[black]"}`}
              onChange={handleChange}
              value={formData.city}
              disabled={confirmedAddress}
            />
            <input
              name="postalCode"
              placeholder="Postal Code"
              className={`flex text-center py-2 sm:py-4 rounded-md w-[50%] ${confirmedAddress ? "text-[gray]" : "text-[black]"}`}
              onChange={handleChange}
              value={formData.postalCode}
              disabled={confirmedAddress}
            />
          </div>
          <input
            name="apartment"
            placeholder="Apartment, suite, etc."
            className={`flex text-center py-2 sm:py-4 rounded-md ${confirmedAddress ? "text-[gray]" : "text-[black]"}`}
            onChange={handleChange}
            value={formData.apartment}
            disabled={confirmedAddress}
          />
        </div>

        <div className="flex flex-col w-full sm:w-[50%] p-5 pb-3 sm:pb-5">
          <div className="flex mb-5">
            <input
              name="firstName"
              placeholder="First Name"
              className={`flex text-center py-2 sm:py-4 rounded-md w-[50%] mr-3 sm:mr-5 ${confirmedAddress ? "text-[gray]" : "text-[black]"}`}
              onChange={handleChange}
              value={formData.firstName}
              disabled={confirmedAddress}
            />
            <input
              name="lastName"
              placeholder="Last Name"
              className={`flex text-center py-2 sm:py-4 rounded-md w-[50%] ${confirmedAddress ? "text-[gray]" : "text-[black]"}`}
              onChange={handleChange}
              value={formData.lastName}
              disabled={confirmedAddress}
            />
          </div>
          <input
            name="phoneNumber"
            placeholder="Phone Number"
            className={`flex text-center py-2 sm:py-4 rounded-md mb-3 sm:mb-5 ${confirmedAddress ? "text-[gray]" : "text-[black]"}`}
            onChange={handleChange}
            value={formData.phoneNumber}
            disabled={confirmedAddress}
          />
          <input
            name="address"
            placeholder="Address"
            className={`flex text-center py-2 sm:py-4 rounded-md mb-3 sm:mb-5 ${confirmedAddress ? "text-[gray]" : "text-[black]"}`}
            onChange={handleChange}
            value={formData.address}
            disabled={confirmedAddress}
          />
          <button
            onClick={() => setConfirmedAddress(prev => !prev)}
            type="submit"
            className={`py-2 sm:py-5 rounded-md text-white ${
              isFormComplete ? `${confirmedAddress && isFormComplete ? "bg-[#4e8d4e]" : "bg-[#C1A875]"}` : 'bg-[#C4C4C4] cursor-not-allowed'
            }`}
            disabled={!isFormComplete}
          >
            {confirmedAddress && isFormComplete ? "Address Confirmed" : "Confirm Address"}
          </button>
        </div>
      </form>

    </div>
  );
}

export default CheckoutForm;