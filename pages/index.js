import { useEffect, useState } from "react";

import { useWalletDetails } from "../hooks/blockChain";

export default function Home() {
  const { acc, FileFly, loading } = useWalletDetails();

  const initi = async () => {
    console.log(await FileFly.methods.owner().call());
  };

  useEffect(() => {
    console.log(FileFly);
    if (FileFly) {
      initi();
    }
  }, [FileFly]);
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
