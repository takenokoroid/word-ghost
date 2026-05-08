"use client";

import { useState } from "react";

type Props = {
  onSubmit: (answer: string) => void;
};

export default function AnswerSubmit({ onSubmit }: Props) {
  const [answer, setAnswer] = useState("");
  const canSubmit = answer.trim().length > 0;

  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-[60vh] w-full max-w-sm mx-auto">
      <p className="text-sm text-zinc-500">全員で話し合って</p>
      <p className="text-2xl font-bold">ゴーストの対抗語は？</p>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="対抗語を入力"
        autoFocus
        className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-center text-xl dark:border-zinc-700 dark:bg-zinc-900"
      />
      <button
        onClick={() => {
          if (canSubmit) onSubmit(answer.trim());
        }}
        disabled={!canSubmit}
        className="w-full rounded-full bg-foreground text-background py-3 text-lg font-bold transition-colors hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        提出する
      </button>
      <p className="text-xs text-zinc-400 text-center">
        提出するとゴーストカードが開示されます
      </p>
    </div>
  );
}
