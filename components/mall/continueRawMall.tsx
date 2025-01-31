import Image from "next/image";

function ContinueRawMall() {
  return (
    <div className="relative w-full h-full">
      <Image
        src={`/images/mall/perspective1/raw/C-I.jpeg`}
        alt="floor plan"
        width={3000}
        height={3000}
        priority
        className="absolute w-full object-cover"
      />
    </div>
  );
}

export default ContinueRawMall;