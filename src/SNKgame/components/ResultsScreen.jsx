import { Link } from 'react-router-dom';

function ResultsScreen (){

    return (

        <div className = "screenLayout">

            <h1 className = "headerwords">
                Summary goes here.
            </h1>

            <Link to="/selection" className = "generalbuttonGlitch">
                Quit Game
            </Link>

            <Link to="/SNKgame" className = "generalbuttonGlitch">
                Play Again
            </Link>
            
        </div>

    );

}


export default ResultsScreen;