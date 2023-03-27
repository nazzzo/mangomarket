import { useState, useEffect, useCallback, useMemo } from "react";

export const useTimeStamp = (createdAt) => {
  const parsedTime = useMemo(() => new Date(Date.parse(createdAt)), [createdAt])
  const thisTime = new Date().getTime() + (1000 * 60 * 60 * 9);
  const [timeAgo, setTimeAgo] = useState("");

  const updateTimeStamp = useCallback(() => {
    const timeElapsed = Math.floor((thisTime - parsedTime) / 1000);

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
      const date = parsedTime.toISOString().slice(0, 10);
      setTimeAgo(date);
    }
  }, [thisTime, parsedTime]);

  useEffect(() => {
    updateTimeStamp();
  }, [parsedTime, updateTimeStamp]);

  return timeAgo;
};
