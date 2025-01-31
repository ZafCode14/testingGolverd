import { firestore } from "@/lib/firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import AccountAppointment from "./accountAppointment";
import { Branch } from "@/types/products";

interface Appointment {
  id: string;
  date: string;
  productImage: string;
  productName: string;
  productPrice: string;
  productId: string;
  time: string;
  userId: string;
  branchInfo: Branch;
  vendorName: string;
  status: string;
}
function Appointments() {
  const [appointmentTab, setAppointmentTab] = useState<string>("upcoming");
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [user, setUser] = useState<User | null>(null); // User is from Firebase Auth
  const auth = getAuth();

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

  useEffect(() => {
    const getAppointmentData = async () => {
      if (user) {
        try {
          const appointRef = collection(firestore, 'appointments');
          const q = query(appointRef, where("userId", "==", user.uid))

          const querySnapshot = await getDocs(q);
          const appointData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Appointment[];

          setAppointments(appointData);
        } catch (error) {
          console.error(error);
        }
      }
    }
    getAppointmentData();
  }, [user])

  return (
    <div className="w-full px-5">
      <div className="w-full flex">
        <p 
        onClick={() => setAppointmentTab("upcoming")} 
        className={`
          flex justify-center items-center 
          w-[50%] border-black pb-1 border-b-1 cursor-pointer 
          ${appointmentTab === "upcoming" ? "border-b-2 font-bold" : "border-b"}
        `}>Upcoming</p>
        <p 
        onClick={() => setAppointmentTab("previous")} 
        className={`
          flex justify-center items-center 
          w-[50%] border-black pb-1 cursor-pointer 
          ${appointmentTab === "previous" ? "border-b-2 font-bold" : "border-b"}
        `}>Previous</p>
      </div>
      <div className="flex mt-10 w-full overflow-y-auto" style={{
        height: "calc(100vh - 270px)"
      }}>
        {
          appointmentTab === "upcoming" 
          ?
          <div className={`w-full flex justify-between flex-wrap overflow-y-auto`}>
            {
              appointments &&
              appointments.length > 0 ?
              appointments.map((appointment, index) => {
                return (
                    <AccountAppointment 
                      key={index}
                      appointment={appointment} 
                      status={["upcoming"]}/>
                )
              })
              :
              <p className="text-[#BF9944] mb-1 w-full flex justify-center">You have no upcoming appointments</p>
            }
          </div>
          : 
          <div className={`w-full flex justify-between flex-wrap`}>
            {
              appointments &&
              appointments.length > 0 ?
              appointments.map((appointment, index) => {
                return (
                    <AccountAppointment
                      key={index}
                      appointment={appointment}
                      status={["cancelled", "attended"]}
                    />
                )
              })
              :
              <p className="text-[#BF9944] mb-1 w-full flex justify-center">You have no previous appointments</p>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Appointments;