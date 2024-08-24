import React, { useState, useEffect } from "react";

interface ToastProps {
  text: string | null;
  duration?: number; // Optional duration prop
}

const Toast: React.FC<ToastProps> = ({ text, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [duration]);

  if (!visible) return null;

  return (
    <>
      <div className="toast toast-bottom toast-end ">
        <div className="alert alert-error">
          <span>{text}</span>
        </div>
      </div>
    </>
  );
};

export default Toast;
