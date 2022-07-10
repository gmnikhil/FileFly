import { useEffect, useState } from "react";
import Web3 from "web3";
import data from "../HealthNet.json";

export function useWalletDetails() {
  const contract_address = "0x702fa152EBDD749D48695d1b5b5F44C108404D2a";

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
  const [healthNet, setHealthNet] = useState();

  const [loading, setLoading] = useState(true);

  async function loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    if (contract_address) {
      const hnet = new web3.eth.Contract(data.abi, contract_address);
      setHealthNet(hnet);
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

  return { acc, healthNet, loading };
}
