import React, { useState } from "react";
import "./Conversation.css";
import { format } from "timeago.js";
import instance from "../../axios";
import noAvatart from "../../static/img/no-avatar.png";

export default function Conversation({ ownId, chatId, onlineUsers }) {
  const [dataChat, setDataChat] = useState(null);
  React.useEffect(() => {
    const getDataChat = async () => {
      try {
        const data = await instance.get(`/chats/${chatId}`);
        setDataChat(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getDataChat();
  }, []);

  const dataFriend =
    dataChat &&
    (dataChat.user1._id === ownId ? dataChat.user2 : dataChat.user1);
  const isOnline = onlineUsers.find((user) => user.userId === dataFriend?._id);
  const lastMessage = dataChat?.messages.at(-1);

  return (
    <>
      {dataFriend && dataChat.active && (
        <li className="p-2 border-bottom">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row">
              <div>
                <img
                  src={dataFriend.avatarUrl ? dataFriend.avatarUrl : noAvatart}
                  alt=""
                  className="d-flex align-self-center me-3 bd-radius"
                  width="60px"
                  height="60px"
                />
                <span className=" badge-dot">{isOnline ? "🟢" : "🔴"}</span>
              </div>
              <div className="pt-1">
                <p className="fw-bold mb-0 max-width">
                  {dataFriend.firstName} {dataFriend.lastName}
                </p>
                <p className="small text-muted max-width">
                  {lastMessage && lastMessage.message.replaceAll("<br>", " ")}
                </p>
              </div>
            </div>
            <div className="pt-1">
              <p className="small text-muted mb-1">
                {lastMessage && format(lastMessage.createdAt)}
              </p>
            </div>
          </div>
        </li>
      )}
    </>
  );
}
