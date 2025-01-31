import { deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, firestore } from "@/lib/firebase";

interface DeleteAccountProps {
  userId: string;
}

function DeleteAccount({ userId }: DeleteAccountProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const handleDeleteAccount = async () => {
      setLoading(true);
      try {
          const user = auth.currentUser;

          if (!user) {
              throw new Error("User is not authenticated.");
          }

          // Re-authenticate the user if necessary (e.g., session expired)
          const password = prompt("Please enter your password to confirm account deletion");
          
          // Check if password is not null before proceeding
          if (password === null) {
              throw new Error("Password is required to delete your account.");
          }

          const credential = EmailAuthProvider.credential(user.email!, password);

          await reauthenticateWithCredential(user, credential);

          // Delete the user from Firebase Authentication
          await deleteUser(user);

          // Delete the user's document from Firestore
          const userDocRef = doc(firestore, "users", userId);
          await deleteDoc(userDocRef);

          alert("Account successfully deleted.");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
          console.error("Error deleting account:", err);
          setError(err.message);
      } finally {
          setLoading(false);
      }
  };


  return (
    <div className="px-5">
      <h3 className="font-bold mt-10">Delete Account</h3>
      <p className="text-[12px]">
        Deleting your account will permanently delete all your account activity,
        gems, information & history...
      </p>

      <p className="text-[12px]">Are you sure you want to delete your account?</p>
      <p
        className="text-[12px] text-[red] cursor-pointer"
        onClick={() => setConfirmation(true)}
      >
        Yes, I want to delete my account.
      </p>

      {confirmation && (
        <div className="mt-2 text-[12px]">
          <p className="text-red-600">
            This action is irreversible. Please confirm your decision.
          </p>
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={handleDeleteAccount}
            className={`mt-4 px-4 py-2 rounded-md text-white ${
              loading ? "bg-gray-400" : "bg-red-500"
            }`}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Confirm Deletion"}
          </button>
        </div>
      )}
    </div>
  );
}

export default DeleteAccount;