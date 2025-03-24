import GameBoard from "./gameComponents/GameBoard.jsx";

function GamesScreen (){

    return (

        <div className = "screenLayout">

            <h1 className = "headerwords">
                Gameboard:
            </h1>

            <GameBoard/>
            
        </div>

    );

}


export default GamesScreen;