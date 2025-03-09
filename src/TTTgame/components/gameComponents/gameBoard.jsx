import './gameBoard.css';
import {useState, React} from 'react';
import { useStarter } from '../../Providers/StarterProvider.jsx';
import { useWinner } from '../../Providers/WinnerProvider.jsx';
import Turn from './turn.jsx';

function gameBoard() {

    const {Starter, setStarter} = useStarter();
    const { Winner, setWinner } = useWinner();

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

                <div className = "board">

                    {error === "" ? (
                                        
                        <h1 className = "turnBoard">Current turn: {currentTurn === 1 ? "You" : "Computer"}</h1>

                    ) : (

                        <h1 className = "turnBoard"> {error} </h1>

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

                <div className = "endingContainer"> 

                    <div className = "board">
                        
                        <h1 className = "turnBoard">Game Over!</h1>

                        <div className = "finished_chart_container">

                            {matrix.map((item, index) => (

                                matrix[index] === 1 ? (

                                    threeInARow.includes(index) ? (

                                        <div className="resulting_chart_win"> O </div>
        
                                    ) : (

                                        <div className="resulting_chart"> O </div>

                                    )
                                    
                                ) : matrix[index] === 0 ? (

                                    threeInARow.includes(index) ? (

                                        <div className="resulting_chart_win"> X </div>
        
                                    ) : (

                                        <div className="resulting_chart"> X </div>

                                    )

                                ) : (

                                    <div className="resulting_chart"> </div>

                                )

                            ))}

                        </div>

                    </div> 

                    <a href = "/TTTresults">
                        <button className = "generalbutton"> Game Results </button>
                    </a>

                </div> 
                
            )} 

        </div>
        
    )
}

export default gameBoard