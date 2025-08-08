import {useState, React} from 'react';
import { Link } from 'react-router-dom';

import Turn from './Turn.jsx';

import { useTTTUser } from '../../Providers/TTTUserProvider.jsx';
import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { usePlayer} from '../../../Providers/PlayerProvider.jsx';

import {pointsDistribution} from "../../../Helpers/helpers.js";

import './GameBoard.css';

function GameBoard() {

    const { TTTUser, setTTTUser} = useTTTUser();

    const { ActiveGame, setActiveGame } = useActiveGame();
    const { Player, setPlayer } = usePlayer();

    const [error, setError] = useState("");
    const [availableMoves, setAvailableMoves] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    const [matrix, setMatrix] = useState([-1, -1, -1, -1, -1, -1,-1, -1, -1]);
    const [computerMoves, setComputerMoves] = useState([]);
    const [userMoves, setUserMoves] = useState([]);
    const [threeInARow, setThreeInARow] = useState([]);
    const [currentTurn, setCurrentTurn] = useState(TTTUser[0]);

    return (

        <div className = "TTTboard">

            {TTTUser[1] === -1 ? (

                    <>
                    {error === "" ? (
                                        
                        <h1 className = "TTTturnBoard"> <span className='signGlitch'>Active Player: {currentTurn === 1 ? "  You" : "  Computer"} </span></h1>

                    ) : (

                        <h1 className = "TTTturnBoard"> {error} </h1>

                    )}

                    <Turn
                                
                        setError = {setError}
                        starter = {TTTUser[0]}
                        matrix = {matrix}
                        setMatrix = {setMatrix}
                        availableMoves = {availableMoves}
                        setAvailableMoves = {setAvailableMoves}
                        computerMoves = {computerMoves}
                        setComputerMoves = {setComputerMoves}
                        userMoves = {userMoves}
                        setUserMoves = {setUserMoves}
                        setThreeInARow = {setThreeInARow}
                        currentTurn = {currentTurn}
                        setCurrentTurn = {setCurrentTurn}

                    />
                </>

        ) : (
                        
            <>
                
                <h1 className = "TTTturnBoard"> <span className='signGlitch'>Game Over.</span></h1>

                <div className = "TTTfinished_chart_container">

                    {matrix.map((item, index) => (

                        matrix[index] === 1 ? (

                            threeInARow.includes(index) ? (

                                <div key = {index} className="TTTresulting_chart_win"> O </div>

                            ) : (

                                <div key = {index} className="TTTresulting_chart"> O </div>

                            )
                            
                        ) : matrix[index] === 0 ? (

                            threeInARow.includes(index) ? (

                                <div key = {index} className="TTTresulting_chart_win"> X </div>

                            ) : (

                                <div key = {index} className="TTTresulting_chart"> X </div>

                            )

                        ) : (

                            <div key = {index} className="TTTresulting_chart"> </div>

                        )

                    ))}

                </div>

                <Link to= "/TTTsummary" className = "generalbuttonGlitch" onClick={() => pointsDistribution(ActiveGame, TTTUser[1], setPlayer, Player)}>
                    View Results
                </Link>

            </>

        )}  

        </div>
        
    )
}

export default GameBoard;