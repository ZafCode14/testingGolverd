import { firestore } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
interface Props {
  appointment: Appointment;
  status: string[];
}

function AccountAppointment({appointment, status}:Props) {
  const [appointmentStatus, setAppointmentStatus] = useState(appointment.status);

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      const appointmentRef = doc(firestore, "appointments", appointmentId);

      await updateDoc(appointmentRef, {
        status: "cancelled",
      });

      setAppointmentStatus("cancelled");
      console.log("Appointment successfully cancelled.");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  if (status.includes(appointmentStatus)) {
    return (
      <div className={`flex justify-between bg-[#D9D9D9] p-3 h-[150px] rounded-md w-full md:w-[49%] text-[12px] mb-3`}>
        <div className={`flex flex-col justify-between`}>
          <div>
            <p className={`font-bold`}>{appointment.vendorName}</p> 
            <p>{appointment.branchInfo.location}</p>
            <p>{appointment.branchInfo.address}</p>
            {
              appointment.branchInfo.maps &&
              <Link target="_blank" rel="noopener noreferrer" href={appointment.branchInfo.maps} className={`
                underline
                font-bold
              `}>View in Maps</Link>
            }
          </div>
          <div className={`flex`}>
            <Image
              src={appointment.productImage}
              alt="product image"
              width={200}
              height={200}
              className={`bg-white w-[50px] h-[50px] rounded-md mr-2 object-contain`}
            />
            <div className="flex flex-col justify-center text-[9px]">
              <p>{appointment.productName}</p>
              <div className={`flex justify-between w-full`}>
                <p className={`mr-3`}>{appointment.productPrice} EGP</p>
                <Link className={`font-bold underline`} href={`/shop/product/${appointment.productId}`}>View in Store</Link>
              </div>
            </div>
          </div>
        </div>

        <div className={`flex flex-col justify-between items-end`}>
          <div className={`flex flex-col items-end`}>
            <p>{appointment.date}</p>
            <p>{appointment.time}</p>
            { appointment.branchInfo.numbers &&
            appointment.branchInfo.numbers.map((number, index) => (<p key={index}>{number}</p>))}
          </div>
          {
            appointmentStatus === "upcoming" ?
            <button onClick={() => handleCancelAppointment(appointment.id)} className={`bg-[#FF110066] py-2 px-3 rounded-md`}>Cancel Appointment</button> :
            appointmentStatus === "cancelled" ?
            <p className="text-[red] font-bold">Cancelled Appointment</p> :
            <p className="text-[#00b100] font-bold">Attended Appointment</p>
          }
        </div>
      </div>
    );
  }
}

export default AccountAppointment;