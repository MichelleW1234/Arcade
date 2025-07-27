import ArcadeButtonStart from "../Music/ArcadeButtonStart.mp3";
import ArcadeButtonSet from "../Music/ArcadeButtonSet.mp3";
import ArcadeButtonSelect from "../Music/ArcadeButtonSelect.mp3";
import ArcadeButtonRestart from "../Music/ArcadeButtonRestart.mp3";
import ArcadeButtonError from "../Music/ArcadeButtonError.mp3";
import ArcadeGameOver from "../Music/ArcadeGameOver.mp3";
import SPIenteringAlienZone from "../Music/SPIenteringAlienZone.mp3";
import SPIincomingAlienWave from "../Music/SPIincomingAlienWave.mp3";
import SPIlaserRifle from "../Music/SPIlaserRifle.mp3";
import SPIlaserBlaster from "../Music/SPIlaserBlaster.mp3";
import SPIexplodedBoss from "../Music/SPIexplodedBoss.mp3";
import SPIstationArrival from "../Music/SPIstationArrival.mp3";
import SPIalienTakeOver from "../Music/SPIalienTakeOver.mp3";
import SPItheQueenRoar from "../Music/SPItheQueenRoar.mp3";
import RPSSuccess from "../Music/RPSSuccess.mp3";
import SNKSuccess from '../Music/SnakeSuccess.mp3';
import ArcadePrizeBought from "../Music/ArcadePrizeBought.mp3";
import StartingGameTwo from "../Music/StartingGameTwo.mp3";
import StartingGameOne from "../Music/StartingGameOne.mp3";
import SPIcompleted from "../Music/SPIcompleted.mp3";
import CBLSuccess from "../Music/CBLSuccess.mp3";
import SPIMutantLaserSwitch from "../Music/SPIMutantLaserSwitch.mp3";
import CWMClawActivate from "../Music/CWMClawActivate.mp3";
import ArcadeEnteringRoom from "../Music/ArcadeEnteringRoom.mp3";
import ArcadeCheckingInventory from "../Music/ArcadeCheckingInventory.mp3";
import BFREmptyShot from "../Music/BFREmptyShot.mp3";
import BFRBalloonPop from "../Music/BFRBalloonPop.mp3";
import BFRBirdShot from "../Music/BFRBirdShot.mp3";

export const retrieveActiveGame = (index) => {
    
    let gameControls = new Array(null, null, null, null, null);

    if (index === 0){

        gameControls[0] = "/CWMstart";
        gameControls[1] = 5;

    } else if (index === 1){

        gameControls[0] = "/RPSstart";
        gameControls[1] = 20;

    } else if (index === 2){

        gameControls[0] = "/TTTstart";
        gameControls[1] = 10;

    } else if (index === 3){

        gameControls[0] = "/SNKstart";
        gameControls[1] = 5;

    } else if (index === 4){

        gameControls[0] = "/SPIstart";
        gameControls[1] = 15;

    } else if (index === 5){

        gameControls[0] = "/ORBstart";
        gameControls[1] = 5;

    } else if (index === 6){

        gameControls[0] = "/CBLstart";
        gameControls[1] = 10;

    } else if (index === 7){

        gameControls[0] = "/BFRstart";
        gameControls[1] = 10;

    }
    
    return gameControls;

}

export const pointsDistribution = (ActiveGame, winner, setPlayer) => {

    if (winner == 1){

        setPlayer([Player[0] + ActiveGame[1]]);

    } else if (winner == 0){

        setPlayer([Player[0] - ActiveGame[1]]);

    }

}

export const claimPoints = (ActiveGame, Player, setPlayer, pointsEarned) => {

    playSound(2);

    const difference = (Player[0] - ActiveGame[1]) + pointsEarned;

    if (difference >= 0){

        setPlayer([difference]);

    } else {

        setPlayer([0]);

    }

}


export const playSound = (soundEffect) => {

    const soundDictionary = {

        1: [ArcadeButtonStart, 0.3],
        2: [ArcadeButtonSet, 0.3],
        3: [ArcadeButtonSelect, 0.3],
        4: [ArcadeButtonRestart, 1],
        5: [ArcadeButtonError, 0.3],
        6: [ArcadeGameOver, 0.5],
        7: [SPIenteringAlienZone, 0.3], 
        8: [SPIlaserRifle, 0.1],
        9: [SPIlaserBlaster, 0.06],
        10: [SPIincomingAlienWave, 0.1],
        11: [SPIexplodedBoss, 0.2],
        12: [SPIstationArrival, 0.5],
        13: [SPIalienTakeOver, 0.3],
        14: [SPItheQueenRoar, 0.5],
        15: [SNKSuccess, 0.7],
        16: [RPSSuccess, 0.7],
        17: [ArcadePrizeBought, 0.3],
        18: [StartingGameTwo, 0.5],
        19: [StartingGameOne, 0.3],
        20: [SPIcompleted, 0.5],
        21: [CBLSuccess, 0.3],
        22: [SPIMutantLaserSwitch, 0.5],
        23: [CWMClawActivate, 0.3],
        24: [ArcadeEnteringRoom, 1],
        25: [ArcadeCheckingInventory, 0.5],
        26: [BFREmptyShot, 0.4],
        27: [BFRBalloonPop, 0.5],
        28: [BFRBirdShot, 0.5]

    };


    const entry = soundDictionary[soundEffect];
    const [soundFile, volume] = entry;
    const audio = new Audio(soundFile);
    audio.volume = volume;
    audio.play();

}


export const exitGame = (setActiveGame) => {

    playSound(24);
    setActiveGame(retrieveActiveGame(1));

}