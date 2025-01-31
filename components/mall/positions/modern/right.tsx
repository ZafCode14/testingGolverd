import Image from "next/image";
import { useState } from "react";
import ProductPage from "../../product";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
}

function ModernRight({ vendor }: Props) {
  const shopStyle = vendor.vendor.chosenShopStyle;
  const floor = shopStyle.split('/')[2];
  const style = shopStyle.split('/')[3];
  const [productID, setProductID] = useState<string>("");
  const [showProduct, setShowProduct] = useState<boolean>(false);

  const commonStyle = `
    absolute
    flex items-end
  `;

  const image0 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[0]?.image;
  const image1 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[1]?.image;
  const image2 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[2]?.image;
  const image3 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[3]?.image;
  const image4 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[4]?.image;

  const bimage12 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[6]?.image;
  const bimage13 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[7]?.image;
  const bimage14 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[8]?.image;
  const bimage15 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[15]?.image;
  const bimage16 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[16]?.image;
  const bimage17 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[17]?.image;

  const id0 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[0]?.productID;
  const id1 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[1]?.productID;
  const id2 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[2]?.productID;
  const id3 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[3]?.productID;
  const id4 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[4]?.productID;

  const id12 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[6]?.productID;
  const id13 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[7]?.productID;
  const id14 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[8]?.productID;
  const id15 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[15]?.productID;
  const id16 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[16]?.productID;
  const id17 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[17]?.productID;

  return (
    <div className="h-full w-full absolute top-0 right-0">
      <Image
        src={`/images/mall/arrows/${floor}/${style}/Right.png`}
        alt="item"
        width={800}
        height={800}
        className="object-cover w-full absolute"
      />
      {/** Back Right Set */}
      {/** Position 13 */}
      <div className={`${commonStyle} bottom-[25vw] left-[0vw] w-[7vw] h-[10vw] z-20`} onClick={() => { setProductID(id12); setShowProduct(true); }}>
        {bimage12 && (
          <Image
            src={bimage12}
            alt="item"
            width={200}
            height={200}
            className="object-cover w-full"
          />
        )}
      </div>

      {/** Position 14 */}
      <div className={`${commonStyle} bottom-[25vw] left-[8vw] w-[7vw] h-[10vw] z-20`} onClick={() => { setProductID(id13); setShowProduct(true); }}>
        {bimage13 && (
          <Image
            src={bimage13}
            alt="item"
            width={200}
            height={200}
            className="object-cover w-full"
          />
        )}
      </div>

      {/** Position 15 */}
      <div className={`${commonStyle} bottom-[25vw] left-[16vw] w-[7vw] h-[10vw] z-20`} onClick={() => { setProductID(id14); setShowProduct(true); }}>
        {bimage14 && (
          <Image
            src={bimage14}
            alt="item"
            width={200}
            height={200}
            className="object-cover w-full"
          />
        )}
      </div>

      {/** Position 16 */}
      <div className={`${commonStyle} bottom-[13vw] left-[0vw] w-[7vw] h-[10vw] z-20`} onClick={() => { setProductID(id15); setShowProduct(true); }}>
        {bimage15 && (
          <Image
            src={bimage15}
            alt="item"
            width={200}
            height={200}
            className="object-cover w-full"
          />
        )}
      </div>

      {/** Position 17 */}
      <div className={`${commonStyle} bottom-[14vw] left-[8vw] w-[7vw] h-[10vw] z-20`} onClick={() => { setProductID(id16); setShowProduct(true); }}>
        {bimage16 && (
          <Image
            src={bimage16}
            alt="item"
            width={200}
            height={200}
            className="object-cover w-full"
          />
        )}
      </div>

      {/** Position 18 */}
      <div className={`${commonStyle} bottom-[15vw] left-[16vw] w-[7vw] h-[10vw] z-20`} onClick={() => { setProductID(id17); setShowProduct(true); }}>
        {bimage17 && (
          <Image
            src={bimage17}
            alt="item"
            width={200}
            height={200}
            className="object-cover w-full"
          />
        )}
      </div>

      {/** Front Right Set */}
      {/** Position 1 */}
      <div className={`${commonStyle} bottom-[12vw] left-[19vw] w-[9vw] h-[12vw] z-20`} onClick={() => { setProductID(id0); setShowProduct(true); }}>
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
      <div className={`${commonStyle} bottom-[14vw] left-[28.5vw] w-[7vw] h-[10vw] z-20`} onClick={() => { setProductID(id1); setShowProduct(true); }}>
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
      <div className={`${commonStyle} bottom-[15.3vw] left-[37vw] w-[6vw] h-[9vw] z-20`} onClick={() => { setProductID(id2); setShowProduct(true); }}>
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
      <div className={`${commonStyle} bottom-[16.5vw] right-[33vw] w-[10vw] h-[15vw] z-20`} onClick={() => { setProductID(id3); setShowProduct(true); }}>
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
      <div className={`${commonStyle} bottom-[15.5vw] right-[22.7vw] w-[10vw] h-[15vw] z-20`} onClick={() => { setProductID(id4); setShowProduct(true); }}>
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

export default ModernRight;