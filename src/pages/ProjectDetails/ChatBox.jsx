/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChatByProject,
  fetchChatMessages,
  sendMessage,
} from "@/Redux/Chat/Action";
import { useParams } from "react-router-dom";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { auth, chat } = useSelector((store) => store);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchChatByProject(id));
  }, []);

  useEffect(() => {
    if (chat.chat) {
      dispatch(fetchChatMessages(chat.chat?.id));
      console.log("this just ran --------------------", chat.chat);
    }
  }, [chat.chat]);

  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSendMessage = () => {
    dispatch(
      sendMessage({
        senderId: auth.user?.id,
        projectId: id,
        content: message,
        // sendToServer: sendMessageToServer,
      })
    );
    console.log("message", message);
    setMessage("");
  };

  return (
    <div className="sticky">
      <div className="border rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>
        <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
          {chat.messages?.map((item, index) =>
            item.sender.id !== auth.user.id ? (
              <div key={item} className="flex gap-2 mb-2 justify-start">
                <Avatar>
                  <AvatarFallback>{item.sender.fullName[0]}</AvatarFallback>
                </Avatar>
                <div
                  className={`space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl`}
                >
                  <p>{item.sender?.fullName}</p>
                  <p className="text-gray-300 text-xs">
                    {item.createdAt.substring(0, 10)}{" "}
                    {item.createdAt.substring(11, 16)}
                  </p>
                  <p className="text-gray-300">{item.content}</p>
                </div>
              </div>
            ) : (
              <div key={item} className="flex mb-2 gap-2 justify-end ">
                <div
                  className={`space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl`}
                >
                  <p>{item.sender?.fullName}</p>
                  <p className="text-gray-300 text-xs">
                    {item.createdAt.substring(0, 10)}{" "}
                    {item.createdAt.substring(11, 16)}
                  </p>
                  <p className="text-gray-300">{item.content}</p>
                </div>
                <Avatar>
                  <AvatarFallback>{item.sender.fullName[0]}</AvatarFallback>
                </Avatar>
              </div>
            )
          )}
        </ScrollArea>
        <div className="relative p-0">
          <Input
            value={message}
            onChange={handleMessageChange}
            placeholder="type message..."
            className="py-7 border-t outline-none  focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
          />
          <Button
            onClick={handleSendMessage}
            className="absolute right-2 top-3 rounded-full"
            size="icon"
            variant="ghost"
          >
            <PaperPlaneIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
