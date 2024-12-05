import React, { useEffect } from "react";

const Toast = ({ message, setMessage }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  return (
    <div
      className={`fixed items-center p-3 justify-center rounded-lg shadow-lg transition-transform transform ${
        message ? "translate-x-0" : "translate-x-full"
      } ${
        message?.type === "success"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
      style={{
        transition: "transform 0.3s ease-in-out",
      }}
    >
      {message && <span>{message.text}</span>}
    </div>
  );
};

export default Toast;
