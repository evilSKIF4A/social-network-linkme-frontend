import React, { useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import "./Emoji.css";

export default function Emoji({ setCurrentEmoji }) {
  const [isPickerVisible, setPickerVisible] = useState(false);
  return (
    <div className="d-flex flex-column align-items-center">
      <button
        className="btn btn-primary"
        onClick={() => setPickerVisible(!isPickerVisible)}
      >
        😀
      </button>
      <div
        className={
          isPickerVisible ? "d-block position-absolute bottom" : "d-none"
        }
      >
        <Picker
          data={data}
          previewPosition="none"
          onEmojiSelect={(e) => {
            setCurrentEmoji(e.native);
            setPickerVisible(!isPickerVisible);
          }}
        />
      </div>
    </div>
  );
}
