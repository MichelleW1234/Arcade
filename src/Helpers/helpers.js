import buttonStart from "../Music/buttonStart.mp3";
import buttonSet from "../Music/buttonSet.mp3";
import buttonSelect from "../Music/buttonSelect.mp3";
import buttonRestart from "../Music/buttonRestart.mp3";
import buttonError from "../Music/buttonError.mp3";
import gameOver from "../Music/gameOver.mp3";


export const retrieveActiveGame = (index) => {
    
    let gameControls = new Array(null, null, null, null, null);

    if (index === 1){

        gameControls[0] = "/RPSstart";
        gameControls[1] = 20;

    } else if (index === 2){

        gameControls[0] = "/TTThome";
        gameControls[1] = 10;

    } else if (index === 3){

        gameControls[0] = "/SNKstart";
        gameControls[1] = 5;

    } 

    return gameControls;

}

export const pointsDistribution = (ActiveGame, winner, setPlayer) => {

    if (winner == 1){

        setPlayer(prev => [prev[0] + ActiveGame[1], prev[0]]);

    } else if (winner == 0){

        setPlayer(prev => [prev[0] - ActiveGame[1], prev[0]]);

    } else {

        setPlayer(prev => [prev[0], prev[0]]);

    }

}


export const playSound = (soundEffect) => {

    let audio = null;

    if (soundEffect == 1){

        audio = new Audio(buttonStart);
        audio.volume = 0.3;

    } else if (soundEffect == 2){

        audio = new Audio(buttonSet);
        audio.volume = 0.3;

    } else if (soundEffect == 3){

        audio = new Audio(buttonSelect);
        audio.volume = 0.3;

    } else if (soundEffect == 4){

        audio = new Audio(buttonRestart);

    } else if (soundEffect == 5){

        audio = new Audio(buttonError);
        audio.volume = 0.3;

    } else if (soundEffect == 6){

        audio = new Audio(gameOver);
        audio.volume = 0.5;

    }

    audio.play();
   

}