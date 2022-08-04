import { Avatar, Text } from "@mantine/core";

export default function Comment({ comment, sent_by, sent }) {
  return (
    <div className={`flex flex-col ${sent ? "items-end" : ""}`}>
      <div className="flex items-center mt-5 ml-3">
        <Avatar color="blue" radius="xl">
          {/* <BiStar size={20} /> */}
        </Avatar>
        <div className="flex items-end">
          <h3 className="ml-2 text-joyonBlue font-semibold">{sent_by.name}</h3>
        </div>
      </div>
      <div
        className={`flex w-fit items-center mt-2 gap-4 ${
          sent ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className={`${
            sent ? "bg-slate-800 text-white" : "bg-blue-300 text-joyonBlue"
          } w-fit px-5 py-1 rounded-full ml-3`}
        >
          <Text>{comment}</Text>
        </div>
      </div>
    </div>
  );
}
