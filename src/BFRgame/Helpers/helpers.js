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