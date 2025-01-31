import Image from "next/image";
import ProductPage from "../../product";
import { useState } from "react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
}

function CaveEnd({ vendor }: Props) {
  const [showProduct, setShowProduct] = useState<boolean>(false);
  const [productID, setProductID] = useState<string>("");
  const shopStyle = vendor.vendor.chosenShopStyle;
  const floor = shopStyle.split('/')[2];
  const style = shopStyle.split('/')[3];

  const commonStyle = `
    absolute
    flex items-end
    w-[7vw] h-[10.5vw]
  `;

  const image0 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[0]?.image;

  const image1 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[1]?.image;
  const image2 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[2]?.image;
  const image3 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[3]?.image;

  const image4 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[4]?.image;
  const image5 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[5]?.image;
  const image6 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[6]?.image;

  const image7 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[7]?.image;


  const id0 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[0]?.productID;

  const id1 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[1]?.productID;
  const id2 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[2]?.productID;
  const id3 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[3]?.productID;
  
  const id4 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[4]?.productID;
  const id5 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[5]?.productID;
  const id6 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[6]?.productID;

  const id7 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[7]?.productID;

  return (
    <div className="h-full w-full absolute top-0 right-0">
      <Image
        src={`/images/mall/arrows/${floor}/${style}/Center.png`}
        alt="item"
        width={800}
        height={800}
        className="object-cover w-full h-full absolute"
      />
      {/** Position 1 */}
      <div
        className={`${commonStyle} bottom-[24vw] left-[0.5vw] z-20`}
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
        className={`${commonStyle} bottom-[34vw] left-[33vw] z-20`}
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
        className={`${commonStyle} bottom-[34vw] left-[44vw] z-20`}
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
        className={`${commonStyle} bottom-[34vw] left-[55vw] z-20`}
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
        className={`${commonStyle} bottom-[21.5vw] left-[33vw] z-20`}
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
        className={`${commonStyle} bottom-[21.5vw] left-[44vw] z-20`}
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

      {/** Position 7 */}
      <div
        className={`${commonStyle} bottom-[21.5vw] left-[55vw] z-20`}
        onClick={() => {
          setProductID(id6);
          setShowProduct(true);
        }}
      >
        {image6 && (
          <Image
            src={image6}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 8 */}
      <div
        className={`${commonStyle} bottom-[24vw] right-[5vw] z-20`}
        onClick={() => {
          setProductID(id7);
          setShowProduct(true);
        }}
      >
        {image7 && (
          <Image
            src={image7}
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

export default CaveEnd;