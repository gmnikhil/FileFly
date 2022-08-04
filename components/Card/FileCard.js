import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Modal,
  Textarea,
  Input,
  Select,
} from "@mantine/core";
import { useState } from "react";
import QRCode from "react-qr-code";
import CommentModal from "../Comment/CommentModal";
import { toast } from "react-toastify";
import axios from "axios";
import { useWalletDetails } from "../../hooks/blockChain";
import useAccountDetails from "../../hooks/accountDetails";
import { Files } from "tabler-icons-react";

export function FileCard({ own, file, handleDeleted }) {
  const [file_details_modal_opened, setFileDetailsModalOpened] =
    useState(false);

  const { acc, FileFly, loading } = useWalletDetails();
  const { account_created, user } = useAccountDetails(acc);

  const [deleted, setDeleted] = useState(file.deleted);

  const title = file?.name || "Norway Fjord Adventures";
  const description =
    file?.description ||
    `With Fjord Tours you can explore more of the magical fjord landscapes
    with tours and activities on and around the fjords of Norway`;
  const label = file?.label || "Nature";
  const file_link =
    file?.link ||
    "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80";

  const [edit_modal_opened, setEditModalOpened] = useState(false);

  const [post_title, setPostTitle] = useState(title);
  const [post_description, setPostDescription] = useState(description);
  const [post_label, setPostLabel] = useState(label);
  const [select_data, setSelectData] = useState([
    { value: "Happy", label: "Happy" },
    { value: "Nature", label: "Nature" },
    { value: "Love", label: "Love" },
  ]);

  const [delete_modal_opened, setDeleteModalOpened] = useState(false);

  const [comment_modal_opened, setCommentModalOpened] = useState(false);

  const [report_modal_opened, setReportModalOpened] = useState(false);

  const [report_reason, setReportReason] = useState("");

  const closeReportModal = () => {
    setReportModalOpened(false);
  };

  const handleLike = async () => {
    try {
      if (!account_created) return toast.warn("Create an account!");
      await FileFly.methods.likeFile(file.index).send({
        from: acc,
        value: window.web3.utils.toWei("1"),
      });
      try {
        const res = await axios.post("/api/like", {
          user_id: user._id,
          post_id: file.id,
        });
        if (!res?.data?.success) throw Error(`Could'nt Like`);
        //if (!res.data.exists) toast.success("Already Liked");
        else toast.success("Successfully Liked");
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
      toast.error("Could not like the post!");
    }
  };

  const handleReport = async () => {
    try {
      if (!account_created) return toast.warn("Create an account!");

      const res = await axios.post("/api/report", {
        user_id: user._id,
        post_id: file.id,
        reason: report_reason,
        post_index: file.index,
      });
      if (!res?.data?.success) throw Error(`Could'nt Report`);
      if (res.data.exists) toast.success("Already Reported");
      else {
        toast.success("Successfully Reported");

        setReportReason("");
        closeReportModal();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = async () => {
    const date = new Date().toISOString();
    try {
      const r = await FileFly.methods
        .editFile(file.index, post_title, post_description, post_label, date)
        .send({ from: acc });
      toast.success("Successfully updated!");
      setEditModalOpened(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async () => {
    if (!account_created) return toast.warn("Create an account!");
    try {
      const r = await FileFly.methods
        .deleteFile(file.index)
        .send({ from: acc });
      const res = await axios.delete("/api/post", {
        data: {
          user_id: user._id,
          post_id: file.id,
        },
      });
      if (!res?.data?.success) throw "Could not delete post!";
      toast.success("Successfully deleted!");
      setDeleteModalOpened(false);
      handleDeleted(file.index);
      //not working
      setEditModalOpened(false);
      setDeleted(true);
    } catch (e) {
      console.log(e);
    }
  };
  const handleImageError = (e) => {
    e.target.src = "https://picsum.photos/200/300?grayscale&random=2";
  };

  return deleted ? (
    <></>
  ) : (
    <>
      <Modal
        centered
        opened={report_modal_opened}
        onClose={() => closeReportModal()}
        title={<h1 className="text-lg font-semibold">Report Post</h1>}
        closeOnClickOutside={false}
      >
        <label className="mt-14 text-sm">Reason</label>
        <Input
          className="mb-4"
          onChange={(e) => {
            setReportReason(e.target.value);
          }}
          value={report_reason}
          placeholder="Enter reason"
          size="md"
        />
        <div className="mt-4 flex justify-end gap-6 ">
          <Button
            className="text-white bg-baseColor"
            onClick={() => {
              closeReportModal();
            }}
          >
            Cancel
          </Button>
          <Button
            className="text-white bg-red-500"
            disabled={!report_reason}
            onClick={() => handleReport()}
          >
            Report
          </Button>
        </div>
      </Modal>
      <CommentModal
        handleClose={() => setCommentModalOpened(false)}
        comment_modal_opened={comment_modal_opened}
        post_id={file.id}
      />
      <Modal
        centered
        opened={edit_modal_opened}
        onClose={() => setEditModalOpened(false)}
        title={<h1 className="text-lg font-semibold">Edit Post</h1>}
        closeOnClickOutside={false}
      >
        <label className="mt-14 text-sm">Title</label>
        <Input
          className="mb-4"
          onChange={(e) => {
            setPostTitle(e.target.value);
          }}
          value={post_title}
          placeholder="Enter a title for your file"
          size="md"
        />
        <label className="text-sm">Description</label>
        <Textarea
          value={post_description}
          onChange={(e) => setPostDescription(e.target.value)}
          className="mb-4"
          placeholder="Enter a description for your file"
          size="md"
          minRows={4}
        />
        <label className="text-sm">Label</label>

        <Select
          data={select_data}
          placeholder={"Edit Label"}
          nothingFound="Nothing found"
          searchable
          creatable
          value={post_label}
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            setSelectData((current) => [...current, item]);
            setPostLabel(item);
            return item;
          }}
        />
        <div className="mt-8 flex justify-between items-center">
          <Button
            className="text-white bg-red-600"
            onClick={() => {
              setDeleteModalOpened(true);
            }}
          >
            Delete
          </Button>
          <Button
            disabled={!post_title || !post_description || !post_label}
            className="text-white bg-baseColor"
            onClick={() => {
              handleEdit();
            }}
          >
            Save
          </Button>
        </div>
      </Modal>

      <Modal
        centered
        opened={delete_modal_opened}
        onClose={() => setDeleteModalOpened(false)}
        closeOnClickOutside={false}
        title={
          <h1 className="text-md text-center text-black text-xl">
            Confirm Delete
          </h1>
        }
      >
        {/* Modal content */}

        <h1 className="text-md text-center ">
          Are you sure you want to delete this post?
        </h1>
        <div className="mt-4 flex justify-end gap-6 ">
          <Button
            className="text-white bg-baseColor"
            onClick={() => {
              handleDelete();
            }}
          >
            Yes
          </Button>
          <Button
            className="text-white bg-baseColor"
            onClick={() => setDeleteModalOpened(false)}
          >
            No
          </Button>
        </div>
      </Modal>

      <Modal
        centered
        opened={file_details_modal_opened}
        onClose={() => setFileDetailsModalOpened(false)}
        title={<h1 className="text-lg font-semibold">{title}</h1>}
        closeOnClickOutside={false}
      >
        <div className="w-full flex mt-8 justify-center">
          <QRCode
            size={150}
            style={{
              height: "auto",
              maxWidth: "100%",

              marginLeft: "auto",
              marginRight: "auto",
            }}
            value={file.link}
            //viewBox={`0 0 256 256`}
          />
        </div>
        <h3 className="mt-8">{description}</h3>
      </Modal>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section component="a" href={file_link}>
          <Image
            src={file_link}
            onError={handleImageError}
            //fit="contain"
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{title}</Text>
          {own && (
            <Badge color="green" variant="light">
              My File
            </Badge>
          )}
          {!own && (
            <Badge color="pink" variant="light">
              {label}
            </Badge>
          )}
        </Group>

        <Text size="sm" color="dimmed">
          {description}
        </Text>
        <div className="flex justify-between">
          {own && (
            <Button
              onClick={() => setEditModalOpened(true)}
              variant="light"
              color="blue"
              fullWidth
              mt="md"
              radius="md"
            >
              Edit
            </Button>
          )}
          <Button
            onClick={() => setCommentModalOpened(true)}
            variant="light"
            color="pink"
            fullWidth
            mt="md"
            radius="md"
          >
            Commments
          </Button>
          <Button
            onClick={() => setFileDetailsModalOpened(true)}
            variant="light"
            color="green"
            fullWidth
            mt="md"
            radius="md"
          >
            View QR
          </Button>
        </div>
        {!own && (
          <div className="flex justify-between gap-2">
            <Button
              onClick={() => handleLike()}
              variant="light"
              color="blue"
              fullWidth
              mt="md"
              radius="md"
              disabled={file.user === acc}
            >
              Like{" "}
              <span className="text-black">
                {file.likes > 0 ? file.likes : ""}
              </span>
            </Button>

            <Button
              onClick={() => setReportModalOpened(true)}
              variant="light"
              color="red"
              fullWidth
              mt="md"
              radius="md"
              disabled={file.user === acc}
            >
              Report
            </Button>
          </div>
        )}
      </Card>
    </>
  );
}
