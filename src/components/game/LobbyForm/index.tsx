"use client";

import { useState } from "react";

type Props = {
  onStart: (playerNames: string[]) => void;
};

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 6;

export default function LobbyForm({ onStart }: Props) {
  const [names, setNames] = useState<string[]>(["", "", "", ""]);

  const addPlayer = () => {
    if (names.length < MAX_PLAYERS) {
      setNames([...names, ""]);
    }
  };

  const removePlayer = (index: number) => {
    if (names.length > MIN_PLAYERS) {
      setNames(names.filter((_, i) => i !== index));
    }
  };

  const updateName = (index: number, value: string) => {
    const updated = [...names];
    updated[index] = value;
    setNames(updated);
  };

  const canStart = names.every((n) => n.trim().length > 0);

  const handleStart = () => {
    if (canStart) {
      onStart(names.map((n) => n.trim()));
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
      <h2 className="text-xl font-bold">プレイヤー登録</h2>
      <div className="flex flex-col gap-3 w-full">
        {names.map((name, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-sm text-zinc-500 w-6 shrink-0">
              {i + 1}.
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => updateName(i, e.target.value)}
              placeholder={`プレイヤー${i + 1}`}
              className="flex-1 rounded-lg border border-zinc-300 px-3 py-2.5 text-base dark:border-zinc-700 dark:bg-zinc-900"
            />
            {names.length > MIN_PLAYERS && (
              <button
                onClick={() => removePlayer(i)}
                className="text-zinc-400 hover:text-red-500 text-lg px-1"
              >
                &times;
              </button>
            )}
          </div>
        ))}
      </div>

      {names.length < MAX_PLAYERS && (
        <button
          onClick={addPlayer}
          className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
        >
          + プレイヤーを追加
        </button>
      )}

      <button
        onClick={handleStart}
        disabled={!canStart}
        className="w-full rounded-full bg-foreground text-background py-3 text-lg font-bold transition-colors hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ゲーム開始
      </button>
    </div>
  );
}
