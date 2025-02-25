import clsx from "clsx";
import {Factory} from "lucide-react";
import Image from "next/image";

export default function LogoSquare({logo, size}: {logo: string; size?: "sm" | undefined}) {
  return (
    <div
      className={clsx(
        "flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black",
        {
          "h-[40px] w-[40px] rounded-xl": !size,
          "h-[30px] w-[30px] rounded-lg": size === "sm",
        },
      )}
    >
      {logo ? (
        <Image alt="Logo" height={24} src={logo} width={24} />
      ) : (
        <Factory className="h-[24px] w-[24px]" />
      )}
    </div>
  );
}
