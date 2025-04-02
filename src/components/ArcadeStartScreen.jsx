import { Link } from 'react-router-dom';

function ArcadeStartScreen (){

    return (

        <div className = "StartingScreenLayout">

            <h1 className = "headerwords">
                Welcome to The <span className = "headerwordsGlitch">Arcade</span>.
            </h1>

            <Link to="/rulesAndPoints" className = "generalbuttonGlitch">
                Enter
            </Link>
            
        </div>

    );

}


export default ArcadeStartScreen;