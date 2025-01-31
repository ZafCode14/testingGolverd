import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth"; // Ensure Firebase auth is imported
import { auth } from "@/lib/firebase";

interface ResetPasswordProp {
  setResetPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

function ResetPassword({ setResetPassword }: ResetPasswordProp) {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Regular expression for email validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Handle input change and validate email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsEmailValid(emailPattern.test(inputEmail)); // Validate email format
  };

  // Handle password reset link sending
  const handleResetPassword = async () => {
    if (!isEmailValid) return; // Prevent sending if email is invalid
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email); // Send reset link using Firebase auth
      alert("Reset link sent to your email.");
    } catch (error) {
      setErrorMessage("Error sending reset link. Please check your email.");
      console.error("Error sending reset link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p onClick={() => setResetPassword(false)}>back</p>
      <div className="w-full flex justify-center">
        <div className="flex flex-col items-center text-center w-[300px] max-w-full">
          <h1 className="text-[20px] font-bold">Reset Password</h1>
          <p className="text-[14px]">Please type in your e-mail to receive a reset link</p>

          <input
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="mt-10 w-full text-center py-3 rounded-md border border-gray-300"
            type="email"
          />
          
          {/* Error message if email sending fails */}
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

          <button
            className={`mt-5 w-full py-3 rounded-md text-white ${
              isEmailValid ? "bg-green-500" : "bg-gray-400"
            }`}
            disabled={!isEmailValid || isLoading}
            onClick={handleResetPassword}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;