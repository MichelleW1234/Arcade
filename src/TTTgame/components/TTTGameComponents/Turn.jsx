import './Turn.css';
import {useEffect} from 'react';

import { useTTTUser } from '../../Providers/TTTUserProvider.jsx';

import {computerMoveDecider, winnerwinnerchickendinner} from "../../Helpers/helpers.js";

import {playSound} from "../../../Helpers/helpers.js";

function Turn({setError, matrix, setMatrix, availableMoves, setAvailableMoves, computerMoves, 
    setComputerMoves, userMoves, setUserMoves, setThreeInARow, currentTurn, setCurrentTurn}) {

    const { TTTUser, setTTTUser} = useTTTUser();

    useEffect(() => {

        if (TTTUser[1] !== -1){

            return;

        }

        let result = winnerwinnerchickendinner(matrix, userMoves, computerMoves, setThreeInARow);

        if (result !== -1){

            playSound(6);

            setTTTUser(prev => {
                const updatedUser = [...prev];
                updatedUser[1] = result;
                return updatedUser;
            });

        }

    }, [matrix, TTTUser]);

    useEffect(() => {

        if (TTTUser[1] !== -1 || currentTurn === 1){

            return;

        }

        const interval = setInterval(() => {

            const move = computerMoveDecider(availableMoves, computerMoves, userMoves);
        
            setComputerMoves(prev => [...prev, move]);
            takenMove(move, 0);
            nextMove();
            setError("");

        }, 1800);

        return () => clearInterval(interval);


    }, [currentTurn, TTTUser]);



    const nextMove = () => {

        if (currentTurn === 0){

            setCurrentTurn(1);

        } else {

            setCurrentTurn(0);

        }

    }
    
    const takenMove = (index, player) => {

        setAvailableMoves(prev => prev.filter((item) => item !== index));

        const newMatrix = [...matrix];
        newMatrix[index] = player;
        setMatrix(newMatrix);

    }

    const userMove = (index) => {

        if (currentTurn === 1){

            playSound(3);
            
            setUserMoves(prev => [...prev, index]);
            takenMove(index, 1);
            nextMove();
    
        } else {

            playSound(5);
            setError("It's not your turn yet.");

        }
    
    }


    return(

        <div className = "TTTchart_container">

            {matrix.map((_, index) => (

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

export default Turn;