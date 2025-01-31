"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import useRedirect from "@/hooks/redirect";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useRedirect();

  const inputClass = "w-[340px] max-w-full h-[40px] rounded-md my-2 text-black text-center";

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      // Firebase sign-in
      await signInWithEmailAndPassword(auth, email, password);
      router.back();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Custom error handling based on Firebase error codes
      if (err.code === "auth/user-not-found") {
        setError("Incorrect Email");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect Password");
      } else {
        setError("Failed to log in. Please try again.");
      }
    }
  };

  return (
    <main className="flex h-screen text-white relative z-20">
      {/* Left Image */}
      <div className="hidden flex-1 h-[100vh] w-auto overflow-hidden md:flex items-end relative">
        <Image
          alt="login image"
          src="/images/loginImage.png"
          height={3000}
          width={3000}
          className="h-full object-cover"
          priority
        />
        <p className="hidden lg:block absolute text-[45px] top-12 left-12 leading-[45px] mt-[5vw]">
          Experience <br /> <i>Something New</i>
        </p>
        <p className="hidden lg:block absolute text-[45px] bottom-12 right-5 leading-[45px]">
          All Your <br /> Favorite Brands <br /> <i>In One Place</i>
        </p>
      </div>

      {/* Input field */}
      <div className="bg-[#2A1C1B] w-full md:w-[400px] max-w-[100%] flex flex-col justify-center items-center">
        <p>Sign In</p>
        <form className="flex flex-col w-[90%] items-center" onSubmit={handleSubmit}>
          <input
            placeholder="E-mail"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            className={inputClass}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500">{error}</p>} {/* Display error if present */}
          <button className={`text-white bg-[#BF9944] ${inputClass}`} type="submit">
            Sign In
          </button>
        </form>
          <Link href={'/register'}>
            Don&apos;t have an account? <span className="text-[#BF9944]">Sign Up</span>
          </Link>
      </div>
    </main>
  );
}

export default Page;