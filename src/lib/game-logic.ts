import { Player, TopicPair, TurnType } from "./types";

export type RoundSetup = {
  players: Player[];
  turnType: TurnType;
  topicPair: TopicPair;
  ghostWord: string;
  majorityWord: string;
};

export function setupRound(
  playerNames: string[],
  topicPairs: TopicPair[]
): RoundSetup {
  const topicPair = topicPairs[Math.floor(Math.random() * topicPairs.length)];
  const turnType: TurnType = Math.random() < 0.5 ? "wolf" : "ghost";

  // ランダムにどちらがマジョリティワードかを決定
  const aIsMajority = Math.random() < 0.5;
  const majorityWord = aIsMajority ? topicPair.wordA : topicPair.wordB;
  const ghostWord = aIsMajority ? topicPair.wordB : topicPair.wordA;

  // ウルフ回の場合、ランダムに1人をウルフに選ぶ
  const wolfIndex =
    turnType === "wolf"
      ? Math.floor(Math.random() * playerNames.length)
      : -1;

  const players: Player[] = playerNames.map((name, i) => ({
    id: i,
    name,
    assignedWord: i === wolfIndex ? ghostWord : majorityWord,
    isWolf: i === wolfIndex,
  }));

  return { players, turnType, topicPair, ghostWord, majorityWord };
}

export function checkWin(finalAnswer: string, ghostWord: string): boolean {
  return finalAnswer.trim() === ghostWord.trim();
}
