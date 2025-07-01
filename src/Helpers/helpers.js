import buttonStart from "../Music/buttonStart.mp3";
import buttonSet from "../Music/buttonSet.mp3";
import buttonSelect from "../Music/buttonSelect.mp3";
import buttonRestart from "../Music/buttonRestart.mp3";
import buttonError from "../Music/buttonError.mp3";
import gameOver from "../Music/gameOver.mp3";
import enteringAlienZone from "../Music/enteringAlienZone.mp3";
import incomingAlienWave from "../Music/incomingAlienWave.mp3";
import laserRifle from "../Music/laserRifle.mp3";
import laserBlaster from "../Music/laserBlaster.mp3";
import explodedBoss from "../Music/explodedBoss.mp3";
import stationArrival from "../Music/stationArrival.mp3";
import alienTakeOver from "../Music/alienTakeOver.mp3";
import theQueenRoar from "../Music/theQueenRoar.mp3";
import RPSSuccess from "../Music/RPSSuccess.mp3";
import SnakeSuccess from '../Music/SnakeSuccess.mp3';
import buttonBought from "../Music/buttonBought.mp3";
import ORBGameShuttingDown from "../Music/ORBGameShuttingDown.mp3";
import gameStartingUp from "../Music/gameStartingUp.mp3";

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

    } else if (index === 4){

        gameControls[0] = "/SPIstart";
        gameControls[1] = 15;

    } else if (index === 5){

        gameControls[0] = "/ORBstart";
        gameControls[1] = 10;

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

    const soundDictionary = {

        1: [buttonStart, 0.3],
        2: [buttonSet, 0.3],
        3: [buttonSelect, 0.3],
        4: [buttonRestart, 1],
        5: [buttonError, 0.3],
        6: [gameOver, 0.5],
        7: [enteringAlienZone, 0.3], 
        8: [laserRifle, 0.1],
        9: [laserBlaster, 0.05],
        10: [incomingAlienWave, 0.1],
        11: [explodedBoss, 0.2],
        12: [stationArrival, 0.5],
        13: [alienTakeOver, 0.05],
        14: [theQueenRoar, 0.5],
        15: [SnakeSuccess, 0.7],
        16: [RPSSuccess, 0.7],
        17: [buttonBought, 0.3],
        18: [ORBGameShuttingDown, 0.1],
        19: [gameStartingUp, 0.3]

    };

    const entry = soundDictionary[soundEffect];
    const [soundFile, volume] = entry;
    const audio = new Audio(soundFile);
    audio.volume = volume;
    audio.play();

}