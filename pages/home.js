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

  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  const router = useRouter();

  const connectWallet = connectWithMetamask;

  const goToDashboard = () => {
    router.push("/doctor");
  };

  return (
    <div ref={homeRef}>
      <Navbar
        handleClick={goTo}
        handleConnect={address ? disconnectWallet : connectWallet}
        text={address ? "Disconnect Wallet" : "Connect Wallet"}
      />
      <div ref={jumbotronRef}>
        <Jumbotron
          handleConnect={address ? goToDashboard : connectWallet}
          text={address ? "Go to Dashboard" : "Connect Wallet"}
        />
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
