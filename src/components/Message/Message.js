import React, { useState } from "react";
import "./Message.css";
import { format } from "timeago.js";
import noAvatar from "../../static/img/no-avatar.png";

export default function Message({
  ownId,
  message,
  avatarSender,
  avatarReceiver,
}) {
  return (
    <>
      {message && (
        <div
          className={
            "d-flex flex-row " +
            (message.authorId === ownId
              ? "justify-content-end own"
              : "justify-content-start not-own")
          }
        >
          <img
            className="icon bd-radius"
            src={
              message.authorId === ownId
                ? avatarSender
                  ? avatarSender
                  : noAvatar
                : avatarReceiver
                ? avatarReceiver
                : noAvatar
            }
            width="50px"
            height="50px"
            alt=""
          />
          <div>
            <div
              className={
                message.authorId === ownId
                  ? "own-color ms-2"
                  : "not-own-color ms-2"
              }
            >
              <p className="small p-2 ms-1 mb-1 rounded-3 text-size">
                {message.message.split("<br>").map((mes, index) => {
                  if (mes) {
                    return (
                      <span key={index}>
                        {mes}
                        <br />
                      </span>
                    );
                  }
                })}
              </p>
            </div>
            <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
              {format(message.createdAt)}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
