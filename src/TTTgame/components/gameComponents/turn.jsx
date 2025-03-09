import './turn.css';
import {useState, useEffect, React} from 'react';
import {computerMoveDecider, winnerwinnerchickendinner} from "../../Helpers/helpers.js";

function turn({setError, matrix, setMatrix, availableMoves, setAvailableMoves, computerMoves, 
    setComputerMoves, userMoves, setUserMoves, setWinner, setThreeInARow, currentTurn, setCurrentTurn}) {

    const [isLoading, setIsLoading] = useState(true); // Flag to trigger loading state

    useEffect(() => {
        if (isLoading) {

            const result = winnerwinnerchickendinner(matrix, userMoves, computerMoves, setThreeInARow);

            setTimeout(() => {
                setIsLoading(false); // Stop loading
                setWinner(result); // Set the final result after the delay
            }, 200); // Adjust time as needed for UI feedback
        }
    }, [isLoading]); // Runs when isLoading or result changes


    const nextMove = () => {

        if (currentTurn === 0){

            setCurrentTurn(1);

        } else {

            setCurrentTurn(0);

        }

    }
    
    const takenMove = (index, player) => {

        setAvailableMoves((prevMoves) => prevMoves.filter((item) => item !== index));

        const newMatrix = [...matrix];
        newMatrix[index] = player;
        setMatrix(newMatrix);

    }

    const userMove = (index) => {

        if (currentTurn === 1){

            setUserMoves(prevMoves => [...prevMoves, index]);
            setIsLoading(true);

            takenMove(index, 1);
            nextMove();
    
        } else {

            setError("It's not your turn yet.");

        }
    
    }

    useEffect(() => {

        const computerMove = () => {

            const move = computerMoveDecider(availableMoves, computerMoves, userMoves);

            setComputerMoves(prevMoves => [...prevMoves, move]);
            setIsLoading(true);

            takenMove(move, 0);
            nextMove();
            setError("");
           
        }

        if (currentTurn === 0) {

            // Trigger the computer's move after a delay (for example, every 2 seconds)
            const interval = setInterval(computerMove, 1800);
    
            // Cleanup interval when component is unmounted or when the turn changes
            return () => clearInterval(interval);

        }

    }, [currentTurn]);


    return(

        <div className = "chart_container">

            {matrix.map((item, index) => (

                matrix[index] === 1 ? (

                    <div className="chart_selected_user"> O </div>

                ) : matrix[index] === 0 ? (

                    <div className="chart_selected_computer"> X </div>

                ) : (

                    <button className="chart_button" onClick={() => userMove(index)}> </button>

                )

            ))}

        </div>

    )

}

export default turn