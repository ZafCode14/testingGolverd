import { useState } from "react";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface changePasswordProp {
  setResetPassword: React.Dispatch<React.SetStateAction<boolean>>;
}
function ChangePassword({ setResetPassword }: changePasswordProp) {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Password validation pattern (at least 8 characters, one uppercase letter, one lowercase letter, and one number)
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const isFormValid =
    currentPassword &&
    newPassword &&
    confirmPassword &&
    newPassword === confirmPassword &&
    passwordPattern.test(newPassword);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation password do not match");
      return;
    }

    if (!passwordPattern.test(newPassword)) {
      setError("New password does not meet the required pattern");
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;

      if (!user) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      // Re-authenticate the user with current password
      const credential = EmailAuthProvider.credential(user.email!, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update the user's password
      await updatePassword(user, newPassword);
      setNewPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
      setSuccess("Password changed successfully");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error changing password:", error);
      setError(error.message || "Error changing password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 max-w-full">
      <h3 className="font-bold mt-5 mb-1">Password</h3>
      <form className="flex flex-col md:flex-row w-[350px] max-w-full md:w-auto" onSubmit={handlePasswordChange}>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="mb-2 md:mb-4 py-2 rounded-md text-center border"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mb-2 md:mb-4 py-2 rounded-md text-center border"
          pattern={passwordPattern.source} // Apply pattern validation
          title="Password must be at least 8 characters long, contain one uppercase, one lowercase letter, and one number."
          required
        />
        <div className="flex flex-col relative">
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4 py-2 rounded-md text-center border"
            required
          />

          <button
            type="submit"
            className={`
              absolute top-[50px]
              w-full
              py-2 px-4 rounded-md text-white ${
              isFormValid ? "bg-green-500" : "bg-gray-300"
            }`}
            disabled={!isFormValid || loading} // Disable button until form is valid and not loading
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}

      <p className="text-[12px] mt-10 md:mt-1">
        Can&apos;t remember your current password?{" "}
        <span onClick={() => setResetPassword(true)} className="font-bold underline cursor-pointer">Reset Password</span>
      </p>
    </div>
  );
}

export default ChangePassword;