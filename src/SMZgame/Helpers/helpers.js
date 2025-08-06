import {playSound} from "../../Helpers/helpers.js";

export const wallHeight = (column) => {

    let newWallMatrix = []; 

    const gapStart = Math.floor(Math.random() * (8 + 1)); 

    for (let i = gapStart + 2; i<10; i++){

        newWallMatrix.push([i, column]);

    }

    for (let i = 0; i<gapStart; i++){

        newWallMatrix.push([i, column]);

    }

    return newWallMatrix;

}

export const birdFlyingForward = (wallPositions, setWallPositions) => {

    let newWalls = wallPositions.map(row =>
        row.map(inner => [...inner])
    );

    for (let i =0; i< newWalls.length; i++){

        for (let j =0; j < newWalls[i].length; j ++){

            newWalls[i][j][1] -= 1;
        }

    }

    let newWallsFiltered = newWalls.map(row =>
        row.filter(position => position[1] >= 0)
    );

    const newWallNeeded = newWallsFiltered.every(row =>
        row.every(position => position[1] <= 4)
    );

    if (newWallNeeded){

        const newWall = wallHeight(16);
        newWallsFiltered.push(newWall);

    }

    setWallPositions(newWallsFiltered);

}


export const birdFlyingUpwards = (birdPosition, setBirdPosition, startButtonClicked, setStartButtonClicked) => {

    if (startButtonClicked == false){

        setStartButtonClicked(true);
        playSound(3);

    } else {

        if (birdPosition[0] > 0){

            playSound(3);
            setBirdPosition(prev => [prev[0] - 1, prev[1]]);

        } else {

            playSound(5);

        }

    }

}


export const birdFlyingDownwards = (birdPosition, setBirdPosition, startButtonClicked, setStartButtonClicked) => {

    if (startButtonClicked == false){

        setStartButtonClicked(true);
        playSound(3);

    } else {

        if (birdPosition[0] < 9){

            playSound(3);
            setBirdPosition(prev => [prev[0] + 1, prev[1]]);

        } else {

            playSound(5);

        }

    }

}



export const checkHit = (setWallHit, birdPosition, wallPositions) => {

    const wallHit = wallPositions
        .flat()
        .some(pair => pair[0] === birdPosition[0] && pair[1] === birdPosition[1]);

    if (wallHit) {

        setWallHit(true);

    }

}