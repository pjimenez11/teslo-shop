import { titleFont } from "@/config/fonts";
import Link from "next/link";

export const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[650px] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={`${titleFont.className} antialiased text-8xl`}>404</h2>
        <p className="font-semibold text-6xl">Whoops! Lo sentimos mucho.</p>
        <p className="font-light">
            <span>Puedes regresar al </span>
            <Link href="/" className="font-normal hover:underline transition-all">
                Inicio
            </Link>
        </p>
      </div>
    </div>
  );
};
