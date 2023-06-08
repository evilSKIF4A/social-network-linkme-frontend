import React, { useRef, useState } from "react";
import "./WindowChat.css";
import Message from "../Message/Message";
import instance from "../../axios";

function WindowChat({ ownId, chatId, socket }) {
  const scrollRef = useRef();
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [dataChat, setDataChat] = useState(null);
  const [messages, setMessages] = useState([]);

  React.useEffect(() => {
    const getDataChat = async () => {
      try {
        const data = await instance.get(`/chats/${chatId}`);
        setDataChat(data.data);
        setMessages(data.data.messages);
      } catch (err) {
        console.log(err);
      }
    };
    getDataChat();
  }, []);

  React.useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        authorId: data.senderId,
        message: data.text,
        createdAt: Date.now(),
      });
    });
  }, [arrivalMessage]);

  React.useEffect(() => {
    arrivalMessage &&
      (dataChat.user1._id === arrivalMessage.authorId ||
        dataChat.user2._id === arrivalMessage.authorId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, dataChat]);

  React.useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    const receiverId =
      dataChat.user1._id === ownId ? dataChat.user2._id : dataChat.user1._id;

    socket.emit("sendMessage", {
      senderId: ownId,
      receiverId,
      text: newMessage,
    });

    try {
      const message = await instance.post(
        `/message/post/${chatId}/${ownId}/${newMessage.replaceAll(
          "\n",
          "<br>"
        )}`
      );
      setMessages([...messages, message.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  let avatarReceiver =
    dataChat?.user1.avatarUrl === ownId
      ? dataChat?.user1.avatarUrl
      : dataChat?.user2.avatarUrl;
  let avatarSender =
    dataChat?.user2.avatarUrl === ownId
      ? dataChat?.user2.avatarUrl
      : dataChat?.user1.avatarUrl;

  return (
    <div className="col-md-6 col-lg-7 col-xl-8">
      <div className="pt-3 pe-3 scroll-chat">
        {dataChat &&
          messages &&
          messages.map((message) => {
            return (
              <div key={message._id} ref={scrollRef}>
                <Message
                  ownId={ownId}
                  message={message}
                  avatarSender={avatarSender}
                  avatarReceiver={avatarReceiver}
                />
              </div>
            );
          })}
      </div>

      <div className="box-message">
        <textarea
          className="input-message "
          placeholder="Написать сообщение"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        ></textarea>
        <button className="button-message" onClick={handleSubmit}>
          Отправить
        </button>
      </div>
    </div>
  );
}

export default WindowChat;
