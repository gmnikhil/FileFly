import { useRouter } from "next/router";
import { useEffect } from "react";

import { useWalletDetails } from "../hooks/blockChain";

export default function Home() {
  const { acc, FileFly, loading } = useWalletDetails();

  const initi = async () => {
    console.log(await FileFly.methods.owner().call());
  };

  const router = useRouter();

  useEffect(() => {
    router.replace("/home");
  }, []);
  return null;
}
