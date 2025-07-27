import { Link } from 'react-router-dom';

import { useRPSUser} from '../Providers/RPSUserProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePlayer} from '../../Providers/PlayerProvider.jsx';

import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";
import {resetLevel} from "../Helpers/helpers.js";

function Summaryscreen (){

  const {RPSUser, setRPSUser} = useRPSUser();

  const { ActiveGame, setActiveGame} = useActiveGame();
  const { Player, setPlayer } = usePlayer();

  let winner;

  if (RPSUser[4] > RPSUser[3]) {

    winner = "You lost. :(";

  } else if (RPSUser[4] < RPSUser[3]) {

    winner = "You won! :)";

  } else {

    winner = "You tied. No one wins!";

  }

  const resetGame = () => {

    playSound(19);
    resetLevel(setRPSUser);

  }

  const reset = () => {

    playSound(4);
    resetLevel(setRPSUser);
    setActiveGame(retrieveActiveGame(1));

  }

  return (
      <div className="screenLayout">
          <div className = "StatsBoard">
              <p> Computer Wins: {RPSUser[4]} </p>
              <p> User Wins: {RPSUser[3]} </p>
              <p><span className = "StatsGlitch">{winner}</span></p>
          </div>

          {Player[0] >= ActiveGame[1] ? (

            <Link to="/RPSlevels" className = "generalbutton" onClick={() => resetGame()}>
              Play Again
            </Link>

          ) : (

            <p className = "largefont"> You don't have enough points to play this game again.</p>

          )}
          
          <Link to="/selection" className = "generalbutton" onClick={() => reset()}>
            Exit Game
          </Link>
            
          
      </div>
  );

}

export default Summaryscreen;