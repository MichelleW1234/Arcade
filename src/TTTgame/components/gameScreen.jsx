
import { Link } from 'react-router-dom';

import GameBoard from './gameComponents/gameBoard.jsx';

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useTTTUser } from '../Providers/TTTUserProvider.jsx';

import {resetGame} from "../Helpers/TTThelpers.js";
import {playSound, retrieveActiveGame, pointsDistribution} from "../../Helpers/helpers.js";

function gameScreen() {

  const { ActiveGame, setActiveGame} = useActiveGame();
  const { Player, setPlayer} = usePlayer();
  const { TTTUser, setTTTUser} = useTTTUser();

  const reset = () => {

    playSound(4);
    resetGame(setTTTUser);
    pointsDistribution(ActiveGame, 0, setPlayer);
    setActiveGame(retrieveActiveGame(1));

  }

  return (
    <div>

      <Link to= "/selection" className = "generalbutton" onClick={() => reset()}>
        Quit Game
      </Link>

      <div className = "gameScreenLayout">
          <h1 className ="headerwords"> Game Board: </h1>
          <GameBoard/>
      </div>
      
    </div>
  )
}

export default gameScreen
