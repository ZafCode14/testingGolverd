"use client";
import Elevator from "@/components/mall/elevator";
import Perspective1 from "@/components/mall/perspective1";
import { firestore } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Suspense, useEffect, useState } from "react";
import { Vendors } from "@/types/products";
import Loading from "@/components/loading";
import useWindowDimensions from "@/hooks/dimentions";
import FlipPhone from "@/components/mall/flipPhone";
import RendorChoseVendor from "@/components/mall/rendorChoseVendor";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setPathR } from "@/store/headerSlice";

interface GroupedVendors {
  gold: Vendors[];
  silver: Vendors[];
  raw: Vendors[];
}
function Page() {
  const dispatch = useDispatch();
  const [zoomInButton, setZoomInButton] = useState<boolean>(false);
  const [elev, setElev] = useState<boolean>(false);
  const [floor, setFloor] = useState<string>("gold");
  const [styledVendors, setStyledVendors] = useState<Vendors[]>([]);
  const [fromTo, setFromTo] = useState<{from: number, to: number}>({from: 0, to: 4})
  const searchParams = useSearchParams();
  const vendorId = searchParams.get('brand');

  const [groupedVendors, setGroupedVendors] = useState<GroupedVendors>({
    gold: [],
    silver: [],
    raw: []
  });

  /**
  const rawVendor = [
      {
        chosenShopStyle: "assets/shop/raw/industrial/1/",
        id: "1",
        spots: {},
        joinDate: ""
      }, 
      {
        id: "2",
        chosenShopStyle: "assets/shop/raw/cave/1/",
        spots: {},
        joinDate: ""
      }, 
      {
        id: "3",
        chosenShopStyle: "assets/shop/raw/cave/1/",
        spots: {},
        joinDate: ""
      }, 
      {
        id: "4",
        chosenShopStyle: "assets/shop/raw/industrial/1/",
        spots: {},
        joinDate: ""
      }
  ]
   */
  const {width, height} = useWindowDimensions();

  useEffect(() => {
    dispatch(setPathR('/mall'));
    const getVendors = async () => {
      const vendorsCollection = collection(firestore, 'vendors');

      // Query vendors with status 'approved'
      const q = query(vendorsCollection, where('status', '==', 'approved'));

      try {
        const querySnapshot = await getDocs(q);

        // Map the documents and include the id
        const vendors: Vendors[] = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }) as Vendors)
          // Filter out vendors with null chosenShopStyle
          .filter(vendor => vendor.chosenShopStyle !== null);

        // Group vendors by chosenShopStyle
        const groupedVendors = vendors.reduce((acc, vendor) => {
          const style = vendor.chosenShopStyle?.split('/')[2]; // Extract style part (gold/silver/raw)
          if (style === 'gold') {
            acc.gold.push(vendor);
          } else if (style === 'silver') {
            acc.silver.push(vendor);
          } else if (style === 'raw') {
            acc.raw.push();
          }
          return acc;
        }, { gold: [], silver: [], raw: [] } as GroupedVendors);

        // Sort each group by joinDate (assuming it's a timestamp)
        const sortByJoinDate = (vendors: Vendors[]) => {
          return vendors.sort((a, b) => a.joinDate.seconds - b.joinDate.seconds);
        };

        // Apply sorting to each group
        groupedVendors.gold = sortByJoinDate(groupedVendors.gold);
        groupedVendors.silver = sortByJoinDate(groupedVendors.silver);
        groupedVendors.raw = sortByJoinDate(groupedVendors.raw);

        // Set the state for each vendor group
        setStyledVendors(vendors); // Set all vendors if needed
        //groupedVendors.raw = rawVendor;
        setGroupedVendors(groupedVendors);

      } catch (error) {
        console.error("Error fetching vendors: ", error);
      }
    };

    getVendors();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const p1VendorCategories: Array<keyof GroupedVendors> = ['gold', 'silver', 'raw'];
  const p2VendorCategories: Array<keyof GroupedVendors> = ['gold', 'silver', 'raw'];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vendorImages: any = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vendorImages2: any = {};

  // Function to determine the correct corridor image based on two vendors
  const getCorridorImage = (vendor1Style: string, vendor2Style: string): string => {
    if (vendor1Style === 'cave' && vendor2Style === 'industrial') {
      return `/images/mall/perspective1/raw/C-I.jpeg`;
    } else if (vendor1Style === 'industrial' && vendor2Style === 'cave') {
      return `/images/mall/perspective1/raw/I-C.jpeg`;
    } else if (vendor1Style === 'cave' && vendor2Style === 'cave') {
      return `/images/mall/perspective1/raw/C-C.jpeg`;
    } else if (vendor1Style === 'industrial' && vendor2Style === 'industrial') {
      return `/images/mall/perspective1/raw/I-I.jpeg`;
    }
    return '/images/mall/perspective1/raw/C-I.jpeg'; // Default if none match
  };
  // Function to determine the correct corridor image based on two vendors
  const getCorridorImageP2 = (vendorStyle: string): string => {
    if (vendorStyle === 'cave') {
      return `/images/mall/perspective2/raw/c.jpeg`;
    } else if (vendorStyle === 'industrial') {
      return `/images/mall/perspective2/raw/i.jpeg`;
    }    
    return '/images/mall/perspective2/raw/i.jpeg'; // Default if none match
  };


  p1VendorCategories.forEach((category) => {
    if (groupedVendors[category]) {
    if (category === 'raw') {
      // Initialize the vendorImages[category] object if it doesn't already exist
      if (!vendorImages[category]) {
        vendorImages[category] = {
          corridor1: "/images/mall/perspective1/raw/I-C.jpeg", // Assign the corridor path
        };
      }

      // Loop through vendors in pairs (i.e., vendors 1-2, 3-4, etc.)
      for (let i = 0; i < groupedVendors[category].length; i += 2) {
        // Get the styles of the current pair of vendors
        const vendor1Style = groupedVendors[category][i]?.chosenShopStyle.split('/')[3];
        const vendor2Style = groupedVendors[category][i + 1]?.chosenShopStyle.split('/')[3];

        // Compute the correct corridor image for the current pair
        const corridorImage = getCorridorImage(vendor1Style, vendor2Style);

        // Set the corridor image only once (or keep updating if needed for every pair)
        vendorImages[category][`corridor${i / 2 + 1}`] = corridorImage;

        // Assign images for the first vendor in the pair (vendor1)
        const vendor1 = groupedVendors[category][i];
        const shopStyle1 = vendor1?.chosenShopStyle.split('/')[3];
        const shopFloor1 = vendor1?.chosenShopStyle.split('/')[2];

        // Assign vendor1 to its respective index
        vendorImages[category][`vendor${i + 1}`] = {
          vendor: vendor1,
          frontView: `/images/mall/interior/${shopFloor1}/${shopStyle1}/front.jpeg`,
          rightView: `/images/mall/interior/${shopFloor1}/${shopStyle1}/right.jpeg`,
          leftView: `/images/mall/interior/${shopFloor1}/${shopStyle1}/left.jpeg`,
          middleView: `/images/mall/interior/${shopFloor1}/${shopStyle1}/middle.jpeg`,
          endView: `/images/mall/interior/${shopFloor1}/${shopStyle1}/end.jpeg`,
          banner: vendor1.spots[`${vendor1.chosenShopStyle}2.jpg`]?.[0].image,
        };

        // Assign images for the second vendor in the pair (vendor2)
        const vendor2 = groupedVendors[category][i + 1];
        const shopStyle2 = vendor2?.chosenShopStyle.split('/')[3];
        const shopFloor2 = vendor2?.chosenShopStyle.split('/')[2];

        // Assign vendor2 to its respective index
        vendorImages[category][`vendor${i + 2}`] = {
          vendor: vendor2,
          frontView: `/images/mall/interior/${shopFloor2}/${shopStyle2}/front.jpeg`,
          rightView: `/images/mall/interior/${shopFloor2}/${shopStyle2}/right.jpeg`,
          leftView: `/images/mall/interior/${shopFloor2}/${shopStyle2}/left.jpeg`,
          middleView: `/images/mall/interior/${shopFloor2}/${shopStyle2}/middle.jpeg`,
          endView: `/images/mall/interior/${shopFloor2}/${shopStyle2}/end.jpeg`,
          banner: vendor2.spots[`${vendor2.chosenShopStyle}2.jpg`]?.[0].image,
        };
      }

      } else {
        // Logic for 'gold' and 'silver' remains the same
        const corridorPathMap: Record<string, string> = {
          gold: `/images/mall/perspective1/gold/corridor.jpeg`,
          silver: `/images/mall/perspective1/silver/corridor.jpeg`,
        };

        vendorImages[category] = {
          corridor: corridorPathMap[category], // Assign the corridor path
          vendor1: { mallView: `/images/mall/perspective1/${floor}/classic1.png` },
          vendor2: { mallView: `/images/mall/perspective1/${floor}/classic2.png` },
          vendor3: { mallView: `/images/mall/perspective1/${floor}/classic3.png` },
          vendor4: { mallView: `/images/mall/perspective1/${floor}/classic4.png` },
        };

        groupedVendors[category].forEach((vendor: Vendors, index: number) => {
          const shopStyle = vendor.chosenShopStyle.split('/')[3];
          const shopFloor = vendor.chosenShopStyle.split('/')[2];
          const viewIndex = (index % 4) + 1;

          vendorImages[category][`vendor${index + 1}`] = {
            vendor: vendor,
            mallView: `/images/mall/perspective1/${shopFloor}/${shopStyle}${viewIndex}.png`,
            frontView: `/images/mall/interior/${shopFloor}/${shopStyle}/front.jpeg`,
            rightView: `/images/mall/interior/${shopFloor}/${shopStyle}/right.jpeg`,
            leftView: `/images/mall/interior/${shopFloor}/${shopStyle}/left.jpeg`,
            middleView: `/images/mall/interior/${shopFloor}/${shopStyle}/middle.jpeg`,
            endView: `/images/mall/interior/${shopFloor}/${shopStyle}/end.jpeg`,
            banner: vendor.spots[`${vendor.chosenShopStyle}2.jpg`]?.[0].image,
          };
        });
      }
    }
  });

  p2VendorCategories.forEach((category) => {
    if (groupedVendors[category]) {
      if (category === 'raw') {
        // Initialize the vendorImages[category] object if it doesn't already exist
        if (!vendorImages2[category]) {
          vendorImages2[category] = {
            corridor0: "/images/mall/perspective2/raw/c.jpeg", // Assign the corridor path
          };
        }

        // Loop through vendors in pairs (i.e., vendors 1-2, 3-4, etc.)
        for (let i = 0; i < groupedVendors[category].length; i += 2) {
          // Get the styles of the current pair of vendors
          const vendor2Style = groupedVendors[category][i + 1]?.chosenShopStyle.split('/')[3];

          // Compute the correct corridor image for the current pair
          const corridorImage = getCorridorImageP2(vendor2Style);

          // Set the corridor image only once (or keep updating if needed for every pair)
          vendorImages2[category][`corridor${i}`] = corridorImage;

          // Assign images for the first vendor in the pair (vendor1)
          const vendor = groupedVendors[category][i + 1];
          const shopStyle1 = vendor?.chosenShopStyle.split('/')[3];
          const shopFloor1 = vendor?.chosenShopStyle.split('/')[2];

          // Assign vendor to its respective index
          vendorImages2[category][`vendor${i + 2}`] = {
            vendor: vendor,
            frontView: `/images/mall/interior/${shopFloor1}/${shopStyle1}/front.jpeg`,
            rightView: `/images/mall/interior/${shopFloor1}/${shopStyle1}/right.jpeg`,
            leftView: `/images/mall/interior/${shopFloor1}/${shopStyle1}/left.jpeg`,
            middleView: `/images/mall/interior/${shopFloor1}/${shopStyle1}/middle.jpeg`,
            endView: `/images/mall/interior/${shopFloor1}/${shopStyle1}/end.jpeg`,
            banner: vendor.spots[`${vendor.chosenShopStyle}2.jpg`]?.[0].image,
          };
        }
      } else {
        // Logic for 'gold' and 'silver' remains the same
        const corridorPathMap: Record<string, string> = {
          gold: `/images/mall/perspective2/gold/corridor.jpeg`,
          silver: `/images/mall/perspective2/silver/corridor.jpeg`,
        };

        vendorImages2[category] = {
          corridor: corridorPathMap[category], // Dynamically assign the corridor path
          vendor3: { mallView: `/images/mall/perspective2/${floor}/classic1.png` },
          vendor4: { mallView: `/images/mall/perspective2/${floor}/classic2.png` },
        };

        groupedVendors[category].forEach((vendor: Vendors, index: number) => {
          const shopStyle = vendor.chosenShopStyle.split('/')[3];
          const shopFloor = vendor.chosenShopStyle.split('/')[2];
          // Reset index + 1 to cycle between 1 and 4
          const viewIndex = (index % 2) + 1;

          vendorImages2[category][`vendor${index + 1}`] = {
            vendor: vendor,
            mallView: `/images/mall/perspective2/${shopFloor}/${shopStyle}${viewIndex}.png`,
            frontView: `/images/mall/interior/${shopFloor}/${shopStyle}/front.jpeg`,
            rightView: `/images/mall/interior/${shopFloor}/${shopStyle}/right.jpeg`,
            leftView: `/images/mall/interior/${shopFloor}/${shopStyle}/left.jpeg`,
            middleView: `/images/mall/interior/${shopFloor}/${shopStyle}/middle.jpeg`,
            endView: `/images/mall/interior/${shopFloor}/${shopStyle}/end.jpeg`,
            banner: vendor.spots[`${vendor.chosenShopStyle}2.jpg`]?.[0].image,
          };
        });
      }
    }
  });

  if (styledVendors.length > 0) {
    return (
      <main
        className={`
          h-[100vh] w-[100vw]
          flex items-end
        `}
      >
        {/** Flip the Phone Componenet */}
        {
        height > width && 
        <div className="absolute w-full h-full z-20">
          <FlipPhone/>
        </div>
        }

        <div className={`
          fixed
          ${height < 450 && "z-30"}
        `} style={{
          height: height < 450 ? "100vh" : "calc(100vh - 80px)"
        }}>
          {
          <div className="h-full w-screen flex items-center justify-center">
            {vendorId ?
              <div className="w-full h-full flex items-center justify-center">
                <RendorChoseVendor
                  allVendors={vendorImages}
                />
              </div> :
              <div className="w-full h-full flex items-center justify-center">
                <Perspective1
                  fromTo={fromTo}
                  setFromTo={setFromTo}
                  zoomInButton={zoomInButton}
                  setZoomInButton={setZoomInButton}
                  setElev={setElev}
                  p1={vendorImages}
                  p2={vendorImages2}
                  floor={floor}
                />
                <Elevator
                  elev={elev}
                  setFromTo={setFromTo}
                  setElev={setElev}
                  setFloor={setFloor}
                  floor={floor}
                  zoomInButton={zoomInButton}
                  setZoomInButton={setZoomInButton}
                />
              </div>
            }
          </div>
          }
        </div>
      </main>
    );
  }
  return <Loading/> 
}

export default function WrappedPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Page />
    </Suspense>
  );
}