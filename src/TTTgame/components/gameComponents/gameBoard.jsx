import './gameBoard.css';
import {useState, React} from 'react';
import { useStarter } from '../../Providers/TTTStarterProvider.jsx';
import { useWinner } from '../../Providers/TTTWinnerProvider.jsx';


import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { usePlayer} from '../../../Providers/PlayerProvider.jsx';
import {pointsDistribution} from "../../../Helpers/helpers.js";


import Turn from './turn.jsx';

function gameBoard() {

    const {Starter, setStarter} = useStarter();
    const { Winner, setWinner } = useWinner();
    const { ActiveGame, setActiveGame } = useActiveGame();
    const { Player, setPlayer } = usePlayer();

    const [error, setError] = useState("");
    const [availableMoves, setAvailableMoves] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    const [matrix, setMatrix] = useState([-1, -1, -1, -1, -1, -1,-1, -1, -1]);
    const [computerMoves, setComputerMoves] = useState([]);
    const [userMoves, setUserMoves] = useState([]);
    const [threeInARow, setThreeInARow] = useState([]);
    const [currentTurn, setCurrentTurn] = useState(Starter);

    return (
        
        <div>

            {Winner === -1 ? (

                <div className = "TTTboard">

                    {error === "" ? (
                                        
                        <h1 className = "TTTturnBoard">Current turn: {currentTurn === 1 ? "You" : "Computer"}</h1>

                    ) : (

                        <h1 className = "TTTturnBoard"> {error} </h1>

                    )}

                    <Turn
                                
                        setError = {setError}
                        starter = {Starter}
                        matrix = {matrix}
                        setMatrix = {setMatrix}
                        availableMoves = {availableMoves}
                        setAvailableMoves = {setAvailableMoves}
                        computerMoves = {computerMoves}
                        setComputerMoves = {setComputerMoves}
                        userMoves = {userMoves}
                        setUserMoves = {setUserMoves}
                        setWinner = {setWinner}
                        setThreeInARow = {setThreeInARow}
                        currentTurn = {currentTurn}
                        setCurrentTurn = {setCurrentTurn}

                    />

                </div>

            ) : (

                <div className = "TTTendingContainer"> 

                    <div className = "TTTboard">
                        
                        <h1 className = "TTTturnBoard">Game Over!</h1>

                        <div className = "TTTfinished_chart_container">

                            {matrix.map((item, index) => (

                                matrix[index] === 1 ? (

                                    threeInARow.includes(index) ? (

                                        <div className="TTTresulting_chart_win"> O </div>
        
                                    ) : (

                                        <div className="TTTresulting_chart"> O </div>

                                    )
                                    
                                ) : matrix[index] === 0 ? (

                                    threeInARow.includes(index) ? (

                                        <div className="TTTresulting_chart_win"> X </div>
        
                                    ) : (

                                        <div className="TTTresulting_chart"> X </div>

                                    )

                                ) : (

                                    <div className="TTTresulting_chart"> </div>

                                )

                            ))}

                        </div>

                    </div> 

                    <a href = "/TTTresults">
                        <button className = "generalbutton" onClick={() => pointsDistribution(ActiveGame, Winner, setPlayer)}> Game Results </button>
                    </a>

                </div> 
                
            )} 

        </div>
        
    )
}

export default gameBoard