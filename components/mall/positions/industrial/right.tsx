import Image from "next/image";
import { useState } from "react";
import ProductPage from "../../product";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
}

function IndustrialRight({ vendor }: Props) {
  const shopStyle = vendor.vendor.chosenShopStyle;
  const floor = shopStyle.split('/')[2];
  const style = shopStyle.split('/')[3];
  const [productID, setProductID] = useState<string>("");
  const [showProduct, setShowProduct] = useState<boolean>(false);

  const commonStyle = `
    absolute
    flex items-end
    w-[5vw] h-[5vw]
  `;

  const image0 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[0]?.image;
  const image1 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[1]?.image;
  const image2 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[2]?.image;
  const image3 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[3]?.image;

  const fimage4 = vendor.vendor.spots[`${shopStyle}front.jpg`]?.[4]?.image;
  const fimage5 = vendor.vendor.spots[`${shopStyle}front.jpg`]?.[5]?.image;

  const id0 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[0]?.productID;
  const id1 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[1]?.productID;
  const id2 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[2]?.productID;
  const id3 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[3]?.productID;

  const fid4 = vendor.vendor.spots[`${shopStyle}front.jpg`]?.[4]?.productID;
  const fid5 = vendor.vendor.spots[`${shopStyle}front.jpg`]?.[5]?.productID;

  return (
    <div className="h-full w-full absolute top-0 right-0">
      <Image
        src={`/images/mall/arrows/${floor}/${style}/Right.png`}
        alt="item"
        width={800}
        height={800}
        className="object-cover w-full h-full absolute"
      />
      {/** Position 1 */}
      <div
        className={`${commonStyle} bottom-[30vw] left-[47.5vw] z-20`}
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
        className={`${commonStyle} bottom-[30vw] left-[55.5vw] z-20`}
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
        className={`${commonStyle} bottom-[23.5vw] left-[47.5vw] z-20`}
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
        className={`${commonStyle} bottom-[23.5vw] left-[55.5vw] z-20`}
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
        style={{
          width: "7vw",
          height: "11vw"
        }}
        className={`${commonStyle} bottom-[15vw] right-[1vw] z-20`}
        onClick={() => {
          setProductID(fid4);
          setShowProduct(true);
        }}
      >
        {fimage4 && (
          <Image
            src={fimage4}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 6 */}
      <div style={{
        width: "7vw",
        height: "11vw"
      }}
        className={`${commonStyle} bottom-[15vw] right-[11vw] z-20`}
        onClick={() => {
          setProductID(fid5);
          setShowProduct(true);
        }}
      >
        {fimage5 && (
          <Image
            src={fimage5}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {productID && (
        <div
          onClick={() => setShowProduct(false)}
          className="w-full h-full flex justify-center items-center absolute z-40"
          style={{
            pointerEvents: showProduct ? "auto" : "none",
            opacity: showProduct ? "1" : "0",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[800px] h-[80vh] bg-[#eee] z-50 p-4 flex items-center justify-center"
          >
            <ProductPage productId={productID} setShowProduct={setShowProduct}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default IndustrialRight;