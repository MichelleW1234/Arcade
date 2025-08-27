
import {playSound, retrieveActiveGame} from '../../Helpers/helpers.js';

//For transitioning to next mission:

export const unlockNextMission = (SPIUser, setSPIUser) => {

    if (SPIUser[2] == false){

        if (SPIUser[1][0] == 1){

            setSPIUser(prev => {
                const newMission = [...prev];
                newMission[0] += 1;
                newMission[1] = [2, "/SPIM2instructions"];
                return newMission;                
            });

        } else if (SPIUser[1][0] == 2){

            setSPIUser(prev => {
                const newMission = [...prev];
                newMission[0] += 1;
                newMission[1] = [3, "/SPIM3instructions"];
                return newMission;                
            });

        }  else if (SPIUser[1][0] == 3){

            setSPIUser(prev => {
                const newMission = [...prev];
                newMission[0] += 1;
                newMission[1] = [4, "/SPIM4instructions"];
                return newMission;                
            });

        } else if (SPIUser[1][0] == 4){

            setSPIUser(prev => {
                const newMission = [...prev];
                newMission[0] += 1;
                newMission[1] = -1;
                return newMission;                
            });

        }

    }

    playSound(4);

}


/*Instructions */

export const openingGuide = (flagNumber) => {

    playSound(3);
    return true;

}


export const closingGuide = () => {

    playSound(3);
    return false;

}



//For generating new wave of aliens:

const getUniqueRandomArray = (count, max) => {
    const values = Array.from({ length: max }, (_, i) => i);

    // Shuffle using Fisher-Yates
    for (let i = values.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [values[i], values[j]] = [values[j], values[i]];
    }

    return values.slice(0, count);
}


export const newWave = (mission) => {

    const newMatrix = [];

    if (mission === 1){

        const positions = getUniqueRandomArray(10, 27);

        for (let i =0; i<positions.length; i++){

            newMatrix.push([0, positions[i]]);

        }

    } else if (mission === 2){

        const positions = getUniqueRandomArray(20, 27);

        for (let i =0; i<positions.length; i++){

            newMatrix.push([0, positions[i]]);

        }

    } else {

        const positions = getUniqueRandomArray(20, 27);

        for (let i =0; i<10; i++){

            newMatrix.push([0, positions[i], 0]);

        }

         for (let i =10; i<20; i++){

            newMatrix.push([0, positions[i], 1]);

        }


    }

    return newMatrix;

}



//For animating alien movements:

export const aliensIncomingM1andM3 = (setAlienPositions, alienPositions, setSPIUser) => {

    const newMatrix = alienPositions.map(innerArray => [...innerArray]);

    let gameShouldStop = false;

    for (let i = 0; i < newMatrix.length; i++) {

        newMatrix[i][0] += 1;

        if (newMatrix[i][0] >= 15){

            gameShouldStop = true;

        }

    }

    if (gameShouldStop) {
        setSPIUser(prev => [prev[0], prev[1], true]);
        playSound(13);
    }

    setAlienPositions(newMatrix);

}



export const aliensIncomingM2 = (setAlienPositions, alienPositions, setSPIUser, setShieldedAliens) => {

    const newMatrix = alienPositions.map(innerArray => [...innerArray]);

    let gameShouldStop = false;

    for (let i = 0; i < newMatrix.length; i++) {

        newMatrix[i][0] += 1;

        if (newMatrix[i][0] >= 15){

            gameShouldStop = true;

        }

    }

    if (gameShouldStop) {
        setSPIUser(prev => [prev[0], prev[1], true]);
        playSound(13);
    }

    if (newMatrix.length > 3){

        const selectedAliens = getRandomElements(newMatrix, 3);
        setShieldedAliens(selectedAliens);

    } else {

        setShieldedAliens([]); // Optional: clear if not enough

    }

    setAlienPositions(newMatrix);

}



export const newBossPosition = () => {

    const newRow = Math.floor(Math.random() * 5);
    const newCol = Math.floor(Math.random() * 7);

    return [newRow, newCol];

}



export const newBossState = (setBossState) => {

    const newPosition = newBossPosition();

    const value = Math.floor(Math.random() * 5);
    const dangerState = value < 3 ? false : true;

    setBossState([newPosition, dangerState]);

}



//For animating laser movements:

export const laserBlaster = (laserPositions, setLaserPositions, laserValue) => {

   let newMatrix = laserPositions.map(innerArray => [...innerArray]);
   newMatrix = newMatrix.filter(row => row[0] !== 0);

    for (let i = 0; i < newMatrix.length; i++) {

        newMatrix[i][0] -= 1;

    }

    if (!(newMatrix.some(row => row[0] >= 9))){

        newMatrix.push(
            [14, laserValue],
            [13, laserValue],
            [12, laserValue]
        );

    }
    
    setLaserPositions(newMatrix);

}



//For determining alien deaths:

export const alienKilledM1 = (laserPositions, alienPositions, setAlienPositions, setWaveNumber, waveIncremented) => {

    if (waveIncremented.current) {
        return; // STOP immediately if wave is already in progress
    }

    const newPositions =  alienPositions.filter(
        alien => !(laserPositions.some(laser => 
            laser[0] === alien[0] &&
            laser[1] === alien[1]
        ))
    );

    const alienHit = newPositions.length < alienPositions.length;

    if (alienHit) {
        playSound(9);
    }

    if (newPositions.length === 0 && !waveIncremented.current) {

        waveIncremented.current = true;
        setWaveNumber(prev => prev + 1);
        setAlienPositions(newWave(1));
        playSound(10);

        setTimeout(() => {
            waveIncremented.current = false;
        }, 200);

    } else {

        setAlienPositions(newPositions);

    }

}



export const getRandomElements = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}



export const alienKilledM2 = (laserPositions, alienPositions, setAlienPositions, setWaveNumber, shieldedAliens, setShieldedAliens, waveIncremented) => {

    if (waveIncremented.current) {
        return; // STOP immediately if wave is already in progress
    }

    const newPositions =  alienPositions.filter(alien => !(
        laserPositions.some(([laserRow, laserCol]) =>
            laserRow === alien[0] &&
            laserCol === alien[1] &&
            !shieldedAliens.some(
                ([shieldedRow, shieldedCol]) => shieldedRow === alien[0] && shieldedCol === alien[1]
            )
        )) 

    );

    const alienHit = newPositions.length < alienPositions.length;

    if (alienHit) {
        playSound(9);
    }

    if (newPositions.length === 0 && !waveIncremented.current) {

        waveIncremented.current = true;
        setWaveNumber(prev => prev + 1);
        const newWaveMatrix = newWave(2);
        setAlienPositions(newWaveMatrix);
        setShieldedAliens(getRandomElements(newWaveMatrix, 3));
        playSound(10);

        setTimeout(() => {
            waveIncremented.current = false;
        }, 200);

    } else {

        setAlienPositions(newPositions);

    }

}



export const alienKilledM3 = (laserPositions, alienPositions, setAlienPositions, setWaveNumber, waveIncremented, mutantLaserOn) => {

    if (waveIncremented.current) {
        return; // STOP immediately if wave is already in progress
    }

    let newPositions = []
    if (mutantLaserOn === true){

        newPositions =  alienPositions.filter(alien => !(
            laserPositions.some(([laserRow, laserCol]) =>
                laserRow === alien[0] &&
                laserCol === alien[1]
            ) &&
            alien[2] === 1
        ));

    } else {

        newPositions =  alienPositions.filter(alien => !(
            laserPositions.some(([laserRow, laserCol]) =>
                    laserRow === alien[0] &&
                    laserCol === alien[1]
                ) &&
                alien[2] === 0
        ));

    }

    const alienHit = newPositions.length < alienPositions.length;

    if (alienHit) {
        playSound(9);
    }
    
    if (newPositions.length === 0 && !waveIncremented.current) {

        waveIncremented.current = true;
        setWaveNumber(prev => prev + 1);
        setAlienPositions(newWave(3));
        playSound(10);
        setTimeout(() => {
            waveIncremented.current = false;
        }, 200);

    } else {

        setAlienPositions(newPositions);

    }

}



export const quitGame = (setSPIUser, Player, setPlayer, ActiveGame, setActiveGame) => {
        
    playSound(4);

    setSPIUser([0,[1, "/SPIM1Instructions"], false]);
    setPlayer([Player[0] - ActiveGame[1]]);
    setActiveGame(retrieveActiveGame(0));
        
}