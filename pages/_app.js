import "../styles/globals.css";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import useAccountDetails from "../hooks/accountDetails";
import CreateAccountModal from "../components/User/CreateAccountModal";
import { useWalletDetails } from "../hooks/blockChain";

function MyApp({ Component, pageProps }) {
  const { acc } = useWalletDetails();

  const { account_created } = useAccountDetails(acc);

  const [close_account_create_modal, setCloseAccountCreateModal] =
    useState(false);

  const [open, setOpen] = useState(false);

  const closeAccountCreateModal = () => {
    setCloseAccountCreateModal(true);
  };

  var timeout;

  useEffect(() => {
    timeout = setTimeout(() => {
      setOpen(true);
    }, 6000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <Head>
        <title>FileFly</title>
        <link rel="icon" href="/images/logo.png" />
        <meta key="type" property="og:type" content="Website"></meta>
        <meta property="og:site_name" content="FileFly"></meta>
      </Head>
      <CreateAccountModal
        open={acc && !account_created && !close_account_create_modal && open}
        handleClose={closeAccountCreateModal}
      />
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
