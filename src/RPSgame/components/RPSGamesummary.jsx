import { useLocation } from "react-router-dom";
import { useLevel } from '../Providers/RPSLevelProvider.jsx';
import { useInput } from '../Providers/RPSInputProvider.jsx';
import { useReference } from '../Providers/RPSReferenceProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {resetLevel} from "../Helpers/RPShelpers.js";
import {retrieveActiveGame} from "../../Helpers/helpers.js";
import "./RPSGamesummary.css";

function Gamesummary (){

  const { level, setLevel } = useLevel();
  const { input, setInput } = useInput();
  const { reference, setReference } = useReference();
  const { ActiveGame, setActiveGame} = useActiveGame();

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

  const reset = () => {

    resetLevel(setLevel, setInput, setReference);
    setActiveGame(retrieveActiveGame(1));

  }

  return (
      <div className="screenLayout">
          <h1 className = "RPSGameSummarySign"><span className="RPSGameSummarySignGlitch">Game</span> Summary:  </h1>
          <div className = "RPSStats">
              <p> Computer Wins: {computerWins} </p>
              <p> User Wins: {userWins} </p>
              <p>{winner}</p>
          </div>

          <div className = "RPSGameSummaryButtons">
            <a href="/RPSstart">
                <button className = "generalbutton" onClick ={() => resetLevel(setLevel, setInput, setReference)}> Restart </button>
            </a>

            <a href="/selection">
                <button className = "generalbutton" onClick ={() => reset}> Exit Game </button>
            </a>
          </div>
      </div>
  );

}

export default Gamesummary;