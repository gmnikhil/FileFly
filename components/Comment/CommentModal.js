import { Modal, ScrollArea, Input, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { useWalletDetails } from "../../hooks/blockChain";
import Comment from "./Comment";
import { toast } from "react-toastify";
import axios from "axios";
import useAccountDetails from "../../hooks/accountDetails";

export default function CommentModal({
  comment_modal_opened,
  handleClose,
  post_id,
}) {
  const [new_comment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const { acc } = useWalletDetails();
  const { account_created, user } = useAccountDetails(acc);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/comment?post_id=${post_id}`);
      if (!res?.data?.success) throw Error(`Could'nt fetch Comments`);
      setComments(res.data.comments);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSend = async () => {
    try {
      if (!account_created) return toast.warn("Create an account!");

      const res = await axios.post("/api/comment", {
        user_id: user._id,
        post_id,
        comment: new_comment,
      });
      if (!res?.data?.success) throw Error(`Could'nt fetch Comments`);

      res.data.comment.user_id = user;
      setComments((prev) => [].concat(prev, [res.data.comment]));
      setNewComment("");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (acc) fetchComments();
  }, [acc]);

  return (
    <>
      <Modal
        centered
        opened={comment_modal_opened}
        onClose={() => handleClose()}
        title={<h1 className="text-lg font-semibold">Comments</h1>}
        closeOnClickOutside={false}
      >
        <ScrollArea className="relative flex flex-col w-full pr-8">
          <div
            //ref={scrollAreaRef}
            className="overflow-y-scroll customScroll pb-4 pr-4"
            style={{
              maxHeight: "calc(80vh - 150px)",
              minHeight: "350px",
            }}
          >
            {comments &&
              comments.map((commentDetails, i) => {
                console.log(commentDetails.user_id.user_addr);
                console.log(acc);
                return (
                  <Comment
                    comment={commentDetails.comment}
                    key={i}
                    sent_by={commentDetails.user_id}
                    sent={commentDetails.user_id.user_addr === acc}
                  />
                );
              })}
          </div>
          <div className="bottom-3 w-full ">
            <div className=" flex gap-2 items-end w-full mx-auto mt-5">
              <Input
                onChange={(e) => setNewComment(e.target.value)}
                value={new_comment}
                placeholder="Enter message . . ."
                className="w-10/12 ml-2"
              />
              <Button
                disabled={!new_comment}
                className="text-white bg-baseColor"
                onClick={() => handleSend()}
              >
                Send
              </Button>
            </div>
          </div>
        </ScrollArea>
      </Modal>
    </>
  );
}
