
import { Link } from 'react-router-dom';

import GameBoard from './TTTGameComponents/GameBoard.jsx';

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useTTTUser } from '../Providers/TTTUserProvider.jsx';

import {resetGame} from "../Helpers/helpers.js";
import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

function Gamescreen() {

  const { ActiveGame, setActiveGame} = useActiveGame();
  const { Player, setPlayer} = usePlayer();
  const { TTTUser, setTTTUser} = useTTTUser();

  const reset = () => {

    playSound(4);
    resetGame(setTTTUser);
    setPlayer([Player[0] - ActiveGame[1]]);
    setActiveGame(retrieveActiveGame(1));

  }

  return (
    <div>

      <Link to= "/selection" className = "generalbutton" onClick={() => reset()}>
        Quit Game
      </Link>

      <div className = "gameScreenLayout">
          <GameBoard/>
      </div>
      
    </div>
  )
}

export default Gamescreen;
