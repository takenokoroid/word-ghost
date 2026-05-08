"use client";

import { Player, TurnType } from "@/lib/types";
import { checkWin } from "@/lib/game-logic";

type Props = {
  players: Player[];
  ghostWord: string;
  majorityWord: string;
  turnType: TurnType;
  onNewRound: () => void;
};

export default function ResultReveal({
  players,
  ghostWord,
  majorityWord,
  turnType,
  onNewRound,
}: Props) {
  const { won, correctPlayers } = checkWin(players, ghostWord);
  const wolf = players.find((p) => p.isWolf);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto min-h-[60vh] justify-center">
      {/* 勝敗 */}
      <div
        className={`text-3xl font-bold ${won ? "text-green-600" : "text-red-500"}`}
      >
        {won ? "全員正解！" : "残念..."}
      </div>

      {/* ゴーストカード */}
      <div className="rounded-2xl border-2 border-zinc-300 dark:border-zinc-600 px-10 py-6 shadow-lg text-center">
        <p className="text-sm text-zinc-500 mb-1">ゴーストの対抗語</p>
        <p className="text-3xl font-bold">{ghostWord}</p>
      </div>

      {/* お題情報 */}
      <div className="text-center text-sm text-zinc-500">
        <p>
          みんなのワード: <span className="font-bold text-foreground">{majorityWord}</span>
        </p>
        <p className="mt-1">
          {turnType === "wolf" ? "ウルフ回" : "ゴースト回"}
        </p>
      </div>

      {/* ウルフ正体 */}
      {turnType === "wolf" && wolf && (
        <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 px-6 py-3 text-center">
          <p className="text-sm text-zinc-500">ウルフの正体</p>
          <p className="text-lg font-bold">{wolf.name}</p>
        </div>
      )}

      {/* 各プレイヤーの回答 */}
      <div className="w-full">
        <p className="text-sm text-zinc-500 mb-2 text-center">みんなの回答</p>
        <div className="flex flex-col gap-2">
          {players.map((p) => {
            const isCorrect = p.answer === ghostWord;
            return (
              <div
                key={p.id}
                className={`flex justify-between items-center rounded-lg px-4 py-2 ${
                  isCorrect
                    ? "bg-green-50 dark:bg-green-900/20"
                    : "bg-red-50 dark:bg-red-900/20"
                }`}
              >
                <span className="font-medium">
                  {p.name}
                  {p.isWolf && (
                    <span className="ml-1 text-xs text-zinc-400">
                      (ウルフ)
                    </span>
                  )}
                </span>
                <span className={isCorrect ? "text-green-600" : "text-red-500"}>
                  {p.answer}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 正解者数 */}
      {!won && (
        <p className="text-sm text-zinc-500">
          正解: {correctPlayers.length} / {players.length} 人
        </p>
      )}

      <button
        onClick={onNewRound}
        className="w-full rounded-full bg-foreground text-background py-3 text-lg font-bold transition-colors hover:opacity-90 mt-4"
      >
        もう一回
      </button>
    </div>
  );
}
