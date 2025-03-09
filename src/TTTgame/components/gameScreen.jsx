import GameBoard from './gameComponents/gameBoard.jsx';
import { useStarter } from '../Providers/TTTStarterProvider.jsx';
import { useWinner } from '../Providers/TTTWinnerProvider.jsx';

function gameScreen() {

  const { Starter, setStarter} = useStarter();
  const { Winner, setWinner} = useWinner();

  const reset = () => {

    setStarter(-1);
    setWinner(-1);

  }

  return (
    <div>
      <a href = "/arcadeStart">
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