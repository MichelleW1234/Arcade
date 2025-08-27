const sequenceFilter = (array, availableMoves) => {

    const winningSequences = [[0, 1, 2], 
                            [3, 4, 5],
                            [6, 7, 8],
                            [0, 3, 6],
                            [1, 4, 7],
                            [2, 5, 8], 
                            [0, 4, 8],
                            [2, 4, 6]];

    for (let i =0; i< winningSequences.length; i++){

        let counter = 0;

        for (let j =0; j< winningSequences[i].length; j++){

            if (array.includes(winningSequences[i][j])){

                counter++;

            }

        }

        if (counter > 1){

            let move = (winningSequences[i].filter(item => !array.includes(item)))[0];

            if (availableMoves.includes(move)){

                return move;

            }

        }

    }

    return -1;


}



export const computerMoveDecider = (availableMoves, computerMoves, userMoves) => {

    let computerMove = -1;

    if (computerMove === -1 && computerMoves.length > 1){

        computerMove = sequenceFilter(computerMoves, availableMoves);

    }
    
    if (computerMove === -1 && userMoves.length > 1){

        computerMove = sequenceFilter(userMoves, availableMoves);

    }

    if (computerMove === -1){

        const randomIndex = Math.floor(Math.random() * availableMoves.length); 
        computerMove = availableMoves[randomIndex];

    }

    return computerMove;

}



export const winnerwinnerchickendinner = (matrix, userMoves, computerMoves, setThreeInARow) => {

    const winningSequences = [[0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6]];

    for (let i =0; i< winningSequences.length; i++){

        const currentSequence = winningSequences[i];

        if (currentSequence.filter(item => !userMoves.includes(item)).length === 0){

            setThreeInARow(currentSequence);
            return 1;

        }

        if (currentSequence.filter(item => !computerMoves.includes(item)).length === 0){

            setThreeInARow(currentSequence);
            return 0;

        }

    }

    if (!matrix.includes(-1)){

        return 2;

    }

    return -1;

}



export const resetGame = (setTTTUser) => {

    setTTTUser((prev) => {
        const updatedUser = [...prev];
        updatedUser[0] = -1;
        updatedUser[1] = -1;

        return updatedUser;
    });

}