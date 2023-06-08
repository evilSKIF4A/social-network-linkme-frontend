import React, { useState } from "react";
import "./WindowPost.css";
import { useSelector } from "react-redux";
import instance from "../../axios";

export default function WindowPost({ userId, authorId, setPosts }) {
  const [value, setValue] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.trim() === "") return;
    try {
      const text = value;
      const params = {
        text,
        imageUrl,
        authorId,
        userId,
      };

      const { data } = await instance.post("/post/create", params);
      setPosts((prev) => [...prev, data]);
      setValue("");
      setImageUrl("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-outline">
      <input
        className="form-control mb-3"
        onChange={(e) => setImageUrl(e.target.value)}
        value={imageUrl}
      />
      <textarea
        className="form-control mb-3"
        rows="4"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      ></textarea>

      <button className="button-post mb-3" onClick={handleSubmit}>
        Отправить
      </button>
    </div>
  );
}
