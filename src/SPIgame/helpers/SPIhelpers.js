//For transitioning to next mission:

export const unlockNextMission = (SPIUser, setSPIUser) => {

    if (SPIUser[2] == false){

        if (SPIUser[1][0] == 1){

            setSPIUser(prev => {
                const newMission = [...prev];
                newMission[0].push(1);
                newMission[1] = [2, "/SPIM2Instructions"];
                return newMission;                
            });

        } else if (SPIUser[1][0] == 2){

            setSPIUser(prev => {
                const newMission = [...prev];
                newMission[0].push(2);
                newMission[1] = [3, "/SPIM3Instructions"];
                return newMission;                
            });

        }  else if (SPIUser[1][0] == 3){

            setSPIUser(prev => {
                const newMission = [...prev];
                newMission[0].push(3);
                newMission[1] = [4, "/SPIM4Instructions"];
                return newMission;                
            });

        } else if (SPIUser[1][0] == 4){

            setSPIUser(prev => {
                const newMission = [...prev];
                newMission[0].push(4);
                newMission[1] = -1;
                return newMission;                
            });

        }

    }


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

    for (let i = 0; i < newMatrix.length; i++) {

        newMatrix[i][0] += 1;

        if (newMatrix[i][0] >= 15){

            setSPIUser(prev => [prev[0], prev[1], true]);

        }

    }

    setAlienPositions(newMatrix);

}

export const aliensIncomingM2 = (setAlienPositions, alienPositions, setSPIUser, setShieldedAliens) => {

    const newMatrix = alienPositions.map(innerArray => [...innerArray]);

    for (let i = 0; i < newMatrix.length; i++) {

        newMatrix[i][0] += 1;

        if (newMatrix[i][0] >= 15){

            setSPIUser(prev => [prev[0], prev[1], true]);

        }

    }

    if (alienPositions.length > 3){

        const selectedAliens = getRandomElements(newMatrix, 3);
        setShieldedAliens(selectedAliens);

    }

    setAlienPositions(newMatrix);

}

export const newBossPosition = () => {

    const newRow = Math.floor(Math.random() * 4);
    const newCol = Math.floor(Math.random() * 9);

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

export const laserBlasterM4 = (laserPositions, setLaserPositions, laserValue) => {

   let newMatrix = laserPositions.map(innerArray => [...innerArray]);
   newMatrix = newMatrix.filter(row => row[0] !== 0);

    for (let i = 0; i < newMatrix.length; i++) {

        newMatrix[i][0] -= 1;

    }

    if (!(newMatrix.some(row => row[0] >= 4))){

        newMatrix.push([5, laserValue]);

    }
    
    setLaserPositions(newMatrix);

}







//For determining alien deaths:

export const alienKilledM1 = (laserPositions, alienPositions, setAlienPositions, setWaveNumber) => {

    const newPositions =  alienPositions.filter(
        alien => !(laserPositions.some(laser => 
            laser[0] === alien[0] &&
            laser[1] === alien[1]
        ))
    );

    if (alienPositions.length === 0) {
        setWaveNumber(prev => prev + 1);
        setAlienPositions(newWave(1));
    } else {

        setAlienPositions(newPositions);

    }

}


export const getRandomElements = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}


export const alienKilledM2 = (laserPositions, alienPositions, setAlienPositions, setWaveNumber, shieldedAliens, setShieldedAliens) => {

    const newPositions =  alienPositions.filter(alien => !(
        laserPositions.some(([laserRow, laserCol]) =>
            laserRow === alien[0] &&
            laserCol === alien[1] &&
            !shieldedAliens.some(
                ([shieldedRow, shieldedCol]) => shieldedRow === alien[0] && shieldedCol === alien[1]
            )
        )) 

    );

    if (newPositions.length === 0) {

        setWaveNumber(prev => prev + 1);
        const newWaveMatrix = newWave(2);
        setAlienPositions(newWaveMatrix);
        setShieldedAliens(getRandomElements(newWaveMatrix, 3));

    } else {

        setAlienPositions(newPositions);

    }

}


export const alienKilledM3 = (laserPositions, alienPositions, setAlienPositions, setWaveNumber, mutantLaserOn) => {

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

    if (newPositions.length === 0) {

        setWaveNumber(prev => prev + 1);
        setAlienPositions(newWave(3));

    } else {

        setAlienPositions(newPositions);

    }

}


export const bossHit = (bossHealth, setBossHealth, setBossDefeated) =>  {

    if (bossHealth === 0){

        setBossDefeated(true);

    }

    setBossHealth(prev => prev - 1);

}