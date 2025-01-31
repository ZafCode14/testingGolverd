import Link from "next/link";
import Image from "next/image";
import AccountLogin from "./AccountLogin";
import Cart from "./Cart";
import Button from "./Button";

function Header() {
  return (
    <header
      className={`
        fixed top-0 z-30
        flex flex-col justify-center items-center
        md:flex-row md:justify-around
        h-[80px] w-full md:px-20
        bg-[#2A1C1B] text-white
      `}
    >
      <Link 
        href={"/"} 
        className={`
          relative
          top-2 md:top-0
          flex items-center justify-center
        `}
      >
        <Image
          src={"/icons/logo.png"}
          alt="logo"
          width={100}
          height={100}
          className={`
            h-[30px] md:h-[40px] lg:h-[60px] w-auto
            md:mx-3
          `}
        />
      </Link>
      <div className="flex items-center flex-1 justify-around w-full">
        <div className="flex flex-1 justify-around md:justify-center">
          <Button
            name='Homepage'
            path='/'
          />
          <Button
            name='Shop Now'
            path='/shop'
          />
          <Button
            name='Mall'
            path='/mall'
          />

          {/** Cart button */}
          <Cart/>
        </div>
        {/** Account / Sign up botton */}
        <AccountLogin/>
      </div>
    </header>
  );
}

export default Header;