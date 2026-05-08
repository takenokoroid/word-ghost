export type TopicPair = {
  id: string;
  wordA: string;
  wordB: string;
};

export type TurnType = "wolf" | "ghost";

export type Player = {
  id: number;
  name: string;
  assignedWord: string;
  isWolf: boolean;
  answer: string | null;
};

export type GamePhase =
  | "lobby"
  | "card-reveal"
  | "discussion"
  | "answer-submit"
  | "result";

export type GameState = {
  phase: GamePhase;
  players: Player[];
  topicPair: TopicPair | null;
  turnType: TurnType | null;
  currentPlayerIndex: number;
  ghostWord: string | null;
  majorityWord: string | null;
};
