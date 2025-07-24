import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

export const incomingItem = () => {

    const randomNumber = Math.floor(Math.random() * 2);

    return randomNumber;

}

export const itemsShifting = (positions, setPositions) => {

    let newMatrix = positions.map(row => [...row]);

    for (let i =0; i< newMatrix.length; i++){

        newMatrix[i][0] -= 1;

    }

    let newMatrixFiltered = newMatrix.filter(position => position[0] >= 0);
    const moreItems = newMatrixFiltered.every(position => position[0] <= 8);

    if (moreItems){

        const newItem = [16, incomingItem()];
        newMatrixFiltered.push(newItem);

    }

    setPositions(newMatrixFiltered);

}

export const checkHit = (positions, setPositions, setBFRUser, BFRUser) => {

    let birdShot = false;
    let balloonPopped = false;

    for (const [r, c] of positions) {
        if (r === 8 && c === 0) birdShot = true;
        if (r === 8 && c === 1) balloonPopped = true;
        if (birdShot || balloonPopped) break;
    }

    if (birdShot) {

        playSound(28);

        if (BFRUser[0] > 0){

            setBFRUser(prev => [prev[0] - 1]);

        }

    }

    if (balloonPopped) {

        playSound(27);

        let newMatrix = positions.filter(position => !(position[0] == 8));
        setPositions(newMatrix);

        setBFRUser(prev => [prev[0] + 1]);

    }

    if (!birdShot && !balloonPopped){

        playSound(26);

    }


}