import { useReducer } from "react";
import { GameState, GamePhase } from "@/lib/types";
import { setupRound } from "@/lib/game-logic";
import { TOPIC_PAIRS } from "@/lib/topics";

type Action =
  | { type: "START_GAME"; playerNames: string[] }
  | { type: "SHOW_CARD" }
  | { type: "HIDE_CARD" }
  | { type: "NEXT_PLAYER" }
  | { type: "START_DISCUSSION" }
  | { type: "END_DISCUSSION" }
  | { type: "SUBMIT_ANSWER"; answer: string }
  | { type: "NEW_ROUND" };

const initialState: GameState = {
  phase: "lobby",
  players: [],
  topicPair: null,
  turnType: null,
  currentPlayerIndex: 0,
  ghostWord: null,
  majorityWord: null,
  finalAnswer: null,
};

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "START_GAME": {
      const round = setupRound(action.playerNames, TOPIC_PAIRS);
      return {
        ...state,
        phase: "card-reveal",
        players: round.players,
        topicPair: round.topicPair,
        turnType: round.turnType,
        ghostWord: round.ghostWord,
        majorityWord: round.majorityWord,
        currentPlayerIndex: 0,
        finalAnswer: null,
      };
    }
    case "NEXT_PLAYER": {
      const nextIndex = state.currentPlayerIndex + 1;
      if (nextIndex >= state.players.length) {
        const nextPhase: GamePhase =
          state.phase === "card-reveal" ? "discussion" : "result";
        return { ...state, phase: nextPhase, currentPlayerIndex: 0 };
      }
      return { ...state, currentPlayerIndex: nextIndex };
    }
    case "END_DISCUSSION":
      return { ...state, phase: "answer-submit", currentPlayerIndex: 0 };
    case "SUBMIT_ANSWER": {
      return {
        ...state,
        finalAnswer: action.answer,
        phase: "result",
      };
    }
    case "NEW_ROUND":
      return { ...initialState };
    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}
