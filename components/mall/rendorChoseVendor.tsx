import { firestore } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";
import SeperateFrontView from "./positions/modern/seperateFrontView";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allVendors: any;
}
function RendorChoseVendor({ allVendors }:Props) {
  const searchParams = useSearchParams();
  const vendorId = searchParams.get('brand');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vendor, setVendor] = useState<any>(null); // State to hold the vendor data

  useEffect(() => {
    const getVendor = async () => {
      try {
        if (vendorId) {
          // Reference the vendors collection
          const vendorRef = collection(firestore, 'vendors'); // Replace 'vendors' with your actual collection name
          // Create a query to find the vendor by docID
          const q = query(vendorRef, where('docID', '==', vendorId));
          
          const querySnapshot = await getDocs(q); // Fetch documents based on the query

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              // Get the vendor data from the document
              const vendorData = doc.data();
              setVendor(vendorData); // Set the vendor data in state
            });
          } else {
            console.log('No matching vendor found');
          }
        }
      } catch (error) {
        console.error('Error fetching vendor:', error);
      }
    };

    getVendor(); // Call the function to fetch vendor
  }, [vendorId]); // Run the effect when vendorId changes

  if (vendor) {
    const vendorStyle = vendor?.chosenShopStyle.split('/')[2];
    const allVendorsWithChosenStyle = Object.values(allVendors[vendorStyle]).slice(1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const matchingVendor: any = allVendorsWithChosenStyle.find((v: any) => v.vendor.docID === vendorId);
      
    if (matchingVendor) {
      return (
        <div className="relative h-[52vw] w-full flex justify-center items-center overflow-hidden">
          <SeperateFrontView
            vendor={matchingVendor}
            frontView={matchingVendor.frontView}
          />
        </div>
      );
    }
  } else return (
    <div className="w-full h-full bg-white absolute top-0">
      <Loading/>
    </div>
  )
}

export default RendorChoseVendor;