import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

export const resetLevel = (setRPSUser) => {

    const defaultInput = getInput(0);
    const defaultReferences = getReferences(0);

    setRPSUser((prev) => {
        const updatedUser = [...prev];
        updatedUser[0] = 0;
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

    return levelInputs[level];

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
            
    return levelReferences[level];

};





export const decideRoundWinnerFunction = (level, userMove, setResult) => {

    let result;

    if (level === 0){

        result = decideRoundWinnerLevel1(userMove, setResult);

    } else if (level === 1){

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
            setResult(["You: rock", "Computer: rock", "It's a tie!"]);
        } else if (userResponse === 2){
            setResult(["You: paper", "Computer: paper" , "It's a tie!"]);
        } else {
            setResult(["You: scissors" , "Computer: scissors" , "It's a tie!"]); 
        }
    } else if (computerResponse === 1 && userResponse === 2){
        setResult(["You: paper" , "Computer: rock" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 1 && userResponse === 3){
        setResult(["You: scissors" , "Computer: rock" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 2 && userResponse === 1){
        setResult(["You: rock" , "Computer: paper" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 2 && userResponse === 3){
        setResult(["You: scissors" , "Computer: paper" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 3 && userResponse === 1){
        setResult(["You: rock" , "Computer: scissors" , "You get a point!"]);
        return 1;
    } else{
        setResult(["You: paper" , "Computer: scissors" , "The Computer gets a point!"]);
        return 0;
    }
    return -1;
};


const decideRoundWinnerLevel2 = (userMove, setResult) => {

    const userResponse = userMove;
    const computerResponse = computerGeneratedResponse(5);

    if (computerResponse === userResponse){
        if (userResponse === 1){
            setResult(["You: rock", "Computer: rock", "It's a tie!"]);
        } else if (userResponse === 2){
            setResult(["You: paper", "Computer: paper" , "It's a tie!"]);
        } else if (userResponse === 3){
            setResult(["You: scissors" , "Computer: scissors" , "It's a tie!"]); 
        } else if (userResponse === 4){
            setResult(["You: lizard" , "Computer: lizard" , "It's a tie!"]); 
        } else {
            setResult(["You: spock" , "Computer: spock" , "It's a tie!"]); 
        }
    } else if (computerResponse === 1 && userResponse === 2){
        setResult(["You: paper" , "Computer: rock" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 1 && userResponse === 3){
        setResult(["You: scissors" , "Computer: rock" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 1 && userResponse === 4){
        setResult(["You: lizard" , "Computer: rock" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 1 && userResponse === 5){
        setResult(["You: spock" , "Computer: rock" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 2 && userResponse === 1){
        setResult(["You: rock" , "Computer: paper" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 2 && userResponse === 3){
        setResult(["You: scissors" , "Computer: paper" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 2 && userResponse === 4){
        setResult(["You: lizard" , "Computer: paper" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 2 && userResponse === 5){
        setResult(["You: spock" , "Computer: paper" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 3 && userResponse === 1){
        setResult(["You: rock" , "Computer: scissors" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 3 && userResponse === 2){
        setResult(["You: paper" , "Computer: scissors" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 3 && userResponse === 4){
        setResult(["You: lizard" , "Computer: scissors" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 3 && userResponse === 5){
        setResult(["You: spock" , "Computer: scissors" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 4 && userResponse === 1){
        setResult(["You: rock" , "Computer: lizard" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 4 && userResponse === 2){
        setResult(["You: paper" , "Computer: lizard" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 4 && userResponse === 3){
        setResult(["You: scissors" , "Computer: lizard" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 4 && userResponse === 5){
        setResult(["You: spock" , "Computer: lizard" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 5 && userResponse === 1){
        setResult(["You: rock" , "Computer: spock" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 5 && userResponse === 2){
        setResult(["You: paper" , "Computer: spock" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 5 && userResponse === 3){
        setResult(["You: scissors" , "Computer: spock" , "The Computer gets a point!"]);
        return 0;
    } else {
        setResult(["You: lizard" , "Computer: spock" , "You get a point!"]);
        return 1;
    }
    return -1;
};

const decideRoundWinnerLevel3 = (userMove, setResult) => {

    const userResponse = userMove;
    const computerResponse = computerGeneratedResponse(5);

    if (computerResponse === userResponse){
        if (userResponse === 1){
            setResult(["You: rock", "Computer: rock", "It's a tie!"]);
        } else if (userResponse === 2){
            setResult(["You: paper", "Computer: paper" , "It's a tie!"]);
        } else if (userResponse === 3){
            setResult(["You: scissors" , "Computer: scissors" , "It's a tie!"]); 
        } else if (userResponse === 4){
            setResult(["You: gun" , "Computer: gun" , "It's a tie!"]);
        } else {
            setResult(["You: shield" , "Computer: shield" , "It's a tie!"]);
        }
    } else if (computerResponse === 1 && userResponse === 2){
        setResult(["You: paper" , "Computer: rock" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 1 && userResponse === 3){
        setResult(["You: scissors" , "Computer: rock" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 1 && userResponse === 4){
        setResult(["You: gun" , "Computer: rock" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 1 && userResponse === 5){
        setResult(["You: shield" , "Computer: rock" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 2 && userResponse === 1){
        setResult(["You: rock" , "Computer: paper" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 2 && userResponse === 3){
        setResult(["You: scissors" , "Computer: paper" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 2 && userResponse === 4){
        setResult(["You: gun" , "Computer: paper" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 2 && userResponse === 5){
        setResult(["You: shield" , "Computer: paper" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 3 && userResponse === 1) {
        setResult(["You: rock" , "Computer: scissors" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 3 && userResponse === 2) {
        setResult(["You: paper" , "Computer: scissors" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 3 && userResponse === 4) {
        setResult(["You: gun" , "Computer: scissors" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 3 && userResponse === 5){
        setResult(["You: shield" , "Computer: scissors" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 4 && userResponse === 1) {
        setResult(["You: rock" , "Computer: gun" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 4 && userResponse === 2) {
        setResult(["You: paper" , "Computer: gun" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 4 && userResponse === 3) {
        setResult(["You: scissors" , "Computer: gun" , "The Computer gets a point!"]);
        return 0;
    } else if (computerResponse === 4 && userResponse === 5){
        setResult(["You: shield" , "Computer: gun" , "Game terminates immediately!"]);
        return 3;
    } else if (computerResponse === 5 && userResponse === 1) {
        setResult(["You: rock" , "Computer: shield" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 5 && userResponse === 2) {
        setResult(["You: paper" , "Computer: shield" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 5 && userResponse === 3) {
        setResult(["You: scissors" , "Computer: shield" , "You get a point!"]);
        return 1;
    } else if (computerResponse === 5 && userResponse === 4){
        setResult(["You: gun" , "Computer: shield" , "Game terminates immediately!"]);
        return -3;
    }
    return -1;
};



export const handleHideFlag = (terminationFlag, rounds, setRounds, setShowFlag) => {

        playSound(3);
        if (terminationFlag == true){

            setRounds(11);
            setShowFlag(false);
            playSound(6);

        } else {

            if (rounds == 10){

                playSound(6);

            }

            setRounds((prevRounds) => prevRounds + 1);
            setShowFlag(false);

        }

    }






export const quitGame = (setRPSUser, ActiveGame, setActiveGame, setPlayer, Player) => {

    playSound(4);
    resetLevel(setRPSUser);
    setPlayer([Player[0] - ActiveGame[1]]);
    setActiveGame(retrieveActiveGame(0));

}
