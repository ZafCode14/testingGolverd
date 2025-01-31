import { useState } from "react";
import ChoseDateTime from "./choseDateTime";
import { Product, Vendor, VendorBranch } from "@/lib/types";

interface Props {
  setAppointment: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  vendor: Vendor;
  product: Product;
}
function ChoseBranch({ setAppointment, userId, vendor, product }: Props) {
  const [next, setNext] = useState(false);
  const [choseBranchInfo, setChosenBranchInfo] = useState<VendorBranch | null>(null);

  return (
    <div className="w-[600px] max-w-full h-[500px] max-h-[80%] bg-white rounded-md flex flex-col relative">
      {/* Header Section */}
      <div className="flex border-b border-[#bebebe] relative justify-center">
        <p
          onClick={() => setAppointment(false)}
          className="absolute left-5 top-4 text-[20px]"
        >
          &lt;
        </p>
        <p className="py-5">Please choose a branch</p>
      </div>

      {/* Branch Choices */}
      <div className="flex-1 px-5 w-full mt-10 text-[12px] md:text-[16px] flex flex-wrap justify-center">
        {Object.entries(vendor.branchesNew).map(([number, info]) => {
          const isSelected = choseBranchInfo === info;

          const inStock = product.branches[info.name]?.inStock;
          if (inStock > 0) {
            return (
              <div
                onClick={() => setChosenBranchInfo(info)}
                key={number}
                className={`
                  p-5 w-[45%] h-[120px] m-1 rounded-md cursor-pointer 
                  ${isSelected ? 'bg-green-300' : 'bg-gray-300'}
                `}
              >
                <p>{info?.name}</p>
                <p>{info?.address}</p>
                {info.numbers?.map((number, index) => (<p key={index}>{number}</p>))}
              </div>
            );

          }
        })}
      </div>

      {/* Confirm Button */}
      <button
        className={`rounded-md w-[200px] py-3 text-white mx-auto mb-10 ${
          choseBranchInfo ? "bg-blue-500" : "bg-gray-200 cursor-not-allowed"
        }`}
        onClick={() => setNext(true)}
        disabled={!choseBranchInfo}
      >
        Chose Time Slot
      </button>

      {next && (
        <div
          className={`
          absolute right-0 top-0 h-full w-full bg-white rounded-md
        `}
        >
          <ChoseDateTime
            setAppointment={setAppointment}
            setNext={setNext}
            vendor={vendor}
            product={product}
            userId={userId}
            branchInfo={choseBranchInfo}
          />
        </div>
      )}
    </div>
  );
}

export default ChoseBranch;