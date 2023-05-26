import React, { Suspense, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import Navbar from "../../components/Navbar/Navbar";
import noAvatar from "../../static/img/no-avatar.png";
import "./UserPage.css";
import instance from "../../axios";
import Loading from "../../components/Loading/Loading";

export default function UserPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const currentUser = useSelector((state) => state.auth.data);

  const [userData, setUserData] = useState(null);
  const [isFriend, setIsFriend] = useState(false); // мой друг
  const [isSubscriber, setIsSubscriber] = useState(false); // мой подписчик
  const [isSubscription, setIsSubscription] = useState(false); // я подписан

  React.useEffect(() => {
    const getFriend = async () => {
      try {
        const data = await instance.get(`/users/${userId}`);
        setUserData(data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriend();
  }, [userData]);

  React.useEffect(() => {
    setIsFriend(currentUser?.friends.includes(userId));
    setIsSubscriber(currentUser?.subscribers.includes(userId));
    setIsSubscription(userData?.friends.includes(currentUser._id));
  }, [currentUser]);

  if (currentUser?._id === userId) {
    return <Navigate to="/me" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        isFriend &&
        window.confirm("Вы уверены, что хотите удалить из друзей?")
      ) {
        const data = await instance.patch(`/users/${userId}/del`);
        setIsSubscriber(true);
        setIsFriend(false);
      } else if (isSubscription) {
        const data = await instance.patch(`/users/${userId}/del`);
        setIsSubscription(false);
      } else if (isSubscriber) {
        const data = await instance.patch(`/users/${userId}/add`);
        setIsFriend(true);
        setIsSubscriber(false);
      } else {
        const data = await instance.patch(`/users/${userId}/add`);
        setIsSubscription(true);
      }
    } catch (err) {
      alert("Упс... Какая то ошибка.....");
      console.log(err);
    }
  };

  const handleNewChat = async (e) => {
    try {
      await instance.post("/chat/create", {
        user2: userId,
      });
      navigate("/chats");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        {userData && currentUser && (
          <div>
            <Navbar />
            <div className="container d-flex aling-items-center justify-content-center">
              <div className="inline-flex">
                <div>
                  <div className="w-300 h-300 mt-2 mb-3">
                    <img
                      className="bd-radius"
                      src={userData.avatarUrl ? userData.avatarUrl : noAvatar}
                      width="300px"
                      height="300px"
                      alt="Foto"
                    />
                  </div>
                  {isAuth && (
                    <>
                      <div>
                        <button
                          onClick={handleNewChat}
                          className="w-300 mb-3 def-btn "
                        >
                          Написать сообщение
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={handleSubmit}
                          className={
                            "w-300 mb-3 def-btn " +
                            (isFriend
                              ? "btn-friend"
                              : isSubscriber || isSubscription
                              ? "btn-sub"
                              : "btn-new")
                          }
                        >
                          {isFriend
                            ? "Удалить из друзей"
                            : isSubscriber
                            ? "Принять заявку"
                            : isSubscription
                            ? "Отписаться"
                            : "Добавить в друзья"}
                        </button>
                      </div>
                    </>
                  )}
                  <div>
                    <div className="mb-1">
                      <Link
                        to={"/friends/" + userData._id}
                        className="text-decoration-none mb-3 me-3"
                      >
                        Друзей: {userData.friends.length}
                      </Link>
                      <Link
                        to={"/subscribers/" + userData._id}
                        className="text-decoration-none mb-3"
                      >
                        Подписчиков: {userData.subscribers.length}
                      </Link>
                    </div>
                    <div className="inline-flex">
                      {userData.friends.splice(0, 3).map((friend) => {
                        return (
                          <div className="me-2" key={friend._id}>
                            <a
                              className="text-decoration-none color-black"
                              href={`/users/${friend._id}`}
                            >
                              <img
                                className="bd-radius mt-3"
                                src={
                                  friend.avatarUrl ? friend.avatarUrl : noAvatar
                                }
                                width="50px"
                                height="50px"
                                alt=""
                              />
                              <p className="center">{friend.firstName}</p>
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="ms-5">
                  <h3>
                    {userData.firstName} {userData.lastName}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </Suspense>
    </>
  );
}
