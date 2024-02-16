import { titleFont } from "@/config/fonts";
import Image from "next/image";

export default function Home() {

  return (
    <div className="">
      <h1>hola mundo</h1>
      <h1 className={`${titleFont.className} font-bold`}>hola mundo</h1>
    </div>
  );
}
