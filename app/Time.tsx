import { Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

interface Props {
  isRunning: boolean;
  getTime: (time: string) => void;
  reset: boolean;
  setReset: (reset: boolean) => void;
}

const Time = ({ isRunning, getTime, reset, setReset }: Props) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 100);
      }, 100);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  if (reset) setTime(0);
  setReset(false);

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);

    const formated = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

    getTime(formated);

    return formated;
  };

  return <Text size="8">Time: {formatTime(time)}</Text>;
};

export default Time;
