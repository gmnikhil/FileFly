import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useRef } from "react";
import {
  Footer,
  InfoSection,
  Jumbotron,
  MoreInfoSection,
  Navbar,
} from "../components";
import { useWalletDetails } from "../hooks/blockChain";

export default function Home() {
  const jumbotronRef = useRef();
  const homeRef = useRef();
  const infoRef = useRef();
  const moreInfoRef = useRef();
  const footerRef = useRef();

  const goTo = (sname) => {
    if (sname === "jumbo")
      jumbotronRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    else if (sname === "About")
      infoRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    else if (sname === "moreInfo")
      moreInfoRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    else if (sname === "Contact")
      footerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    else
      homeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
  };

  // const address = useAddress();
  // const connectWithMetamask = useMetamask();
  // const disconnectWallet = useDisconnect();
  const { acc, healthNet, loading } = useWalletDetails();
  const router = useRouter();

  const connectWallet = async () => {
    if (!acc) {
      alert("Connect metamask");
      return;
    }
    const doctor = await healthNet.methods.isDoctor(acc);
    const hospital = await healthNet.methods
      .isHospital(acc)
      .send({ from: acc });

    if (doctor) {
      router.push("/doctor");
    } else if (hospital) {
      router.push("/hospital");
    }
  };

  const goToDashboard = () => {
    router.push("/doctor");
  };

  return (
    <div ref={homeRef}>
      <Navbar
        handleClick={goTo}
        handleConnect={connectWallet}
        text={"Connect Wallet"}
      />
      <div ref={jumbotronRef}>
        <Jumbotron handleConnect={connectWallet} text={"Connect Wallet"} />
      </div>
      <div ref={infoRef}>
        <InfoSection />
      </div>
      <MoreInfoSection handleClick={goTo} />
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}
