"use client";

import { useGameState } from "@/hooks/useGameState";
import LobbyForm from "@/components/game/LobbyForm";
import CardReveal from "@/components/game/CardReveal";
import DiscussionPhase from "@/components/game/DiscussionPhase";
import AnswerSubmit from "@/components/game/AnswerSubmit";
import ResultReveal from "@/components/game/ResultReveal";

export default function GamePage() {
  const { state, dispatch } = useGameState();
  const currentPlayer = state.players[state.currentPlayerIndex];

  return (
    <div className="flex flex-col flex-1 items-center justify-center px-6 py-8">
      {state.phase === "lobby" && (
        <LobbyForm
          onStart={(names) => dispatch({ type: "START_GAME", playerNames: names })}
        />
      )}

      {state.phase === "card-reveal" && currentPlayer && (
        <CardReveal
          key={currentPlayer.id}
          player={currentPlayer}
          onNext={() => dispatch({ type: "NEXT_PLAYER" })}
          isLast={state.currentPlayerIndex === state.players.length - 1}
        />
      )}

      {state.phase === "discussion" && (
        <DiscussionPhase onEnd={() => dispatch({ type: "END_DISCUSSION" })} />
      )}

      {state.phase === "answer-submit" && (
        <AnswerSubmit
          onSubmit={(answer) => dispatch({ type: "SUBMIT_ANSWER", answer })}
        />
      )}

      {state.phase === "result" &&
        state.ghostWord &&
        state.majorityWord &&
        state.turnType &&
        state.finalAnswer && (
          <ResultReveal
            players={state.players}
            ghostWord={state.ghostWord}
            majorityWord={state.majorityWord}
            turnType={state.turnType}
            finalAnswer={state.finalAnswer}
            onNextRound={() => dispatch({ type: "NEXT_ROUND" })}
            onResetToLobby={() => dispatch({ type: "RESET_TO_LOBBY" })}
          />
        )}
    </div>
  );
}
