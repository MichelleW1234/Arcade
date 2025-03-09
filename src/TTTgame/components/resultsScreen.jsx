import { useStarter } from '../Providers/TTTStarterProvider.jsx';
import { useWinner } from '../Providers/TTTWinnerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import "./resultsScreen.css";

function resultsScreen() {

    const { Starter, setStarter} = useStarter();
    const { Winner, setWinner} = useWinner();
    const { ActiveGame, setActiveGame} = useActiveGame();

    const reset = () => {

        setStarter(-1);
        setWinner(-1);
        setActiveGame(["/RPSstart", 20, null, null, null]);

    }

    const resetGame = () => {

        setStarter(-1);
        setWinner(-1);
        
    }

    return (
        <div className = "screenLayout">

            <div className = "TTTscoreboard">
                <h1> Result: </h1>
                <h1>{Winner === 0 ? ("You lost. :("): Winner === 1 ? ("You won! :)") : ("It's a draw!")}</h1>
            </div>
           
           <div className = "TTTbuttonsContainer">
                <a href = "/selection">
                    <button className = "generalbutton" onClick={() => reset()}> Exit Game </button>
                </a>

                <a href = "/TTTcoinFlip">
                    <button className = "generalbutton" onClick={() => resetGame()}> Play Again </button>
                </a>
            </div>
        </div>
    )
}

export default resultsScreen