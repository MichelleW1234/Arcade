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


    return newMatrix

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
        setAlienPositions(prevMatrix => newWave());
    }

}