export const retrieveActiveGame = (index) => {
    
    let gameControls = new Array(null, null, null, null, null);

    if (index === 1){

        gameControls[0] = "/RPSstart";
        gameControls[1] = 20;

    } else if (index === 2){

        gameControls[0] = "/TTThome";
        gameControls[1] = 10;

    } else if (index === 3){

        gameControls[0] = "/SNKstart";
        gameControls[1] = 10;

    } 

    return gameControls;

}

export const pointsDistribution = (ActiveGame, winner, setPlayer) => {

    if (winner == 1){

        setPlayer(prev => [prev[0] + ActiveGame[1], prev[0]]);

    } else if (winner == 0){

        setPlayer(prev => [prev[0] - ActiveGame[1], prev[0]]);

    } else {

        setPlayer(prev => [prev[0], prev[0]]);

    }

}

