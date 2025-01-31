import Image from "next/image";
import { useState } from "react";
import ProductPage from "../../product";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
}

function ModernLeft({ vendor }: Props) {
  const [productID, setProductID] = useState<string>("");
  const [showProduct, setShowProduct] = useState<boolean>(false);
  const shopStyle = vendor.vendor.chosenShopStyle;
  const floor = shopStyle.split('/')[2];
  const style = shopStyle.split('/')[3];

  const commonStyle = `
    absolute
    flex flex-col justify-end
  `;
  const image0 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[4]?.image;
  const image1 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[3]?.image;
  const image2 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[2]?.image;
  const image3 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[1]?.image;
  const image4 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[0]?.image;

  const bimage0 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[0]?.image;
  const bimage1 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[1]?.image;
  const bimage2 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[2]?.image;
  const bimage3 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[9]?.image;
  const bimage4 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[10]?.image;
  const bimage5 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[11]?.image;

  const id0 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[4]?.productID;
  const id1 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[3]?.productID;
  const id2 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[2]?.productID;
  const id3 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[1]?.productID;
  const id4 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[0]?.productID;

  const bid0 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[0]?.productID;
  const bid1 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[1]?.productID;
  const bid2 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[2]?.productID;
  const bid3 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[9]?.productID;
  const bid4 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[10]?.productID;
  const bid5 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[11]?.productID;
  return (
    <div className="h-full w-full absolute top-0 right-0">
      <Image
        src={`/images/mall/arrows/${floor}/${style}/Left.png`}
        alt="item"
        width={800}
        height={800}
        className="object-cover w-full absolute"
      />
      {/** End left Set */}
      {/** Position 1 */}
      <div className={`${commonStyle} bottom-[30vw] left-[60vw] w-[6vw] h-[8vw] z-20`}
        onClick={() => {
          setProductID(bid0);
          setShowProduct(true);
        }}
      >
        {bimage0 && (
          <Image
            src={bimage0}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 2 */}
      <div className={`${commonStyle} bottom-[30vw] left-[67vw] w-[6vw] h-[8vw] z-20`}
        onClick={() => {
          setProductID(bid1);
          setShowProduct(true);
        }}
      >
        {bimage1 && (
          <Image
            src={bimage1}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 3 */}
      <div className={`${commonStyle} bottom-[30vw] left-[74vw] w-[6vw] h-[8vw] z-20`}
        onClick={() => {
          setProductID(bid2);
          setShowProduct(true);
        }}
      >
        {bimage2 && (
          <Image
            src={bimage2}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 4 */}
      <div className={`${commonStyle} bottom-[22vw] left-[60vw] w-[6vw] h-[8vw] z-20`}
        onClick={() => {
          setProductID(bid3);
          setShowProduct(true);
        }}
      >
        {bimage3 && (
          <Image
            src={bimage3}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 5 */}
      <div className={`${commonStyle} bottom-[21.5vw] left-[67vw] w-[6vw] h-[8vw] z-20`}
        onClick={() => {
          setProductID(bid4);
          setShowProduct(true);
        }}
      >
        {bimage4 && (
          <Image
            src={bimage4}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 6 */}
      <div className={`${commonStyle} bottom-[21vw] left-[74vw] w-[6vw] h-[8.5vw] z-20`}
        onClick={() => {
          setProductID(bid5);
          setShowProduct(true);
        }}
      >
        {bimage5 && (
          <Image
            src={bimage5}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>


      {/** Position 1 */}
      <div
        className={`${commonStyle} bottom-[20vw] left-[58vw] w-[7vw] h-[9vw] z-20`}
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
        className={`${commonStyle} bottom-[20.8vw] left-[51.5vw] w-[6vw] h-[8.3vw] z-20`}
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
        className={`${commonStyle} bottom-[21.5vw] left-[45.5vw] w-[5vw] h-[7.5vw] z-20`}
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
        className={`${commonStyle} bottom-[22vw] left-[23.5vw] w-[10vw] h-[18vw] z-20`}
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
        className={`${commonStyle} bottom-[20.5vw] left-[12vw] w-[10vw] h-[20vw] z-20`}
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

export default ModernLeft;