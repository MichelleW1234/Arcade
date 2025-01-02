import { useLocation } from "react-router-dom";
import { useLevel } from '../Providers/RPSLevelProvider.jsx';
import { useInput } from '../Providers/RPSInputProvider.jsx';
import { useReference } from '../Providers/RPSReferenceProvider.jsx';
import {resetLevel} from "../Helpers/RPShelpers.js";
import "./RPSGamesummary.css";

function Gamesummary (){

  const { level, setLevel } = useLevel();
  const { input, setInput } = useInput();
  const { reference, setReference } = useReference();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const computerWins = parseInt(searchParams.get("computerWins"), 10);
  const userWins = parseInt(searchParams.get("userWins"), 10);

  let winner;

  if (computerWins > userWins) {

    winner = "You lost. :(";

  } else if (computerWins < userWins) {

    winner = "You won! :)";

  } else {

    winner = "You tied. No one wins!";

  }

  return (
      <div className="RPSGameSummary">
          <h1 className = "RPSGameSummarySign"><span className="RPSGameSummarySignGlitch">Game</span> Summary:  </h1>
          <div className = "RPSStats">
              <p> Computer Wins: {computerWins} </p>
              <p> User Wins: {userWins} </p>
              <p>{winner}</p>
          </div>

          <div className = "RPSGameSummaryButtons">
            <a href="/start">
                <button className = "restartButton" onClick ={() => resetLevel(setLevel, setInput, setReference)}> Restart </button>
            </a>

            <a href="/arcadeStart">
                <button className = "quitGameButton" onClick ={() => resetLevel(setLevel, setInput, setReference)}> Exit Game </button>
            </a>
          </div>
      </div>
  );

}

export default Gamesummary;