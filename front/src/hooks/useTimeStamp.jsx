import { useState, useEffect } from "react";

export const useTimeStamp = (timestamp) => {
  const [timeAgo, setTimeAgo] = useState("");

  const updateTimeStamp = () => {
    const timeElapsed = Math.floor((new Date() - new Date(timestamp)) / 1000);

    if (timeElapsed < 60) {
      setTimeAgo(`방금 전`);
    } else if (timeElapsed < 60 * 60) {
      const minutes = Math.floor(timeElapsed / 60);
      setTimeAgo(`${minutes}분 전`);
    } else if (timeElapsed < 60 * 60 * 24) {
      const hours = Math.floor(timeElapsed / (60 * 60));
      setTimeAgo(`${hours}시간 전`);
    } else if (timeElapsed < 60 * 60 * 24 * 7) {
      const days = Math.floor(timeElapsed / (60 * 60 * 24));
      setTimeAgo(`${days}일 전`);
    } else {
      const date = new Date(timestamp).toISOString().slice(0, 10);
      setTimeAgo(date);
    }
  };

  useEffect(() => {
    updateTimeStamp();
  }, [timestamp]);

  return timeAgo;
};
