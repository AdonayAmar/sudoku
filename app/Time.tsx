import { Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

interface Props {
  isRunning: boolean;
}

const Time = ({ isRunning }: Props) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning!) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return <Text>Time: {formatTime(time)}</Text>;
};

export default Time;
