import Image from "next/image";
import { useState } from "react";
import ProductPage from "../../product";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
}

function IndustrialMiddle({ vendor }: Props) {
  const shopStyle = vendor.vendor.chosenShopStyle;
  const floor = shopStyle.split('/')[2];
  const style = shopStyle.split('/')[3];

  const [showProduct, setShowProduct] = useState<boolean>(false);
  const [productID, setProductID] = useState<string>("");

  const commonStyle = `
    absolute
    flex items-end
  `;

  const limage1 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[1]?.image;
  const limage2 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[2]?.image;
  const limage3 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[3]?.image;

  const lid1 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[1]?.productID;
  const lid2 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[2]?.productID;
  const lid3 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[3]?.productID;


  const rimage0 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[0]?.image;
  const rimage2 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[2]?.image;

  const rid0 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[0]?.productID;
  const rid2 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[2]?.productID;

  return (
    <div className="h-full w-full absolute top-0 right-0">
      <Image
        src={`/images/mall/arrows/${floor}/${style}/Establishing.png`}
        alt="item"
        width={800}
        height={800}
        className="object-cover w-full h-full absolute"
      />
      {/** Position 1 */}
      <div
        className={`${commonStyle} bottom-[19vw] left-[3.5vw] w-[5vw] h-[10vw] z-20`}
        onClick={() => {
          setProductID(lid1);
          setShowProduct(true);
        }}
      >
        {limage1 && (
          <Image
            src={limage1}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 2 */}
      <div
        className={`${commonStyle} bottom-[19vw] left-[9vw] w-[4vw] h-[9vw] z-20`}
        onClick={() => {
          setProductID(lid2);
          setShowProduct(true);
        }}
      >
        {limage2 && (
          <Image
            src={limage2}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 3 */}
      <div
        className={`${commonStyle} bottom-[19.5vw] left-[13.5vw] w-[4vw] h-[8vw] z-20`}
        onClick={() => {
          setProductID(lid3);
          setShowProduct(true);
        }}
      >
        {limage3 && (
          <Image
            src={limage3}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 1 */}
      <div
        className={`${commonStyle} bottom-[31.5vw] right-[0vw] w-[5vw] h-[8.5vw] z-20`}
        onClick={() => {
          setProductID(rid0);
          setShowProduct(true);
        }}
      >
        {rimage0 && (
          <Image
            src={rimage0}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 2 */}
      <div
        className={`${commonStyle} bottom-[24vw] right-[0vw] w-[5vw] h-[6vw] z-20`}
        onClick={() => {
          setProductID(rid2);
          setShowProduct(true);
        }}
      >
        {rimage2 && (
          <Image
            src={rimage2}
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

export default IndustrialMiddle;