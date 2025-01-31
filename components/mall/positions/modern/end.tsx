import Image from "next/image";
import ProductPage from "../../product";
import { useState } from "react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
}

function ModernEnd({ vendor }: Props) {
  const shopStyle = vendor.vendor.chosenShopStyle;
  const floor = shopStyle.split('/')[2];
  const style = shopStyle.split('/')[3];
  const [showProduct, setShowProduct] = useState<boolean>(false);
  const [productID, setProductID] = useState<string>("");

  const commonStyle = `
    absolute
    flex items-end
  `;

  const images = [
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[0]?.image,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[1]?.image,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[2]?.image,

    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[9]?.image,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[10]?.image,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[11]?.image,

    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[3]?.image,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[4]?.image,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[5]?.image,

    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[12]?.image,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[13]?.image,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[14]?.image,

    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[4]?.image,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[7]?.image,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[8]?.image,

    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[15]?.image,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[16]?.image,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[17]?.image,
  ];

  const id = [
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[0]?.productID,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[1]?.productID,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[2]?.productID,

    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[9]?.productID,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[10]?.productID,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[11]?.productID,

    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[3]?.productID,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[4]?.productID,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[5]?.productID,

    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[12]?.productID,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[13]?.productID,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[14]?.productID,

    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[4]?.productID,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[7]?.productID,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[8]?.productID,

    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[15]?.productID,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[16]?.productID,
    vendor.vendor.spots[`${shopStyle}center.jpg`]?.[17]?.productID,
  ];

  return (
    <div className="h-full w-full absolute top-0 right-0">
      <Image
        src={`/images/mall/arrows/${floor}/${style}/Center.png`}
        alt="item"
        width={800}
        height={800}
        className="object-cover w-full absolute"
      />
      {/** Left Set */}
      {/** Position 1 */}
      <div className={`${commonStyle} bottom-[22vw] left-[4vw] w-[6vw] h-[9vw] z-20`}
        onClick={() => {
          setProductID(id[0]);
          setShowProduct(true);
        }}
      >
        {images[0] && (
          <Image
            src={images[0]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 2 */}
      <div className={`${commonStyle} bottom-[22vw] left-[11.5vw] w-[6vw] h-[9vw] z-20`}
        onClick={() => {
          setProductID(id[1]);
          setShowProduct(true);
        }}
      >
        {images[1] && (
          <Image
            src={images[1]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 3 */}
      <div className={`${commonStyle} bottom-[22vw] left-[19vw] w-[6vw] h-[9vw] z-20`}
        onClick={() => {
          setProductID(id[2]);
          setShowProduct(true);
        }}
      >
        {images[2] && (
          <Image
            src={images[2]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 4 */}
      <div className={`${commonStyle} bottom-[12vw] left-[4vw] w-[6vw] h-[9vw] z-20`}
        onClick={() => {
          setProductID(id[3]);
          setShowProduct(true);
        }}
      >
        {images[3] && (
          <Image
            src={images[3]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 5 */}
      <div className={`${commonStyle} bottom-[12vw] left-[11.5vw] w-[6vw] h-[9vw] z-20`}
        onClick={() => {
          setProductID(id[4]);
          setShowProduct(true);
        }}
      >
        {images[4] && (
          <Image
            src={images[4]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 6 */}
      <div className={`${commonStyle} bottom-[12vw] left-[19vw] w-[6vw] h-[9vw] z-20`}
        onClick={() => {
          setProductID(id[5]);
          setShowProduct(true);
        }}
      >
        {images[5] && (
          <Image
            src={images[5]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Middle Set */}
      {/** Position 7 */}
      <div className={`${commonStyle} bottom-[22vw] left-[41vw] w-[6vw] h-[9vw] z-20`}
        onClick={() => {
          setProductID(id[6]);
          setShowProduct(true);
        }}
      >
        {images[6] && (
          <Image
            src={images[6]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 8 */}
      <div className={`${commonStyle} bottom-[22vw] left-[48vw] w-[6vw] h-[9vw] z-20`}
        onClick={() => {
          setProductID(id[7]);
          setShowProduct(true);
        }}
      >
        {images[7] && (
          <Image
            src={images[7]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 9 */}
      <div className={`${commonStyle} bottom-[22vw] left-[55vw] w-[6vw] h-[9vw] z-20`}
        onClick={() => {
          setProductID(id[8]);
          setShowProduct(true);
        }}
      >
        {images[8] && (
          <Image
            src={images[8]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 10 */}
      <div className={`${commonStyle} bottom-[12vw] left-[41vw] w-[6vw] h-[9vw] z-20`}
        onClick={() => {
          setProductID(id[9]);
          setShowProduct(true);
        }}
      >
        {images[9] && (
          <Image
            src={images[9]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 11 */}
      <div className={`${commonStyle} bottom-[12vw] left-[48vw] w-[6vw] h-[9vw] z-20`}
        onClick={() => {
          setProductID(id[10]);
          setShowProduct(true);
        }}
      >
        {images[10] && (
          <Image
            src={images[10]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 12 */}
      <div className={`${commonStyle} bottom-[12vw] left-[55vw] w-[6vw] h-[9vw] z-20`}
        onClick={() => {
          setProductID(id[11]);
          setShowProduct(true);
        }}
      >
        {images[11] && (
          <Image
            src={images[11]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Right Set */}
      {/** Position 13 */}
      <div className={`${commonStyle} bottom-[22vw] left-[73vw] w-[6vw] h-[9vw] z-20`}
        onClick={() => {
          setProductID(id[12]);
          setShowProduct(true);
        }}
      >
        {images[12] && (
          <Image
            src={images[12]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 14 */}
      <div className={`${commonStyle} bottom-[22vw] left-[80.5vw] w-[6vw] h-[9vw] z-20`}
        onClick={() => {
          setProductID(id[13]);
          setShowProduct(true);
        }}
      >
        {images[13] && (
          <Image
            src={images[13]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 15 */}
      <div className={`${commonStyle} bottom-[22vw] left-[88vw] w-[6vw] h-[9vw] z-20`}
        onClick={() => {
          setProductID(id[14]);
          setShowProduct(true);
        }}
      >
        {images[14] && (
          <Image
            src={images[14]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 16 */}
      <div className={`${commonStyle} bottom-[12vw] left-[73vw] w-[6vw] h-[9vw] z-20`}
        onClick={() => {
          setProductID(id[15]);
          setShowProduct(true);
        }}
      >
        {images[15] && (
          <Image
            src={images[15]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 17 */}
      <div className={`${commonStyle} bottom-[12vw] left-[80.5vw] w-[6vw] h-[9vw] z-20`}
        onClick={() => {
          setProductID(id[16]);
          setShowProduct(true);
        }}
      >
        {images[16] && (
          <Image
            src={images[16]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 18 */}
      <div className={`${commonStyle} bottom-[12vw] left-[88vw] w-[6vw] h-[9vw] z-20`}
        onClick={() => {
          setProductID(id[17]);
          setShowProduct(true);
        }}
      >
        {images[17] && (
          <Image
            src={images[17]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
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

export default ModernEnd;