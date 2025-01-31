import Image from "next/image";
import { useState } from "react";
import ProductPage from "../../product";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
}

function ClassicLeft({ vendor }: Props) {
  const shopStyle = vendor.vendor.chosenShopStyle;
  const floor = shopStyle.split('/')[2];
  const style = shopStyle.split('/')[3];
  const [productID, setProductID] = useState<string>("");
  const [showProduct, setShowProduct] = useState<boolean>(false);

  const commonStyle = `
    absolute
    flex flex-col justify-end
  `;
  const image0 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[0]?.image;
  const image1 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[1]?.image;
  const image2 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[2]?.image;
  const image3 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[3]?.image;
  const image4 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[4]?.image;
  const image5 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[5]?.image;

  const id0 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[0]?.productID;
  const id1 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[1]?.productID;
  const id2 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[2]?.productID;
  const id3 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[3]?.productID;
  const id4 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[4]?.productID;
  const id5 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[5]?.productID;

  return (
    <div className="h-full w-full absolute top-0 right-0">
      <Image
        src={`/images/mall/arrows/${floor}/${style}/Left.png`}
        alt="item"
        width={800}
        height={800}
        className="object-cover w-full absolute"
      />
      {/** Position 1 */}
      <div
        className={`${commonStyle} bottom-[19vw] left-[20vw] w-[8vw] h-[12vw] z-20`}
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
        className={`${commonStyle} bottom-[19vw] left-[29vw] w-[8vw] h-[12vw] z-20`}
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
        className={`${commonStyle} bottom-[19vw] left-[40vw] w-[8vw] h-[12vw] z-20`}
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
        className={`${commonStyle} bottom-[19vw] left-[49vw] w-[8vw] h-[12vw] z-20`}
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
        className={`${commonStyle} bottom-[19vw] left-[60vw] w-[8vw] h-[12vw] z-20`}
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
        className={`${commonStyle} bottom-[19vw] left-[69vw] w-[8vw] h-[12vw] z-20`}
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

export default ClassicLeft;