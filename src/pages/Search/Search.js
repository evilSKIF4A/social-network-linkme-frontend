import React, { Suspense, useState } from "react";
import "./Search.css";
import { useLocation } from "react-router-dom";
import instance from "../../axios";
import Navbar from "../../components/Navbar/Navbar";
import noAvatar from "../../static/img/no-avatar.png";
import Loading from "../../components/Loading/Loading";

export default function Search() {
  const { state } = useLocation();

  const { fname, lname } = state;
  const [resultSearch, setResultSearch] = useState([]);

  React.useEffect(() => {
    const getResult = async () => {
      try {
        const res = await instance.get(
          `/users/find/${fname ? fname : "$"}/${lname ? lname : "$"}`
        );
        setResultSearch(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getResult();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Navbar />
        <div className="container d-flex aling-items-center justify-content-center me-5">
          <div className="d-inline-flex overflow ">
            {resultSearch.map((user) => {
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
            })}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
