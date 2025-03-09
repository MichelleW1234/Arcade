export const retrieveActiveGame = (index) => {
    
    let gameControls = new Array("-1", "-1", "-1", "-1", "-1");

    if (index == 1){

        gameControls[0] = "/RPSstart";
        gameControls[1] = "20";

    } else if (index == 2){

        gameControls[0] = "/TTThome";
        gameControls[1] = "10";

    }

    return gameControls;

}