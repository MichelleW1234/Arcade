import { Link } from 'react-router-dom';

function InstructionsScreen (){

    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign">
                Instructions: 
            </h1>
            <p className = "largefont">
                (Complete later)
            </p>

            <Link to="/SNKgame" className = "generalbuttonGlitch">
                Begin Game
            </Link>
            
        </div>

    );

}


export default InstructionsScreen;