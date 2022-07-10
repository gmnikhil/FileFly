import "../styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import Head from "next/head";

// This is the chainId your dApp will work on.
console.log(ChainId);
const activeChainId = ChainId.Rinkeby;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head></Head>
      <ThirdwebProvider desiredChainId={activeChainId}>
        <Component {...pageProps} />
      </ThirdwebProvider>
    </>
  );
}

export default MyApp;
