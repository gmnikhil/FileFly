import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { toast } from "react-toastify";
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
  const { acc, FileFly, loading } = useWalletDetails();
  const router = useRouter();

  const goToDashboard = () => {
    router.push("/dashboard");
  };

  const connectWallet = async () => {
    if (!acc) {
      //alert("Connect metamask");
      toast.warn("Connect metamask");
      return;
    }
    const admin = await FileFly.methods.isAdmin(acc).call();
    const owner = await FileFly.methods.isOwner(acc).call();
    //console.log(admin);
    //const hospital = await FileFly.methods.isHospital(acc).send({ from: acc });

    if (admin || owner) {
      router.push("/admin");
    } else if (acc) {
      goToDashboard();
    }
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
