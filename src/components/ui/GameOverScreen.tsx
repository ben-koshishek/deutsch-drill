import { MAX_LIVES } from "@/constants";
import "./GameOverScreen.css";

interface GameOverScreenProps {
  onTryAgain: () => void;
  onExit: () => void;
}

export function GameOverScreen({ onTryAgain, onExit }: GameOverScreenProps) {
  return (
    <div className="game-over">
      <div className="game-over__hearts">
        {[...Array(MAX_LIVES)].map((_, i) => (
          <span key={i} className="game-over__heart">♥</span>
        ))}
      </div>
      <h2 className="game-over__title">GAME OVER</h2>
      <p className="game-over__text">You ran out of lives!</p>
      <div className="game-over__buttons">
        <button className="game-over__btn game-over__btn--primary" onClick={onTryAgain}>
          Try Again
        </button>
        <button className="game-over__btn game-over__btn--secondary" onClick={onExit}>
          Exit
        </button>
      </div>
    </div>
  );
}
