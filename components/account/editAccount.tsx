import { doc, updateDoc } from "firebase/firestore"; // Assuming you're using Firestore
import { firestore } from "@/lib/firebase";
import { useState } from "react";
import { updateEmail, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface Inputs {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
interface EditProp {
  statement: string;
  answer: string | undefined;
  edit: boolean;
  editText: string;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setSavedInputs: React.Dispatch<React.SetStateAction<Inputs>>;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userId: string;
}

function EditAccount({
  statement,
  answer,
  edit,
  editText,
  setEdit,
  name,
  value,
  handleChange,
  userId,
  setSavedInputs
}: EditProp) {
  const [loading, setLoading] = useState<boolean>(false); // Loading state for Firebase updates

  const handleSave = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No user is authenticated.");
      }

      // Reauthenticate the user before email update if the name is "email"
      if (name === "email") {
        const userPassword = prompt("Please enter your current password for security verification:");
        if (!userPassword) {
          throw new Error("Password is required for reauthentication.");
        }

        // Create credential using the current email and provided password
        const credential = EmailAuthProvider.credential(user.email as string, userPassword);

        // Reauthenticate the user
        await reauthenticateWithCredential(user, credential);

        // After successful reauthentication, update the user's email
        await updateEmail(user, value);

        // Update the email in Firestore
        const userRef = doc(firestore, "users", userId);
        await updateDoc(userRef, { email: value });
      } else {
        // Update Firestore for other fields
        const userRef = doc(firestore, "users", userId);
        await updateDoc(userRef, {
          [name]: value,
        });
      }

      // Update local state (inputs) without overwriting other fields
      setSavedInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));

      // Close the edit mode after successful save
      setEdit(false);
    } catch (error) {
      console.error("Error updating Firebase:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-[400px] max-w-full">
      {!edit ? (
        <div className="pt-1 pb-3 px-4">
          <h3 className="font-bold">{statement}</h3>
          <div className="flex relative">
            <p>{answer}</p>
            <p
              onClick={() => setEdit(true)}
              className="text-[#C1A875] underline absolute left-[180px]"
            >
              {editText}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-[white] rounded-md pt-1 pb-3 px-4">
          <h3 className="font-bold">{statement}</h3>
          <div className="flex relative">
            <input
              className="border-b border-black"
              name={name}
              value={value}
              onChange={handleChange}
            />
            <div className="absolute left-[190px] flex">
              {loading ? (
                <p>Loading...</p> // Display loading state
              ) : (
                <>
                  <p
                    onClick={handleSave}
                    className="text-[#85563C] underline cursor-pointer"
                  >
                    Confirm Change
                  </p>
                  <p
                    onClick={() => setEdit(false)}
                    className="text-[#FF1100] underline ml-3 cursor-pointer"
                  >
                    Cancel
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditAccount;