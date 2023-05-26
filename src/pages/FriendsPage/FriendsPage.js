import React, { Suspense, useState } from "react";
import "./FriendsPage.css";
import instance from "../../axios";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import noAvatar from "../../static/img/no-avatar.png";
import Loading from "../../components/Loading/Loading";

export default function FriendsPage() {
  const { userId } = useParams();
  const [friendsList, setFriendsList] = useState(null);

  React.useEffect(() => {
    const getFriendsList = async () => {
      try {
        const res = await instance.get(`/users/${userId}`);
        setFriendsList(res.data.friends);
      } catch (err) {
        console.log(err);
      }
    };
    getFriendsList();
  }, []);

  return (
    <>
      <Suspense fallback={<Loading />}>
        {friendsList && (
          <div>
            <Navbar />
            <div className="container d-flex aling-items-center justify-content-center me-5">
              <div className="d-inline-flex overflow ">
                {friendsList?.length ? (
                  friendsList.map((user) => {
                    return (
                      <div key={user._id} className="mb-3 me-3">
                        <a
                          href={"/users/" + user._id}
                          className="text-decoration-none"
                        >
                          <img
                            className="bd-radius"
                            src={user.avatarUrl ? user.avatarUrl : noAvatar}
                            alt=""
                            width="150px"
                            height="150px"
                          />
                          <p className="d-flex aling-items-center justify-content-center">
                            {user.firstName} {user.lastName}
                          </p>
                        </a>
                      </div>
                    );
                  })
                ) : (
                  <span>Друзья не найдены</span>
                )}
              </div>
            </div>
          </div>
        )}
      </Suspense>
    </>
  );
}
