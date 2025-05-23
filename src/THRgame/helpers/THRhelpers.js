export const unlockNextMission = (THRUser, setTHRUser) => {

    if (THRUser[1][0] == 1){

        setTHRUser(prev => {
            const newMission = [...prev];
            newMission[0].push(1);
            newMission[1] = [2, "/THRM2Instructions"];
            return newMission;                
        });

    } else if (THRUser[1][0] == 2){

        setTHRUser(prev => {
            const newMission = [...prev];
            newMission[0].push(2);
            newMission[1] = [3, "/THRM3Instructions"];
            return newMission;                
        });

    } else if (THRUser[1][0] == 3){

        setTHRUser(prev => {
            const newMission = [...prev];
            newMission[0].push(3);
            newMission[1] = -1;
            return newMission;                
        });

    }


}


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

        const positions = getUniqueRandomArray(10, 27);

        for (let i =0; i<5; i++){

            newMatrix.push([0, positions[i], 2, 2]);

        }

        for (let i=5; i<positions.length; i++){

            newMatrix.push([0, positions[i], 1, 1]); 

        }

    } else {




    }

    return newMatrix;

}


export const aliensIncoming = (setAlienPositions, alienPositions, setThresholdBreached) => {

    const newMatrix = alienPositions.map(innerArray => [...innerArray]);

    for (let i = 0; i < newMatrix.length; i++) {

        newMatrix[i][0] += 1;

        if (newMatrix[i][0] >= 15){

            setThresholdBreached(true);

        }

    }

    setAlienPositions(prevMatrix => newMatrix);

}


















export const laserBlasterM1 = (laserPositions, setLaserPositions, laserValue) => {

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


export const laserBlasterM2 = (laserPositions, setLaserPositions, laserValue) => {

   const newMatrix = laserPositions
      .map(row => row.map(inner => [...inner]))
      .filter(row => row[0][0] !== 0);

    for (let i = 0; i < newMatrix.length; i++) {

        newMatrix[i][0][0] -= 1;
        newMatrix[i][1][0] -= 1;
        newMatrix[i][2][0] -= 1;

    }

    if (!(newMatrix.some(row => row[0][0] >= 9))){

        newMatrix.push(
            [[14, laserValue],
            [13, laserValue],
            [12, laserValue], 
            []]
        );

    }
    
    setLaserPositions(newMatrix);

}











export const alienKilledM1 = (laserPositions, alienPositions, setAlienPositions, setWaveNumber) => {

    const newPositions =  alienPositions.filter(
        alien => !(laserPositions.some(laser => 
            laser[0] === alien[0] &&
            laser[1] === alien[1]
        ))
    );

    setAlienPositions(prevMatrix => newPositions);

    if (alienPositions.length === 0) {
        setWaveNumber(prev => prev + 1);
        setAlienPositions(prevMatrix => newWave(1));
    }

}


export const alienKilledM2 = (laserPositions, alienPositions, setLaserPositions, setAlienPositions, setWaveNumber) => {

    const newAlienArray = alienPositions.map(innerArray => [...innerArray]);
    const newLaserArray = laserPositions.map(laser => [
        [...laser[0]],
        [...laser[1]],
        [...laser[2]],
        [...laser[3]]
    ]);

    for (let i =0; i<newAlienArray.length; i++){

        const matchingLaser = newLaserArray.find(laser =>
            laser.some(inner => 
                inner.length === 2 &&
                inner[0] === newAlienArray[i][0] &&
                inner[1] === newAlienArray[i][1]
            )
        );

        if (matchingLaser) {

            const alienID = newAlienArray[i][1];
            if (!matchingLaser[3].includes(alienID)) {

                newAlienArray[i][2] -= 1;
                matchingLaser[3] = [...matchingLaser[3], alienID];
            }
        }

    }

    const filteredAlienPositions =  newAlienArray.filter(
        alien => !(newLaserArray.some(laser =>
            laser.some(element => 
                    element.length === 2 &&   
                    element[0] === alien[0] &&
                    element[1] === alien[1]
            ) &&
            /*!(laser[3].includes(alien[1]))*/
            alien[2] === 0
        ))
    );

    setAlienPositions(prevMatrix => filteredAlienPositions);
    setLaserPositions(prevMatrix => newLaserArray);

    if (alienPositions.length === 0) {
        setWaveNumber(prev => prev + 1);
        setAlienPositions(prevMatrix => newWave(2));
    }

}