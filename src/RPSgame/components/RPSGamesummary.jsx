import { useRPSUser} from '../Providers/RPSUserProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePlayer} from '../../Providers/PlayerProvider.jsx';

import {retrieveActiveGame} from "../../Helpers/helpers.js";
import {resetLevel} from "../Helpers/RPShelpers.js";

import "./RPSGamesummary.css";

function Gamesummary (){

  const {RPSUser, setRPSUser} = useRPSUser();

  const { ActiveGame, setActiveGame} = useActiveGame();
  const { Player, setPlayer } = usePlayer();

  let winner;

  if (Player[0] < Player[1]) {

    winner = "You lost. :(";

  } else if (Player[0] > Player[1]) {

    winner = "You won! :)";

  } else {

    winner = "You tied. No one wins!";

  }

  const reset = () => {

    resetLevel(setRPSUser);
    setActiveGame(retrieveActiveGame(1));

  }

  return (
      <div className="screenLayout">
          <h1 className = "RPSGameSummarySign"><span className="RPSGameSummarySignGlitch">Game</span> Summary:  </h1>
          <div className = "RPSStats">
              <p> Computer Wins: {RPSUser[4]} </p>
              <p> User Wins: {RPSUser[3]} </p>
              <p><span className = "RPSStatsGlitch">{winner}</span></p>
          </div>

          {Player[0] >= ActiveGame[1] ? (

            <a href="/RPSlevels" className = "generalbutton" onClick={() => resetLevel(setRPSUser)}>
              Play Again
            </a>

          ) : (

            <p className = "largefont"> You don't have enough points to play this game again.</p>

          )}

          <a href="/selection" className = "generalbutton" onClick={() => reset()}>
              Exit Game
          </a>
          
      </div>
  );

}

export default Gamesummary;