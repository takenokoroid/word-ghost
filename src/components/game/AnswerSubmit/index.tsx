"use client";

import { useState } from "react";
import { Player } from "@/lib/types";

type Props = {
  player: Player;
  onSubmit: (answer: string) => void;
};

type Step = "pass" | "input";

export default function AnswerSubmit({ player, onSubmit }: Props) {
  const [step, setStep] = useState<Step>("pass");
  const [answer, setAnswer] = useState("");

  if (step === "pass") {
    return (
      <div className="flex flex-col items-center justify-center gap-8 min-h-[60vh]">
        <p className="text-lg text-zinc-500">デバイスを渡してください</p>
        <p className="text-2xl font-bold">{player.name} の番です</p>
        <button
          onClick={() => setStep("input")}
          className="rounded-full bg-foreground text-background px-8 py-3 text-lg font-bold transition-colors hover:opacity-90"
        >
          回答する
        </button>
      </div>
    );
  }

  const canSubmit = answer.trim().length > 0;

  return (
    <div className="flex flex-col items-center justify-center gap-8 min-h-[60vh]">
      <p className="text-sm text-zinc-500">{player.name} の回答</p>
      <p className="text-lg font-bold">ゴーストの対抗語は？</p>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="対抗語を入力"
        autoFocus
        className="w-64 rounded-lg border border-zinc-300 px-4 py-3 text-center text-xl dark:border-zinc-700 dark:bg-zinc-900"
      />
      <button
        onClick={() => {
          if (canSubmit) {
            onSubmit(answer.trim());
            setAnswer("");
            setStep("pass");
          }
        }}
        disabled={!canSubmit}
        className="rounded-full bg-foreground text-background px-8 py-3 text-lg font-bold transition-colors hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        送信
      </button>
    </div>
  );
}
