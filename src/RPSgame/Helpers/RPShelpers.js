export const resetLevel = (setLevel, setInput, setReference) => {

    setLevel(1);

    const defaultInput = getInput(1);
    setInput(defaultInput);

    const defaultReferences = getReferences(1);
    setReference(defaultReferences);

}

export const getInput = (level) => {

    const levelInputs = [["Rock", "Paper", "Scissors"],
                         ["Rock", "Paper", "Scissors", "Lizard", "Spock"],
                         ["Rock", "Paper", "Scissors", "Gun", "Shield"]];

    return levelInputs[level-1];

};

export const getReferences = (level) => {

    const levelReferences = [["Rock beats scissors (Rock crushes Scissors)", 
         "Rock loses to Paper (Paper covers Rock)",
         "Paper beats Rock (Paper covers Rock)", 
         "Paper loses to Scissors (Scissors cut Paper)",
         "Scissors beats Paper (Scissors cut Paper)", 
         "Scissors loses to Rock (Rock crushes Scissors)"],
        ["Rock beats Scissors (Rock crushes Scissors) and Lizard (Rock crushes Lizard)",
         "Rock loses to Paper (Paper covers Rock) and Spock (Spock vaporizes Rock)",
         "Paper beats Rock (Paper covers Rock) and Spock (Paper disproves Spock)",
         "Paper loses to Scissors (Scissors cut Paper) and Lizard (Lizard eats Paper)",
         "Scissors beats Paper (Scissors cut Paper) and Lizard (Scissors decapitate Lizard)",
         "Scissors loses to Rock (Rock crushes Scissors) and Spock (Spock smashes Scissors)", 
         "Lizard beats Paper (Lizard eats Paper) and Spock (Lizard poisons Spock)",
         "Lizard loses to Rock (Rock crushes Lizard) and Scissors (Scissors decapitate Lizard)",
         "Spocks beats Rock (Spock vaporizes Rock) and Scissors (Spock smashes Scissors)",
         "Spock loses to Paper (Paper disproves Spock) ande Lizard (Lizard poisons Spock)"],
         ["Gun defeats everything except Shield",
          "Shield loses to everything except Gun",
          "If Shield is drawn on Gun, then the game IMMEDIATELY terminates with the winner being the one who drew Shield",
          "Rock beats scissors (Rock crushes Scissors)", 
          "Rock loses to Paper (Paper covers Rock)",
          "Paper beats Rock (Paper covers Rock)", 
          "Paper loses to Scissors (Scissors cut Paper)",
          "Scissors beats Paper (Scissors cut Paper)", 
          "Scissors loses to Rock (Rock crushes Scissors)"]];
            
    return levelReferences[level-1];

};

const computerGeneratedResponse = (lastMove) => {

    return Math.floor(Math.random() * lastMove) + 1;

};

export const decideRoundWinnerLevel1 = (userMove, result, setResult) => {

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

export const decideRoundWinnerLevel2 = (userMove, result, setResult) => {

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

export const decideRoundWinnerLevel3 = (userMove, result, setResult) => {

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




