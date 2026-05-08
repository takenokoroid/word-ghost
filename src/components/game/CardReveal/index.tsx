"use client";

import { useState } from "react";
import { Player } from "@/lib/types";

type Props = {
  player: Player;
  onNext: () => void;
  isLast: boolean;
};

type Step = "pass" | "reveal";

export default function CardReveal({ player, onNext, isLast }: Props) {
  const [step, setStep] = useState<Step>("pass");

  if (step === "pass") {
    return (
      <div className="flex flex-col items-center justify-center gap-8 min-h-[60vh]">
        <p className="text-lg text-zinc-500">デバイスを渡してください</p>
        <p className="text-2xl font-bold">{player.name} の番です</p>
        <button
          onClick={() => setStep("reveal")}
          className="rounded-full bg-foreground text-background px-8 py-3 text-lg font-bold transition-colors hover:opacity-90"
        >
          カードを見る
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 min-h-[60vh]">
      <p className="text-sm text-zinc-500">{player.name} のカード</p>
      <div className="rounded-2xl border-2 border-zinc-300 dark:border-zinc-600 px-12 py-10 shadow-lg">
        <p className="text-4xl font-bold tracking-wider">
          {player.assignedWord}
        </p>
      </div>
      <p className="text-sm text-zinc-400">自分のワードを直接言ってはいけません</p>
      <button
        onClick={() => {
          setStep("pass");
          onNext();
        }}
        className="rounded-full bg-foreground text-background px-8 py-3 text-lg font-bold transition-colors hover:opacity-90"
      >
        {isLast ? "全員確認完了" : "OK・次の人へ"}
      </button>
    </div>
  );
}
