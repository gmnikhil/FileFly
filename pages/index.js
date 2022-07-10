import { useEffect, useState } from "react";
import Web3 from "web3";
import data from "../HealthNet.json";
import { useWalletDetails } from "../hooks/blockChain";

export default function Home() {
  const { acc, healthNet, loading } = useWalletDetails();

  const initi = async () => {
    console.log(await healthNet.methods.owner().call());
  };

  useEffect(() => {
    console.log(healthNet);
    if (healthNet) {
      initi();
    }
  }, [healthNet]);
  return (
    <div>
      {loading ? (
        <>
          <button onClick={() => {}}>Disconnect Wallet</button>
          <p className="bg-red-300">Your address: {}</p>
        </>
      ) : (
        <button onClick={() => {}}>Connect with Metamask</button>
      )}
    </div>
  );
}
