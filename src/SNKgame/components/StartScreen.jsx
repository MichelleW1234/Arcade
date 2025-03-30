import { Link } from 'react-router-dom';

function StartScreen (){

    return (

        <div className = "screenLayout">

            <h1 className = "headerwords">
                Welcome to Snake.
            </h1>

            <Link to="/SNKinstructions" className = "generalbuttonGlitch">
                Enter
            </Link>
            
        </div>

    );

}


export default StartScreen;