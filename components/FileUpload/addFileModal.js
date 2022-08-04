import { Input, Textarea, Button, Modal, Select } from "@mantine/core";
import { storeFile } from "../../utils/storeFile";
import { toast } from "react-toastify";
import { useWalletDetails } from "../../hooks/blockChain";
import { DragAndDrop } from "..";
import { useState } from "react";
import axios from "axios";
import useAccountDetails from "../../hooks/accountDetails";

export default function AddFileModal({ open, handleClose, handleUpdate }) {
  const [file, setFile] = useState();

  const [post_title, setPostTitle] = useState("");
  const [post_description, setPostDescription] = useState("");
  const [post_label, setPostLabel] = useState("");

  const { acc, FileFly, loading } = useWalletDetails();

  const { account_created, user } = useAccountDetails(acc);

  const [select_data, setSelectData] = useState([
    { value: "Happy", label: "Happy" },
    { value: "Nature", label: "Nature" },
    { value: "Love", label: "Love" },
  ]);

  const privacy_types = [
    { value: "Public", label: "Public" },
    { value: "Private", label: "Private" },
    { value: "Restricted", label: "Restricted" },
  ];

  const [post_visibility, setPostVisibility] = useState(privacy_types[0]);

  const handleFile = (file) => {
    setFile(file);
  };

  const handleUpload = async () => {
    try {
      if (!account_created) return toast.warn("Create an account!");

      const d = await axios.post("/api/post", { user_id: user._id });
      if (!d?.data?.success) throw Error(`Could'nt upload`);

      const { _id } = d.data.post;

      const res = await storeFile(file, post_title, post_description);

      if (!res.success) throw Error(`Could'nt store file`);

      const url =
        `https://ipfs.io/` +
        res.data.data.image.href.replace(":", "").replace("//", "/");

      const date = new Date().toISOString();

      const r = await FileFly.methods
        .addFile(url, post_title, post_description, post_label, date, _id)
        .send({ from: acc });
      setFile(null);
      setPostTitle("");
      setPostDescription("");
      //setFiles((prev) => [].concat(prev, r));
      handleUpdate();
      toast.success("Upload Succesful");
      handleClose();
    } catch (e) {
      console.log(e);
      toast.error("Upload Failed");
    }
  };

  return (
    <>
      <Modal
        centered
        opened={open}
        onClose={() => handleClose()}
        title={<h1>New Post</h1>}
        closeOnClickOutside={false}
      >
        {/* Modal content */}
        <div className="w-full mx-auto my-5">
          {file ? (
            <div className="relative">
              <img
                className="mx-auto"
                src={URL.createObjectURL(file)}
                style={{ maxHeight: "100px" }}
              />
              <Button
                className="text-white bg-red-600 absolute right-0"
                onClick={() => setFile(null)}
              >
                Delete
              </Button>
            </div>
          ) : (
            <DragAndDrop handleFile={handleFile} />
          )}
        </div>
        <label className="mt-14 text-sm">Title</label>
        <Input
          className="mb-4"
          onChange={(e) => {
            setPostTitle(e.target.value);
          }}
          placeholder="Enter a title for your file"
          size="md"
        />
        <label className="text-sm">Description</label>
        <Textarea
          onChange={(e) => setPostDescription(e.target.value)}
          className="mb-3"
          placeholder="Enter a description for your file"
          size="md"
        />
        <label className="text-sm">Label</label>
        <Select
          data={select_data}
          className="mb-2"
          placeholder="Add a label"
          nothingFound="Nothing found"
          searchable
          creatable
          value={post_label}
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            setSelectData((current) => [...current, item]);
            setPostLabel(item.value);
            return item;
          }}
          onChange={(val) => setPostLabel(val)}
        />
        <label className="text-sm">Visibility</label>
        <Select
          data={privacy_types}
          placeholder="Choose post Visibility"
          searchable
          value={post_visibility}
          onChange={(val) => setPostVisibility(val)}
        />
        <div className="mt-4 flex justify-end ">
          <Button
            className="text-white bg-baseColor"
            disabled={!post_description || !post_title || !post_label || !file}
            onClick={() => {
              handleUpload();
              //setFileUploadModalOpened(false);
            }}
          >
            Post
          </Button>
        </div>
      </Modal>
    </>
  );
}
