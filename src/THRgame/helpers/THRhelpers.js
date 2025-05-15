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


export const newWave = () => {

    const newMatrix = [];
    for (let i =0; i<3; i++){

        const random = Math.floor(Math.random() * 27);
        newMatrix.push([0, random])

    }

    for (let i =0; i<3; i++){

        const random = Math.floor(Math.random() * 27);
        newMatrix.push([2, random])

    }

    return newMatrix;

}


export const alienKilled = (laserPositions, alienPositions, setAlienPositions, setWaveNumber) => {

    const newPositions =  alienPositions.filter(
        alien => !(laserPositions.some(laser => laser.length === alien.length && laser.every((val, i) => val === alien[i])))
    );

    setAlienPositions(prevMatrix => newPositions);

    if (alienPositions.length === 0) {
        setWaveNumber(prev => prev + 1);
        setAlienPositions(prevMatrix => newWave());
    }

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