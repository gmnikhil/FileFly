import { useEffect, useState } from "react";
import Web3 from "web3";
//import data from "../FileFly.json";

const data = {
  abi: "hel",
};
export function useWalletDetails() {
  const contract_address = "0xf9dEf041c0714Af8eE6eD7D15BD0A1622cC5B1a6";

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should use the MetaMask extension!"
      );
    }
  }

  const [acc, setAccount] = useState();
  const [FileFly, setFileFly] = useState();

  const [loading, setLoading] = useState(true);

  async function loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    if (contract_address) {
      const hnet = new web3.eth.Contract(data.abi, contract_address);
      setFileFly(hnet);
      setLoading(false);
    } else {
      window.alert("The dapp contract could not be deployed to network");
    }
  }

  const init = async () => {
    await loadWeb3();
    await loadBlockchainData();
  };

  useEffect(() => {
    init();
  }, []);

  return { acc, FileFly, loading };
}
