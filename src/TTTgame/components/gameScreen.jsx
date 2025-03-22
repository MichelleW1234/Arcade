import GameBoard from './gameComponents/gameBoard.jsx';

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { useTTTUser } from '../Providers/TTTUserProvider.jsx';

import {resetGame} from "../Helpers/TTThelpers.js";
import {retrieveActiveGame} from "../../Helpers/helpers.js";

function gameScreen() {

  const { ActiveGame, setActiveGame} = useActiveGame();
  const { TTTUser, setTTTUser} = useTTTUser();

  const reset = () => {

    resetGame(setTTTUser);
    setActiveGame(retrieveActiveGame(1));

  }

  return (
    <div>
      <a href = "/selection">
        <button className = "generalbutton" onClick={() => reset()}> Exit Game </button>
      </a>
      <div className = "screenLayout">
          <h1 className ="headerwords"> Game Board: </h1>
          <GameBoard/>
      </div>
    </div>
  )
}

export default gameScreen