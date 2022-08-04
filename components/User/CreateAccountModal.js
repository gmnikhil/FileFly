import { Button, Modal, Select, Input } from "@mantine/core";
import { useState } from "react";
import { useWalletDetails } from "../../hooks/blockChain";
import axios from "axios";

export default function CreateAccountModal({ open, handleClose }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("1");

  const { acc } = useWalletDetails();

  const [select_data, setSelectData] = useState([
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ]);

  const handleAccountCreate = async () => {
    try {
      const res = await axios.post("/api/user", {
        user_addr: acc,
        name,
        avatar,
      });
      if (!res?.data?.success) throw Error(`Could'nt create Account`);
      else window.location.reload();
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      centered
      opened={open}
      withCloseButton={false}
      title={<h1 className="text-md font-semibold">Create Account</h1>}
      closeOnClickOutside={false}
    >
      {/* Modal content */}
      <div className="w-full mx-auto my-5"></div>
      <label className="mt-14 text-sm">Wallet Address</label>
      <h1 className="mb-3">{acc}</h1>
      <label className="mt-14 text-sm">Name</label>
      <Input
        className="mb-4"
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Enter your name"
        size="md"
      />

      {/* <label className="text-sm">Avatar</label>
      <Select
        data={select_data}
        placeholder="Select an avatar"
        nothingFound="Nothing found"
        searchable
        value={avatar}
        onChange={(val) => setAvatar(val)}
      /> */}
      <div className="mt-4 flex justify-end ">
        <Button
          className="text-white bg-baseColor"
          disabled={!name || !avatar}
          onClick={() => {
            handleAccountCreate();
            //setFileUploadModalOpened(false);
          }}
        >
          Create
        </Button>
      </div>
    </Modal>
  );
}
