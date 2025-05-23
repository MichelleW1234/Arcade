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

            newMatrix.push([0, positions[i], 6, 2]); 
            /* 6 = # of hits per alien multipled by 3 for the length of a laser */

        }

        for (let i=5; i<positions.length; i++){

            newMatrix.push([0, positions[i], 1, 1]); 

        }

    } else {




    }

    return newMatrix;

}

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










export const aliensIncomingM1 = (setAlienPositions, alienPositions, setThresholdBreached) => {

    const newMatrix = alienPositions.map(innerArray => [...innerArray]);

    for (let i = 0; i < newMatrix.length; i++) {

        newMatrix[i][0] += 1;

        if (newMatrix[i][0] >= 15){

            setThresholdBreached(true);

        }

    }

    setAlienPositions(prevMatrix => newMatrix);

}


export const aliensIncomingM2 = (setAlienPositions, alienPositions, setThresholdBreached) => {

    const newMatrix = alienPositions.map(innerArray => [...innerArray]);

    for (let i = 0; i < newMatrix.length; i++) {

        newMatrix[i][0] += 1;

        if (newMatrix[i][0] >= 15){

            setThresholdBreached(true);

        }

    }

    setAlienPositions(prevMatrix => newMatrix);

}












export const alienKilledM1 = (laserPositions, alienPositions, setAlienPositions, setWaveNumber) => {

    const newPositions =  alienPositions.filter(
        alien => !(laserPositions.some(laser => laser.length === alien.length && laser.every((val, i) => val === alien[i])))
    );

    setAlienPositions(prevMatrix => newPositions);

    if (alienPositions.length === 0) {
        setWaveNumber(prev => prev + 1);
        setAlienPositions(prevMatrix => newWave(1));
    }

}


export const alienKilledM2 = (laserPositions, alienPositions, setAlienPositions, setWaveNumber) => {

    const newAlienArray = alienPositions.map(innerArray => [...innerArray]);
    for (let i =0; i<newAlienArray.length; i++){

        if (laserPositions.some(laser =>
            laser.length === 2 &&
            laser[0] === newAlienArray[i][0] &&
            laser[1] === newAlienArray[i][1]
        )){

            newAlienArray[i][2] -= 1;

        }

    }

    const filteredAlienPositions =  newAlienArray.filter(
        alien => !(laserPositions.some(
            laser =>
                laser.length === 2 &&
                laser[0] === alien[0] &&
                laser[1] === alien[1] &&
                alien[2] === 0
        ))
    );

    setAlienPositions(prevMatrix => filteredAlienPositions);

    if (alienPositions.length === 0) {
        setWaveNumber(prev => prev + 1);
        setAlienPositions(prevMatrix => newWave(2));
    }

}

