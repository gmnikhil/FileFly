import { Card, Image, Text, Badge, Button, Group, Modal } from "@mantine/core";
import { useState } from "react";
import QRCode from "react-qr-code";
import CommentModal from "../Comment/CommentModal";
import { toast } from "react-toastify";
import axios from "axios";
import { useWalletDetails } from "../../hooks/blockChain";
import useAccountDetails from "../../hooks/accountDetails";
import ReportsModal from "../Reports/ReportsModal";

export function ReportCard({ file, reports }) {
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

  const [delete_modal_opened, setDeleteModalOpened] = useState(false);

  const [comment_modal_opened, setCommentModalOpened] = useState(false);

  const [reports_modal_opened, setReportsModalOpened] = useState(false);

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

      //not working
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
      <CommentModal
        handleClose={() => setCommentModalOpened(false)}
        comment_modal_opened={comment_modal_opened}
        post_id={file.id}
      />

      <ReportsModal
        handleClose={() => setReportsModalOpened(false)}
        reports={reports}
        reports_modal_opened={reports_modal_opened}
      />

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
            alt="file"
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{title}</Text>
          <Badge color="pink" variant="light">
            {label}
          </Badge>
        </Group>

        <Text size="sm" color="dimmed">
          {description}
        </Text>
        <div className="flex justify-between">
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
        {
          <div className="flex justify-between gap-2">
            <Button
              onClick={() => setDeleteModalOpened(true)}
              variant="light"
              color="red"
              fullWidth
              mt="md"
              radius="md"
            >
              Delete
            </Button>

            <Button
              onClick={() => {
                setReportsModalOpened(true);
              }}
              variant="light"
              color="red"
              fullWidth
              mt="md"
              radius="md"
            >
              Reports ({reports.length})
            </Button>
          </div>
        }
      </Card>
    </>
  );
}
