export const incomingItem = (set) => {

    const randomNumber = Math.floor(Math.random() * 6);

    if (randomNumber <= 2){

        return 1;

    } else {

        return 0;

    }


}

export const itemsShifting = (positions, setPositions) => {

    let newMatrix = positions.map(row => [...row]);

    for (let i =0; i< newMatrix.length; i++){

        newMatrix[i][0] -= 1;

    }

    let newMatrixFiltered = newMatrix.filter(position => position[0] >= 0);
    const moreItems = newMatrixFiltered.every(position => position[0] <= 9);

    if (moreItems){

        const newItem = [19, incomingItem()];
        newMatrixFiltered.push(newItem);

    }

    setPositions(newMatrixFiltered);

}

export const checkHit = (positions, setPositions, setBFRUser, BFRUser) => {

    let wrongBalloon = false;
    let balloonPopped = false;

    for (const [r, c] of positions) {
        if (r === 10 && c === 0) wrongBalloon = true;
        if (r === 10 && c === 1) balloonPopped = true;
        if (wrongBalloon || balloonPopped) break;
    }

    if (wrongBalloon) {

        if (BFRUser[0] > 0){

            setBFRUser(prev => [prev[0] - 1]);

        }

    }

    if (balloonPopped) {

        let newMatrix = positions.filter(position => !(position[0] == 10 && position[1] == 1));
        setPositions(newMatrix);

        setBFRUser(prev => [prev[0] + 1]);

    }


}