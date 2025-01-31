"use client"
import Image from "next/image";

function Spinner() {
  return (
    <div className="flex justify-center items-center mt-32">
      <div className="loading-spinner">
        <Image
          src={'/icons/logo.png'}
          alt="logo spinner"
          width={300}
          height={300}
          className="h-[70px] w-auto"
          priority
        />
      </div>
      <style jsx>{`
        .loading-spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default Spinner;