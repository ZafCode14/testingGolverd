import Image from "next/image";
import ProductPage from "../../product";
import { useState } from "react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
}

function ClassicCenter({ vendor }: Props) {
  const shopStyle = vendor.vendor.chosenShopStyle;
  const [showProduct, setShowProduct] = useState<boolean>(false);
  const [productID, setProductID] = useState<string>("");

  const commonStyle = `
    absolute
    flex items-end
   
  `;

  const image0 = vendor.vendor.spots[`${shopStyle}3.jpg`]?.[3]?.image; 
  const image1 = vendor.vendor.spots[`${shopStyle}3.jpg`]?.[0]?.image;
  const image2 = vendor.vendor.spots[`${shopStyle}3.jpg`]?.[4]?.image;
  const image3 = vendor.vendor.spots[`${shopStyle}3.jpg`]?.[1]?.image;
  const image4 = vendor.vendor.spots[`${shopStyle}3.jpg`]?.[5]?.image;
  const image5 = vendor.vendor.spots[`${shopStyle}3.jpg`]?.[2]?.image;

  const id0 = vendor.vendor.spots[`${shopStyle}3.jpg`]?.[3]?.productID;
  const id1 = vendor.vendor.spots[`${shopStyle}3.jpg`]?.[0]?.productID;
  const id2 = vendor.vendor.spots[`${shopStyle}3.jpg`]?.[4]?.productID;
  const id3 = vendor.vendor.spots[`${shopStyle}3.jpg`]?.[1]?.productID;
  const id4 = vendor.vendor.spots[`${shopStyle}3.jpg`]?.[5]?.productID;
  const id5 = vendor.vendor.spots[`${shopStyle}3.jpg`]?.[2]?.productID;

  return (
    <div className="h-full w-full absolute top-0 right-0">
      {/** Position 1 */}
      <div
        className={`${commonStyle} bottom-[15vw] left-[35vw] w-[7vw] h-[11vw] z-20`}
        onClick={() => {
          setProductID(id0);
          setShowProduct(true);
        }}
      >
        {image0 && (
          <Image
            src={image0}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 2 */}
      <div
        className={`${commonStyle} bottom-[27vw] left-[37.5vw] w-[6vw] h-[10vw] z-20`}
        onClick={() => {
          setProductID(id1);
          setShowProduct(true);
        }}
      >
        {image1 && (
          <Image
            src={image1}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 3 */}
      <div
        className={`${commonStyle} bottom-[15vw] left-[46vw] w-[7vw] h-[11vw] z-20`}
        onClick={() => {
          setProductID(id2);
          setShowProduct(true);
        }}
      >
        {image2 && (
          <Image
            src={image2}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 4 */}
      <div
        className={`${commonStyle} bottom-[27vw] left-[46.5vw] w-[6vw] h-[10vw] z-20`}
        onClick={() => {
          setProductID(id3);
          setShowProduct(true);
        }}
      >
        {image3 && (
          <Image
            src={image3}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 5 */}
      <div
        className={`${commonStyle} bottom-[15vw] left-[57vw] w-[7vw] h-[11vw] z-20`}
        onClick={() => {
          setProductID(id4);
          setShowProduct(true);
        }}
      >
        {image4 && (
          <Image
            src={image4}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 6 */}
      <div
        className={`${commonStyle} bottom-[27vw] left-[55vw] w-[6vw] h-[10vw] z-20`}
        onClick={() => {
          setProductID(id5);
          setShowProduct(true);
        }}
      >
        {image5 && (
          <Image
            src={image5}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {productID &&
        <div onClick={() => setShowProduct(false)} className={`
          w-full h-full
          flex justify-center items-center
          absolute z-40
        `} style={{
          pointerEvents: showProduct ? "auto" : "none",
          opacity: showProduct ? "1" : "0",
        }}>
          <div onClick={(e) => e.stopPropagation()} className={`
            w-[800px] h-[500px]
            max-w-[90%] max-h-[90vh]
            bg-[white] rounded-md
          `} style={{
          }}>
            <ProductPage productId={productID} setShowProduct={setShowProduct}/>
          </div>
        </div>
      }
    </div>
  );
}

export default ClassicCenter;