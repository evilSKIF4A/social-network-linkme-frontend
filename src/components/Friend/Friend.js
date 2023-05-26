import React, { useState } from "react";
import "./Friend.css";
import instance from "../../axios";
import noAvatar from "../../static/img/no-avatar.png";

export default function Friend({ id }) {
  const [dataFriend, setDataFriend] = useState(null);

  React.useEffect(() => {
    const getFriend = async () => {
      try {
        const data = await instance.get(`/users/${id}`);
        setDataFriend(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriend();
  }, []);

  return (
    dataFriend && (
      <div className="me-2" key={dataFriend._id}>
        <a
          className="text-decoration-none color-black"
          href={`/users/${dataFriend._id}`}
        >
          <img
            className="bd-radius mt-3"
            src={dataFriend.avatarUrl ? dataFriend.avatarUrl : noAvatar}
            width="50px"
            height="50px"
            alt=""
          />
          <p className="center">{dataFriend.firstName}</p>
        </a>
      </div>
    )
  );
}
