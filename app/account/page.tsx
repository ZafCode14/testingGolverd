"use client";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/loading";
import useRedirect from "@/hooks/redirect";
import Whishlist from "@/components/account/whishlist";
import Appointments from "@/components/account/appointments";
import Orders from "@/components/account/orders";
import Delivery from "@/components/account/delivery";
import PersonalInformation from "@/components/account/personalInformation";

function AccountPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabMap: { [key: string]: JSX.Element } = {
    wishlist: <Whishlist />,
    appointments: <Appointments />,
    orders: <Orders />,
    delivery: <Delivery />,
    "personal-information": <PersonalInformation />,
  };

  // Get the current tab from the search parameters, defaulting to 'wishlist'
  const activeTab = searchParams.get("tab") || "wishlist";

  // Handle the selection change for small screens
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTab = e.target.value;
    router.push(`/account?tab=${selectedTab}`);
  };

  return (
    <div className="flex h-full">
      {/* Account Tabs */}
      <div className="hidden w-[30%] lg:flex flex-col items-center text-center font-bold text-[16px]">
        <h3 className="text-[24px]">Account</h3>
        <p
          onClick={() => router.push("/account?tab=wishlist")}
          className={`cursor-pointer my-2 ${activeTab === "wishlist" && "underline"}`}
        >
          Wishlist
        </p>
        <p
          onClick={() => router.push("/account?tab=appointments")}
          className={`cursor-pointer my-2 ${activeTab === "appointments" && "underline"}`}
        >
          Appointments
        </p>
        <p
          onClick={() => router.push("/account?tab=orders")}
          className={`cursor-pointer my-2 ${activeTab === "orders" && "underline"}`}
        >
          Orders
        </p>
        <p
          onClick={() => router.push("/account?tab=delivery")}
          className={`cursor-pointer my-2 ${activeTab === "delivery" && "underline"}`}
        >
          Delivery Address
        </p>
        <p
          onClick={() => router.push("/account?tab=personal-information")}
          className={`cursor-pointer my-2 ${activeTab === "personal-information" && "underline"}`}
        >
          Personal Information & Password
        </p>
      </div>

      {/* Tabs Seperator */}
      <div className="hidden lg:block w-0 mt-5 h-[210px] border-r border-[#c4c4c4]"></div>

      {/* Select Dropdown (for small screens) */}
      <div className={`
        absolute top-[130px]
        lg:hidden w-full flex justify-center mb-4
      `}>
        <select
          value={activeTab}
          onChange={handleSelectChange}
          className="p-2 border rounded-md w-[150px]"
        >
          <option value="wishlist">Wishlist</option>
          <option value="appointments">Appointments</option>
          <option value="orders">Orders</option>
          <option value="delivery">Delivery Address</option>
          <option value="personal-information">Personal Information & Password</option>
        </select>
      </div>


      {/* Render the tab based on the URL parameter */}
      <div className="w-full lg:w-[70%] h-full px-1 pb-24">
        {tabMap[activeTab] || <Whishlist />}
      </div>
    </div>
  );
}

function Page() {
  const { loading, isAuthenticated } = useRedirect(); // Call the useAuth hook
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); // Redirect to the home page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Show loading state if checking auth
  if (loading) {
    return <Loading />; // Or any loading spinner
  }

  if (isAuthenticated) {
    return (
      <main className="w-full h-screen flex justify-center">
        <div className="relative max-w-full w-[1200px] flex flex-col pt-[200px] lg:pt-[200px] px-0">
          <div className={`
            absolute top-[90px] right-0
            flex items-center justify-end mr-5
          `}>
            <p className="bg-[#C1A875] text-white px-5 py-1 lg:px-10 lg:py-2 rounded-md" onClick={handleLogout}>
              Log Out
            </p>
          </div>

          {/* Wrap dynamic search params logic inside Suspense */}
          <Suspense fallback={<Loading />}>
            <AccountPageContent />
          </Suspense>
        </div>
      </main>
    );
  } else return null;
}

export default Page;