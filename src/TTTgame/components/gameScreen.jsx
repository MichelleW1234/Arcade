import GameBoard from './gameComponents/gameBoard.jsx';
import { useStarter } from '../Providers/TTTStarterProvider.jsx';
import { useWinner } from '../Providers/TTTWinnerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import {retrieveActiveGame} from "../../Helpers/helpers.js";

function gameScreen() {

  const { Starter, setStarter} = useStarter();
  const { Winner, setWinner} = useWinner();
  const { ActiveGame, setActiveGame} = useActiveGame();

  const reset = () => {

    setStarter(-1);
    setWinner(-1);
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