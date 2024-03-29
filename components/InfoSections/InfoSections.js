import { Button } from "@mantine/core";
import Image from "next/image";
import infoImage from "../../public/images/doctors.svg";
import privacyIcon from "../../public/images/privacy.png";
import commentIcon from "../../public/images/comment.png";
import blockchainIcon from "../../public/images/blockchain.png";
import blockImage from "../../public/images/block.png";

export function Info() {
  return (
    <div
      id="about"
      className="h-full  flex items-center flex-col"
      style={{ height: "calc(100vh - 180px)" }}
    >
      <div className="w-6/12 mx-auto">
        <h1
          className="text-3xl text-black font-semibold text-center my-8"
          style={{ lineHeight: "1.2cm" }}
        >
          Why use FileFly?
          {/* <br /> Take a Peek ^ ^ */}
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-8 mx-16 lg:grid-cols-3 ">
        {[
          {
            image: blockchainIcon.src,
            title: "Decentralised Storage",
            description:
              "Your files are stored using blockchain technology, preserving legititmacy",
          },
          {
            image: privacyIcon.src,
            title: "Privacy and Security",
            description:
              "Your files are encrypted and hence safe and protected",
          },
          {
            image: commentIcon.src,
            title: "Comments",
            description:
              "You can comment your thoughts and let your views be known to the globe!",
          },
        ].map((v, i) => {
          return (
            <div
              key={i}
              className="flex flex-col items-center bg-white gap-3 p-5 mx-auto"
            >
              <div //className="rounded-full"
              >
                <img
                  width={80}
                  height={80}
                  // className="rounded-full"
                  src={v.image}
                />
              </div>
              <h2 className="text-2xl text-black font-semibold text-center">
                {v?.title}
              </h2>
              <h6 className="text-center text-gray-40000">{v?.description}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MoreInfo({ handleClick }) {
  return (
    <div
      className="h-full mt-96 sm:mt-64 lg:mt-16 flex flex-row-reverse items-center text-center md:text-left "
      style={{ height: "calc(100vh - 80px)", maxHeight: "350px" }}
    >
      <div className="flex flex-col mt-40 sm:mt-0 md:w-5/12 ml-20 gap-8 mr-14 text-center h-full">
        <h1
          className="text-5xl text-baseColor font-semibold "
          style={{ lineHeight: "1.5cm" }}
        >
          Nowhere to store your files decentralized?
          <br />
          <span className="italic">We've got your back ::</span>
        </h1>
        <h5 className="w-10/12 text-lg mx-auto">
          FileFly brings the platform for your needs, making file handling easy
          and smooth!
        </h5>
        <div className="flex items-center justify-center gap-5">
          <Button
            className="text-white bg-baseColor"
            onClick={() => handleClick("Home")}
          >
            Get Started
          </Button>
        </div>
      </div>
      <div className="image scale-75 hidden md:block mx-auto">
        <Image src={blockImage}></Image>
      </div>
    </div>
  );
}
