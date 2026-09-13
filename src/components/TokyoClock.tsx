"use client";

import { useEffect, useState } from "react";

const formatTokyoTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

export default function TokyoClock() {
  const [tokyoTime, setTokyoTime] = useState<string | null>(null);

  useEffect(() => {
    const updateTokyoTime = () => setTokyoTime(formatTokyoTime());
    updateTokyoTime();
    const intervalId = window.setInterval(updateTokyoTime, 1000 * 30);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <span className="label-type text-subtle tabular-nums">Tokyo {tokyoTime ?? "--:--"} JST</span>
  );
}
