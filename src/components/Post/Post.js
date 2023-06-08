import React, { useState } from "react";
import instance from "../../axios";
import noAvatar from "../../static/img/no-avatar.png";
import { format } from "timeago.js";

export default function Post({ postId }) {
  const [post, setPost] = useState(null);

  React.useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await instance.get(`/post/${postId}`);
        setPost(data);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, []);

  return (
    <>
      {post && (
        <div className="row d-flex justify-content-center mb-2">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-start align-items-center">
                <img
                  className="rounded-circle shadow-1-strong me-3"
                  src={
                    post.authorId.avatarUrl ? post.authorId.avatarUrl : noAvatar
                  }
                  alt=""
                  width="60"
                  height="60"
                />
                <div>
                  <h6 className="fw-bold text-primary mb-1">
                    {post.authorId.firstName} {post.authorId.lastName}
                  </h6>
                  <p className="text-muted small mb-0">
                    {format(post.createdAt)}
                  </p>
                </div>
              </div>

              {post.imageUrl && (
                <div className="mt-2">
                  <img
                    className=""
                    src={post.imageUrl}
                    alt=""
                    width="300"
                    height="300"
                  />
                </div>
              )}

              <p className="mt-3 mb-4 pb-2">{post.text}</p>

              <div className="small d-flex justify-content-end">
                <p className="mb-0">{post.viewsCount}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
