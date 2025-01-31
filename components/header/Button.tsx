"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  name: string;
  path: string;
};

function Button({ name, path }: Props) {
  const currentPath = usePathname();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!currentPath) return;

    setIsActive(
      currentPath === path ||
      (path !== "/" && currentPath.startsWith(`${path}/`))
    );
  }, [currentPath, path]);

  return (
    <Link
      href={path}
      className={`
        sm:mx-5 
        text-[14px] md:text-[16px] 
        ${isActive ? "text-[#C4A153]" : ""}
      `}
    >
      {name}
    </Link>
  );
}

export default Button;