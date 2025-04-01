import { retrieveActiveGame } from '../../Helpers/helpers.js';

const bumpChecker = (activeDirection, setSNKUser, snake) => {

    const gameboardHeight = 20;
    const gameboardWidth = 30;

    if (activeDirection === 0 && snake[0][1] === 0){

        setSNKUser(prevMatrix => [true, prevMatrix[1]]);

    } else if (activeDirection === 1 && snake[0][1] === gameboardWidth-1){

        setSNKUser(prevMatrix => [true, prevMatrix[1]]);

    } else if (activeDirection === 2 && snake[0][0] === 0){

        setSNKUser(prevMatrix => [true, prevMatrix[1]]);

    } else if (activeDirection === 3 && snake[0][0] === gameboardHeight-1){

        setSNKUser(prevMatrix => [true, prevMatrix[1]]);

    } else {

        if (snake.length >= 5){

            const snakeHead = snake[0];

            if (activeDirection === 0 && snake.some(([sx, sy]) => sx === snakeHead[0] && sy === snakeHead[1]-1)){
        
                setSNKUser(prevMatrix => [true, prevMatrix[1]]);

            } else if (activeDirection === 1 && snake.some(([sx, sy]) => sx === snakeHead[0] && sy === snakeHead[1]+1)){

                setSNKUser(prevMatrix => [true, prevMatrix[1]]);

            } else if (activeDirection === 2 && snake.some(([sx, sy]) => sx === snakeHead[0]-1 && sy === snakeHead[1])){

                setSNKUser(prevMatrix => [true, prevMatrix[1]]);

            } else if (activeDirection === 3 && snake.some(([sx, sy]) => sx === snakeHead[0]+1 && sy === snakeHead[1])){

                setSNKUser(prevMatrix => [true, prevMatrix[1]]);

            }

        }
    
    }

}


const newApple = (setAppleLocation, snake) => {

    const gameboardHeight = 20;
    const gameboardWidth = 30;

    if (snake.length < (gameboardHeight * gameboardWidth)) {

        let Y;
        let X;
    
        do {
            X = Math.floor(Math.random() * gameboardHeight);
            Y = Math.floor(Math.random() * gameboardWidth);
        } while (snake.some(([sx, sy]) => sx === X && sy === Y));
    
        setAppleLocation(prev => [X, Y]);

    }

}

const editSnake = (snake, setSnake, newSnakeHead, appleEaten) => {

    const newMatrix = snake.map(innerArray => [...innerArray]);

    newMatrix[0] = newSnakeHead;

    for (let i = 1; i < snake.length; i++) {

        newMatrix[i] = [...snake[i - 1]];

    }

    if (appleEaten === true){

        newMatrix.push([...snake[snake.length-1]]);

    }

    setSnake(prevMatrix => newMatrix);

}


export const changeSnakeDirection = (setSNKUser, activeDirection, setSnake, snake, appleLocation, setAppleLocation) => {

    bumpChecker(activeDirection, setSNKUser, snake);

    let increaseSnake = false;

    if (snake[0][0] === appleLocation[0] && snake[0][1] === appleLocation[1]) {

        increaseSnake = true;
        setSNKUser(prevMatrix => [prevMatrix[0], prevMatrix[1] + 1]);
        
        setTimeout(() => {
            newApple(setAppleLocation, snake);
        }, 0);

    }

    if (activeDirection === 0){
    //Left 
        
        editSnake(snake, setSnake, [snake[0][0], snake[0][1]-1], increaseSnake);


    } else if (activeDirection === 1){
    //Right 
        
        editSnake(snake, setSnake, [snake[0][0], snake[0][1]+1], increaseSnake);


    } else if (activeDirection === 2){
    //Up

        editSnake(snake, setSnake, [snake[0][0]-1 , snake[0][1]], increaseSnake);


    } else if (activeDirection === 3){
    //Down

        editSnake(snake, setSnake, [snake[0][0]+1, snake[0][1]], increaseSnake);

    }

}





