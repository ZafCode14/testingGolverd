import { useState, useEffect } from 'react';
import { firestore } from '../../lib/firebase';
import { doc, updateDoc, deleteField, getDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

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
interface CreateFormProps {
  userId: string; // Assuming you're passing the authenticated user as a prop
  onAddressAdded: (address: Address) => void; // Add the callback prop
  onAddressDeleted: (id: string) => void;
  setShowCreateNew: React.Dispatch<React.SetStateAction<boolean>> 
  existingAddress?: {
    country: string;
    governate: string;
    city: string;
    postal: string;
    apartment: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
  };
  addressId?: string; 
}

function CreateForm({ userId, onAddressAdded, onAddressDeleted, setShowCreateNew, existingAddress, addressId }: CreateFormProps) {
  const [formData, setFormData] = useState({
    country: existingAddress?.country || '',
    governate: existingAddress?.governate || '',
    city: existingAddress?.city || '',
    postalCode: existingAddress?.postal || '',
    apartment: existingAddress?.apartment || '',
    firstName: existingAddress?.firstName || '',
    lastName: existingAddress?.lastName || '',
    phoneNumber: existingAddress?.phoneNumber || '',
    address: existingAddress?.address || '',
  });

  const [isFormComplete, setIsFormComplete] = useState(false);

  // Check if all form fields are filled
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(field => field.trim() !== '');
    setIsFormComplete(allFieldsFilled);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormComplete) return;

    try {
      setShowCreateNew(false);
      const userRef = doc(firestore, 'users', userId);
      const currentAddressId = addressId || uuidv4(); // Use the existing ID if editing, otherwise generate a new one
      
      // Get the user document to check if any addresses exist
      const userDoc = await getDoc(userRef);
      const addresses = userDoc.data()?.addresses || {}; // Safely access the addresses field

      const addressObject = { addressId: currentAddressId, ...formData };

      const updateData: Partial<Record<string, typeof formData | string>> = {
        [`addresses.${currentAddressId}`]: formData, // Update or create a new address in 'addresses'
      };

      // If there are no addresses, add 'defaultAddress' field
      if (Object.keys(addresses).length === 0) {
        updateData['defaultAddress'] = currentAddressId; // Set default address if it's the first one
      }

      // Update the user document with the new or updated address and possibly the default address
      await updateDoc(userRef, updateData);

      console.log(addressId ? 'Address updated successfully!' : 'Address added successfully!');
      onAddressAdded(addressObject); // Notify the parent component
    } catch (error) {
      console.error('Error updating/adding address:', error);
    }
  };

  const handleDelete = async (addressId: string) => {
    try {
      if (!addressId) return; // Ensure there's an addressId to delete

      const userRef = doc(firestore, 'users', userId);

      // Update the user document by setting the address field to null
      await updateDoc(userRef, {
        [`addresses.${addressId}`]: deleteField(), // Remove the address with this ID
      });

      console.log('Address deleted successfully!');
      onAddressDeleted(addressId);
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };


  return (
    <div className="w-full bg-white flex flex-col rounded-md relative">
      <div className="w-full px-5">
        <h2 className="flex justify-center items-center py-5 border-b border-[#cccccc]">
          Please Add Your Address
        </h2>
      </div>
      <form className="flex flex-col sm:flex-row" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full sm:w-[50%] p-5 pb-3">
          <input
            name="country"
            placeholder="Country/Region"
            className="bg-[#F1F1F1] flex text-center py-2 sm:py-4 rounded-md mb-3 sm:mb-5"
            onChange={handleChange}
            value={formData.country}
          />
          <input
            name="governate"
            placeholder="Governate"
            className="bg-[#F1F1F1] flex text-center py-2 sm:py-4 rounded-md mb-3 sm:mb-5"
            onChange={handleChange}
            value={formData.governate}
          />
          <div className="flex mb-3 sm:mb-5">
            <input
              name="city"
              placeholder="City"
              className="bg-[#F1F1F1] flex text-center py-2 sm:py-4 rounded-md w-[50%] mr-3 sm:mr-5"
              onChange={handleChange}
              value={formData.city}
            />
            <input
              name="postalCode"
              placeholder="Postal Code"
              className="bg-[#F1F1F1] flex text-center py-2 sm:py-4 rounded-md w-[50%]"
              onChange={handleChange}
              value={formData.postalCode}
            />
          </div>
          <input
            name="apartment"
            placeholder="Apartment, suite, etc."
            className="bg-[#F1F1F1] flex text-center py-2 sm:py-4 rounded-md sm:mb-5"
            onChange={handleChange}
            value={formData.apartment}
          />
        </div>

        <div className="flex flex-col w-full sm:w-[50%] p-5 pt-0 sm:pt-5">
          <div className="flex mb-3 sm:mb-5">
            <input
              name="firstName"
              placeholder="First Name"
              className="bg-[#F1F1F1] flex text-center py-2 sm:py-4 rounded-md w-[50%] mr-3 sm:mr-5"
              onChange={handleChange}
              value={formData.firstName}
            />
            <input
              name="lastName"
              placeholder="Last Name"
              className="bg-[#F1F1F1] flex text-center py-2 sm:py-4 rounded-md w-[50%]"
              onChange={handleChange}
              value={formData.lastName}
            />
          </div>
          <input
            name="phoneNumber"
            placeholder="Phone Number"
            className="bg-[#F1F1F1] flex text-center py-2 sm:py-4 rounded-md mb-3 sm:mb-5"
            onChange={handleChange}
            value={formData.phoneNumber}
          />
          <input
            name="address"
            placeholder="Address"
            className="bg-[#F1F1F1] flex text-center py-2 sm:py-4 rounded-md mb-3 sm:mb-5"
            onChange={handleChange}
            value={formData.address}
          />
          {addressId ? (
            <div className="w-full flex">
              <button
                type="button"
                className="mr-2 py-5 rounded-md text-white bg-[#b43e3e] flex-1"
                onClick={() => handleDelete(addressId)}
              >
                Delete
              </button>
              <button
                type="submit"
                className={`py-5 rounded-md text-white flex-1 ${
                  isFormComplete ? 'bg-[#C1A875]' : 'bg-[#C4C4C4] cursor-not-allowed'
                }`}
                disabled={!isFormComplete}
              >
                Update
              </button>
            </div>
          ) : (
            <button
              type="submit"
              className={`py-5 rounded-md text-white ${
                isFormComplete ? 'bg-[#C1A875]' : 'bg-[#C4C4C4] cursor-not-allowed'
              }`}
              disabled={!isFormComplete}
            >
              Confirm Changes
            </button>
          )}
        </div>
      </form>

    </div>
  );
}

export default CreateForm;