import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

export const resetLevel = (setRPSUser) => {

    const defaultInput = getInput(1);
    const defaultReferences = getReferences(1);

    setRPSUser((prev) => {
        const updatedUser = [...prev];
        updatedUser[0] = 1;
        updatedUser[1] = defaultInput;
        updatedUser[2] = defaultReferences;
        updatedUser[3] = 0;
        updatedUser[4] = 0;

        return updatedUser;
    });

}

export const getInput = (level) => {

    const levelInputs = [["Rock", "Paper", "Scissors"],
                         ["Rock", "Paper", "Scissors", "Lizard", "Spock"],
                         ["Rock", "Paper", "Scissors", "Gun", "Shield"]];

    return levelInputs[level-1];

};

export const getReferences = (level) => {

    const levelReferences = [["Rock beats Scissors", 
         "Rock loses to Paper",
         "Paper beats Rock", 
         "Paper loses to Scissors",
         "Scissors beats Paper", 
         "Scissors loses to Rock"],
        ["Rock beats Scissors and Lizard",
         "Rock loses to Paper and Spock",
         "Paper beats Rock and Spock",
         "Paper loses to Scissors and Lizard",
         "Scissors beats Paper and Lizard",
         "Scissors loses to Rock and Spock", 
         "Lizard beats Paper and Spock",
         "Lizard loses to Rock and Scissors",
         "Spocks beats Rock and Scissors",
         "Spock loses to Paper ande Lizard"],
         ["Gun defeats everything except Shield",
          "Shield loses to everything except Gun",
          "If Shield is drawn on Gun, then the game immediately terminates with the winner being the one who drew Shield",
          "Rock beats scissors", 
          "Rock loses to Paper",
          "Paper beats Rock", 
          "Paper loses to Scissors",
          "Scissors beats Paper", 
          "Scissors loses to Rock"]];
            
    return levelReferences[level-1];

};





export const decideRoundWinnerFunction = (level, userMove, setResult) => {

    let result;

    if (level === 1){

        result = decideRoundWinnerLevel1(userMove, setResult);

    } else if (level === 2){

        result = decideRoundWinnerLevel2(userMove, setResult);

    } else {

        result = decideRoundWinnerLevel3(userMove, setResult);

    }

    return result;

};



const computerGeneratedResponse = (moveRange) => {

    return Math.floor(Math.random() * moveRange) + 1;

};

const decideRoundWinnerLevel1 = (userMove, setResult) => {


    const userResponse = userMove;
    const computerResponse = computerGeneratedResponse(3);

    if (computerResponse === userResponse){

        if (userResponse === 1){
            setResult(["Your response: rock", "Computer's response: rock", "It's a tie!"]);
        } else if (userResponse === 2){
            setResult(["Your response: paper", "Computer's response: paper" , "It's a tie!"]);
        } else {
            setResult(["Your response: scissors" , "Computer's response: scissors" , "It's a tie!"]); 
        }
    } else if (computerResponse === 1 && userResponse === 2){
        setResult(["Your response: paper" , "Computer's response: rock" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 1 && userResponse === 3){
        setResult(["Your response: scissors" , "Computer's response: rock" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 2 && userResponse === 1){
        setResult(["Your response: rock" , "Computer's response: paper" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 2 && userResponse === 3){
        setResult(["Your response: scissors" , "Computer's response: paper" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 3 && userResponse === 1){
        setResult(["Your response: rock" , "Computer's response: scissors" , "You get a point!"]);
        return 1;
    } else{
        setResult(["Your response: paper" , "Computer's response: scissors" , "The Computer gets a point!"]);
        return 0;
    }
    return -1;
};


const decideRoundWinnerLevel2 = (userMove, setResult) => {

    const userResponse = userMove;
    const computerResponse = computerGeneratedResponse(5);

    if (computerResponse === userResponse){
        if (userResponse === 1){
            setResult(["Your response: rock", "Computer's response: rock", "It's a tie!"]);
        } else if (userResponse === 2){
            setResult(["Your response: paper", "Computer's response: paper" , "It's a tie!"]);
        } else if (userResponse === 3){
            setResult(["Your response: scissors" , "Computer's response: scissors" , "It's a tie!"]); 
        } else if (userResponse === 4){
            setResult(["Your response: lizard" , "Computer's response: lizard" , "It's a tie!"]); 
        } else {
            setResult(["Your response: spock" , "Computer's response: spock" , "It's a tie!"]); 
        }
    } else if (computerResponse === 1 && userResponse === 2){
        setResult(["Your response: paper" , "Computer's response: rock" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 1 && userResponse === 3){
        setResult(["Your response: scissors" , "Computer's response: rock" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 1 && userResponse === 4){
        setResult(["Your response: lizard" , "Computer's response: rock" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 1 && userResponse === 5){
        setResult(["Your response: spock" , "Computer's response: rock" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 2 && userResponse === 1){
        setResult(["Your response: rock" , "Computer's response: paper" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 2 && userResponse === 3){
        setResult(["Your response: scissors" , "Computer's response: paper" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 2 && userResponse === 4){
        setResult(["Your response: lizard" , "Computer's response: paper" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 2 && userResponse === 5){
        setResult(["Your response: spock" , "Computer's response: paper" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 3 && userResponse === 1){
        setResult(["Your response: rock" , "Computer's response: scissors" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 3 && userResponse === 2){
        setResult(["Your response: paper" , "Computer's response: scissors" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 3 && userResponse === 4){
        setResult(["Your response: lizard" , "Computer's response: scissors" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 3 && userResponse === 5){
        setResult(["Your response: spock" , "Computer's response: scissors" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 4 && userResponse === 1){
        setResult(["Your response: rock" , "Computer's response: lizard" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 4 && userResponse === 2){
        setResult(["Your response: paper" , "Computer's response: lizard" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 4 && userResponse === 3){
        setResult(["Your response: scissors" , "Computer's response: lizard" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 4 && userResponse === 5){
        setResult(["Your response: spock" , "Computer's response: lizard" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 5 && userResponse === 1){
        setResult(["Your response: rock" , "Computer's response: spock" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 5 && userResponse === 2){
        setResult(["Your response: paper" , "Computer's response: spock" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 5 && userResponse === 3){
        setResult(["Your response: scissors" , "Computer's response: spock" , "The Computer gets a point!"]);
        return 0;
    } else {
        setResult(["Your response: lizard" , "Computer's response: spock" , "You get a point!"]);
        return 1;
    }
    return -1;
};

const decideRoundWinnerLevel3 = (userMove, setResult) => {

    const userResponse = userMove;
    const computerResponse = computerGeneratedResponse(5);

    if (computerResponse === userResponse){
        if (userResponse === 1){
            setResult(["Your response: rock", "Computer's response: rock", "It's a tie!"]);
        } else if (userResponse === 2){
            setResult(["Your response: paper", "Computer's response: paper" , "It's a tie!"]);
        } else if (userResponse === 3){
            setResult(["Your response: scissors" , "Computer's response: scissors" , "It's a tie!"]); 
        } else if (userResponse === 4){
            setResult(["Your response: gun" , "Computer's response: gun" , "It's a tie!"]);
        } else {
            setResult(["Your response: shield" , "Computer's response: shield" , "It's a tie!"]);
        }
    } else if (computerResponse === 1 && userResponse === 2){
        setResult(["Your response: paper" , "Computer's response: rock" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 1 && userResponse === 3){
        setResult(["Your response: scissors" , "Computer's response: rock" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 1 && userResponse === 4){
        setResult(["Your response: gun" , "Computer's response: rock" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 1 && userResponse === 5){
        setResult(["Your response: shield" , "Computer's response: rock" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 2 && userResponse === 1){
        setResult(["Your response: rock" , "Computer's response: paper" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 2 && userResponse === 3){
        setResult(["Your response: scissors" , "Computer's response: paper" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 2 && userResponse === 4){
        setResult(["Your response: gun" , "Computer's response: paper" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 2 && userResponse === 5){
        setResult(["Your response: shield" , "Computer's response: paper" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 3 && userResponse === 1) {
        setResult(["Your response: rock" , "Computer's response: scissors" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 3 && userResponse === 2) {
        setResult(["Your response: paper" , "Computer's response: scissors" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 3 && userResponse === 4) {
        setResult(["Your response: gun" , "Computer's response: scissors" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 3 && userResponse === 5){
        setResult(["Your response: shield" , "Computer's response: scissors" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 4 && userResponse === 1) {
        setResult(["Your response: rock" , "Computer's response: gun" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 4 && userResponse === 2) {
        setResult(["Your response: paper" , "Computer's response: gun" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 4 && userResponse === 3) {
        setResult(["Your response: scissors" , "Computer's response: gun" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 4 && userResponse === 5){
        setResult(["Your response: shield" , "Computer's response: gun" , "Game terminates immediately!"]);
        return 3;
    } else if (computerResponse === 5 && userResponse === 1) {
        setResult(["Your response: rock" , "Computer's response: shield" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 5 && userResponse === 2) {
        setResult(["Your response: paper" , "Computer's response: shield" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 5 && userResponse === 3) {
        setResult(["Your response: scissors" , "Computer's response: shield" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 5 && userResponse === 4){
        setResult(["Your response: gun" , "Computer's response: shield" , "Game terminates immediately!"]);
        return -3;
    }
    return -1;
};


export const quitGame = (setRPSUser, ActiveGame, setActiveGame, setPlayer, Player) => {

    playSound(4);
    resetLevel(setRPSUser);
    setPlayer([Player[0] - ActiveGame[1]]);
    setActiveGame(retrieveActiveGame(1));

}
