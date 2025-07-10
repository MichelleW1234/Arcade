import {useState, React} from 'react';
import { Link } from 'react-router-dom';

import Turn from './Turn.jsx';

import { useTTTUser } from '../../Providers/TTTUserProvider.jsx';
import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { usePlayer} from '../../../Providers/PlayerProvider.jsx';

import {playSound, pointsDistribution} from "../../../Helpers/helpers.js";

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

    const results = () => {

        playSound(1);
        pointsDistribution(ActiveGame, TTTUser[1], setPlayer);

    }

    return (
        
        <div>

            {TTTUser[1] === -1 ? (

                <div className = "TTTboard">

                    {error === "" ? (
                                        
                        <h1 className = "TTTturnBoard"> Current turn: {currentTurn === 1 ? "  You" : "  Computer"} </h1>

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

                </div>

            ) : (

                <div className = "TTTendingContainer"> 

                    <div className = "TTTboard">
                        
                        <h1 className = "TTTturnBoard"> Game Over! </h1>

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

                    </div> 

                    <Link to= "/TTTsummary" className = "generalbuttonGlitch" onClick={() => results()}>
                        Game Results
                    </Link>

                </div> 
                
            )} 

        </div>
        
    )
}

export default GameBoard;