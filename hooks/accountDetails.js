import { useEffect, useState } from "react";
import axios from "axios";

export default function useAccountDetails(acc) {
  const [account_created, setAccountCreated] = useState(false);
  const [user, setUser] = useState();

  const checkUser = async (addr) => {
    try {
      const res = await axios.get(`/api/user?user_addr=${addr}`);
      if (!res?.data?.success) throw Error(`Could'nt fetch Comments`);
      setAccountCreated(res.data.found);
      setUser(res.data.user);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (!acc) setAccountCreated(false);
    else checkUser(acc);
  }, [acc]);

  return { account_created, user };
}
