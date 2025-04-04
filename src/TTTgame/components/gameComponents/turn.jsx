import './turn.css';
import {useState, useEffect, React} from 'react';

import { useTTTUser } from '../../Providers/TTTUserProvider.jsx';

import {computerMoveDecider, winnerwinnerchickendinner} from "../../Helpers/TTThelpers.js";

import {playSound} from "../../../Helpers/helpers.js";

function turn({setError, matrix, setMatrix, availableMoves, setAvailableMoves, computerMoves, 
    setComputerMoves, userMoves, setUserMoves, setThreeInARow, currentTurn, setCurrentTurn}) {

    const { TTTUser, setTTTUser} = useTTTUser();

    const [isLoading, setIsLoading] = useState(true); // Flag to trigger loading state

    useEffect(() => {
        if (isLoading) {

            const result = winnerwinnerchickendinner(matrix, userMoves, computerMoves, setThreeInARow);

            setTimeout(() => {
                setIsLoading(false); // Stop loading

                setTTTUser((prev) => {
                    const updatedUser = [...prev];
                    updatedUser[1] = result;
                    return updatedUser;
                });

                if (result != -1){

                    playSound(6);

                }

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

            playSound(3);
            setUserMoves(prevMoves => [...prevMoves, index]);
            setIsLoading(true);

            takenMove(index, 1);
            nextMove();
    
        } else {

            playSound(5);
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

        <div className = "TTTchart_container">

            {matrix.map((item, index) => (

                matrix[index] === 1 ? (

                    <div key = {index} className="TTTchart_selected_user"> O </div>

                ) : matrix[index] === 0 ? (

                    <div key = {index} className="TTTchart_selected_computer"> X </div>

                ) : (

                    <button key = {index} className="TTTchart_button" onClick={() => userMove(index)}> </button>

                )

            ))}

        </div>

    )

}

export default turn