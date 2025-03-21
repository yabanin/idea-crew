import React, { useState } from "react";
import axios from "axios";

const APISend = () => {
  const [text, setText] = useState("");
  const [responseText, setResponseText] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/complete", {
        text: text,
        field: "value"
      });
      setResponseText(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md max-w-md mx-auto">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="テキストを入力"
        className="border p-2 rounded w-full"
      />
      <button
        onClick={handleSubmit}
        className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        送信
      </button>

      {responseText && (
        <div className="mt-4 p-2 bg-gray-100 border rounded">
          <strong>受け取ったデータ:</strong> {responseText}
        </div>
      )}
    </div>
  );
};

export default APISend;