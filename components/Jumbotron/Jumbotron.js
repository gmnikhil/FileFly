import jumboImage from "../../public/images/jumbo_image.png";
import { Button } from "@mantine/core";
import Image from "next/image";

export default function Jumbotron({ handleClick, handleConnect, text }) {
  return (
    <div
      className="h-full  flex items-center text-center md:text-left"
      style={{ minHeight: "calc(100vh - 80px)", maxHeight: "400px" }}
    >
      <div className="flex flex-col md:w-5/12 mx-5 md:ml-20 gap-8">
        <h1
          className="text-5xl text-baseColor font-semibold "
          style={{ lineHeight: "1.5cm" }}
        >
          Keep all your Records safe and secure with{" "}
          <span className="italic">HealthNet&nbsp;:)</span>
        </h1>
        <h5 className="w-8/12 mx-auto md:mx-0">
          Your data is safe and secure with Healthnet powered by Blockchain!
        </h5>
        <div className="flex items-center justify-center md:justify-start gap-5">
          <Button
            className="text-white bg-baseColor rounded-md"
            onClick={handleClick}
          >
            Explore
          </Button>
          <Button className="text-white bg-baseColor" onClick={handleConnect}>
            {text}
          </Button>
        </div>
      </div>
      <div className="image hidden md:block">
        <Image src={jumboImage}></Image>
      </div>
    </div>
  );
}
