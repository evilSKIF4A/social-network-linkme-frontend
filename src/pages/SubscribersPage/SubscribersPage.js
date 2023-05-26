import React, { Suspense, useState } from "react";
import "./SubscribersPage.css";
import instance from "../../axios";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import noAvatar from "../../static/img/no-avatar.png";
import Loading from "../../components/Loading/Loading";

export default function SubscribersPage() {
  const { userId } = useParams();
  const [subscribersList, setSubscribersList] = useState(null);

  React.useEffect(() => {
    const getSubscribersList = async () => {
      try {
        const res = await instance.get(`/users/${userId}`);
        setSubscribersList(res.data.subscribers);
      } catch (err) {
        console.log(err);
      }
    };
    getSubscribersList();
  }, []);

  return (
    <>
      <Suspense fallback={<Loading />}>
        {subscribersList && (
          <div>
            <Navbar />
            <div className="container d-flex aling-items-center justify-content-center me-5">
              <div className="d-inline-flex overflow ">
                {subscribersList?.length ? (
                  subscribersList.map((user) => {
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
                  <span>Подписчики не найдены</span>
                )}
              </div>
            </div>
          </div>
        )}
      </Suspense>
    </>
  );
}
