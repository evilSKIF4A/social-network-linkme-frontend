import React, { Suspense, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import WindowChat from "../../components/WindowChat/WindowChat";
import Conversation from "../../components/Conversation/Conversation";
import "./Chats.css";
import { useSelector } from "react-redux";
import socket from "../../socket";
import Loading from "../../components/Loading/Loading";

function Chats() {
  const userData = useSelector((state) => state.auth.data);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  React.useEffect(() => {
    userData && socket.emit("addUser", userData?._id);
    socket.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [userData]);

  React.useEffect(() => {
    setConversations(userData?.chats);
  }, [userData]);

  return (
    <Suspense fallback={<Loading />}>
      {userData && (
        <div className="container">
          <Navbar />
          <div className="row">
            <div className="col-md-12">
              <div className="card" id="chat3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                      <div className="p-3">
                        <div className="scroll-bar">
                          <ul className="list-unstyled mb-0">
                            {userData &&
                              conversations &&
                              conversations.map((chatId) => {
                                return (
                                  <div
                                    key={chatId}
                                    onClick={() => setCurrentChat(chatId)}
                                    className="cursor-pointer"
                                  >
                                    <Conversation
                                      ownId={userData._id}
                                      chatId={chatId}
                                      onlineUsers={onlineUsers}
                                    />
                                  </div>
                                );
                              })}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {currentChat && (
                      <WindowChat
                        key={currentChat + "1"}
                        ownId={userData?._id}
                        chatId={currentChat}
                        socket={socket}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Suspense>
  );
}

export default Chats;
