"use client";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { auth, firestore } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import Link from "next/link";
import useRedirect from "@/hooks/redirect";

// Define the type for the form fields
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  password: string;
  repeatPassword: string;
}

function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    repeatPassword: "",
  });
  
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useRedirect();

  const inputClass = "w-[340px] max-w-full h-[40px] rounded-md my-2 text-center";
  const selectClass = "w-[340px] max-w-full h-[40px] rounded-md my-2 text-center bg-white text-gray-400";

  // Handle input change for text fields and select dropdown
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Add user data to Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        createdAt: serverTimestamp(),
      });

      router.push("/");

      console.log("User registered:", user);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <main className="flex h-screen relative z-20 w-full text-white">
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
        <p>Sign Up</p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center text-black w-[90%]">
          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className={inputClass}
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className={inputClass}
            required
          />
          <input
            name="email"
            placeholder="E-mail"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            required
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={selectClass}
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={inputClass}
            required
          />
          <input
            name="repeatPassword"
            placeholder="Confirm Password"
            type="password"
            value={formData.repeatPassword}
            onChange={handleChange}
            className={inputClass}
            required
          />
          <button type="submit" className={`text-white bg-[#BF9944] ${inputClass}`}>
            Create Account
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <Link href={'/login'}>
          <p>Already have an account? <span className="text-[#BF9944]">Sign In</span></p>
        </Link>
      </div>
    </main>
  );
}

export default RegisterPage;
