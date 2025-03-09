import GameBoard from './gameComponents/gameBoard.jsx';
import { useStarter } from '../Providers/TTTStarterProvider.jsx';
import { useWinner } from '../Providers/TTTWinnerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';

function gameScreen() {

  const { Starter, setStarter} = useStarter();
  const { Winner, setWinner} = useWinner();
  const { ActiveGame, setActiveGame} = useActiveGame();

  const reset = () => {

    setStarter(-1);
    setWinner(-1);
    setActiveGame(["/RPSstart", 10, null, null, null]);

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