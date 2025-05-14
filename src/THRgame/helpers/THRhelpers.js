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

export const checkButtonClicked = (laserBlasted, setLaserBlasted) => {

    if (laserBlasted != -1){
        setLaserBlasted(-1);
    }

}


const newWave = (setAlienPositions) => {
    const newMatrix = [[0,0], [0,5], [0,9], [0,15], [0, 20]];
    setAlienPositions(prevMatrix => newMatrix);

}


export const alienKilled = (laserBlasted, alienPositions, setAlienPositions, setWaveNumber) => {

    const isInAlienColumn = alienPositions.some(
        ([, col]) => col === laserBlasted
    );

    if (isInAlienColumn === true) {
        const newMatrix = alienPositions.filter(subArray => subArray[1] !== laserBlasted);
        setAlienPositions(prevMatrix => newMatrix);
    }

    if (alienPositions.length === 0) {
        setWaveNumber(prev => prev + 1);
        newWave(setAlienPositions);
    }

}