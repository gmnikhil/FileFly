import jumboImage from "../../public/images/jumbo_image.png";
import { Button } from "@mantine/core";
import Image from "next/image";
import globeImage from "../../public/images/globe-nodes.png";

export default function Jumbotron({ handleClick, handleConnect, text }) {
  return (
    <div
      className="h-full  flex items-center justify-between text-center md:text-left md:mx-20"
      style={{ minHeight: "calc(100vh - 80px)", maxHeight: "400px" }}
    >
      <div className="flex flex-col md:w-5/12 mx-5 gap-8">
        <h1
          className="text-5xl text-baseColor font-semibold "
          style={{ lineHeight: "1.5cm" }}
        >
          Keep all your Files safe and secure with{" "}
          <span className="italic">FileFly&nbsp;:)</span>
        </h1>
        <h5 className="w-8/12 mx-auto md:mx-0">
          Your data is safe and secure with FileFly powered by Blockchain!
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
        <Image
          // src={jumboImage}
          className="flex"
          src={globeImage}
          fit="contain"
          height={440}
          width={440}
        ></Image>
      </div>
    </div>
  );
}
