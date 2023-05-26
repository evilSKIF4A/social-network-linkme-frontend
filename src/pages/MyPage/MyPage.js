import React, { Suspense } from "react";
import "./MyPage.css";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Friend from "../../components/Friend/Friend";
import noAvatar from "../../static/img/no-avatar.png";
import instance from "../../axios";
import Loading from "../../components/Loading/Loading";

export default function MyPage() {
  const userData = useSelector((state) => state.auth.data);

  const handleFoto = async () => {
    const avatarUrl = prompt("Введите ссылку на фотографию...", "");
    if (avatarUrl) {
      try {
        const data = await instance.post(
          `/update/foto/${avatarUrl.replaceAll("/", " ")}`
        );
        alert(data.data.message);
        window.location.reload(); // возможные проблемы с этой командой, если держать на сервере
      } catch (err) {
        alert(
          "Упс... ошибка... Фотография не была загружена. Попробуйте ещё раз или позже."
        );
        console.log(err);
      }
      return;
    }
    alert("Пустая строка");
  };

  return (
    <Suspense fallback={<Loading />}>
      {userData && (
        <div>
          <Navbar />
          <div className="container d-flex aling-items-center justify-content-center">
            <div className="inline-flex">
              <div>
                <div className="w-200 h-200 mt-2 mb-3">
                  <img
                    className=" bd-radius"
                    src={userData.avatarUrl ? userData.avatarUrl : noAvatar}
                    width="300px"
                    height="300px"
                    alt=""
                  />
                </div>
                <div className="w-300 mb-3">
                  <button className="w-300 btn-foto" onClick={handleFoto}>
                    Изменить фотографию
                  </button>
                </div>
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
                    {userData.friends.slice(0, 3).map((friendId) => {
                      return <Friend key={friendId} id={friendId} />;
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
  );
}
