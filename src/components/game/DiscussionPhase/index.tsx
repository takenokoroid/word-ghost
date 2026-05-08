"use client";

import { useState, useEffect, useCallback } from "react";

type Props = {
  onEnd: () => void;
};

const DEFAULT_SECONDS = 3 * 60;

export default function DiscussionPhase({ onEnd }: Props) {
  const [remaining, setRemaining] = useState(DEFAULT_SECONDS);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning || remaining <= 0) return;
    const id = setInterval(() => {
      setRemaining((r) => r - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning, remaining]);

  const toggleTimer = useCallback(() => {
    setIsRunning((r) => !r);
  }, []);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const timeUp = remaining <= 0;

  return (
    <div className="flex flex-col items-center justify-center gap-8 min-h-[60vh]">
      <h2 className="text-2xl font-bold">議論タイム</h2>
      <p className="text-sm text-zinc-500">
        自分のワードについて話し合いましょう（直接言うのはNG）
      </p>

      <div
        className={`text-6xl font-mono font-bold tabular-nums ${timeUp ? "text-red-500" : ""}`}
      >
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>

      <div className="flex gap-4">
        {!timeUp && (
          <button
            onClick={toggleTimer}
            className="rounded-full border border-zinc-300 dark:border-zinc-600 px-6 py-2.5 text-base transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {isRunning ? "一時停止" : "再開"}
          </button>
        )}
        <button
          onClick={onEnd}
          className="rounded-full bg-foreground text-background px-6 py-2.5 text-base font-bold transition-colors hover:opacity-90"
        >
          議論終了
        </button>
      </div>
    </div>
  );
}
