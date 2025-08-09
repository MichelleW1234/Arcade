import { useNavigate, Link } from 'react-router-dom';
import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut";

import {playSound} from '../../../Helpers/helpers.js';

function CatInstructionsscreen (){

    const navigate = useNavigate();

    useKeyboardShortcut("Escape", () => {
        playSound(2);
        navigate("/CWMselection");
    });

    useKeyboardShortcut("Enter", () => {
        playSound(19);
        navigate("/CWMcatgame");
    });

    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign"> <span className='signGlitch'>Instructions:</span></h1>
            
            <p className = "largefont">
                &gt; The prizes that you can win from this machine are cats. <br/>
                &gt; The ranking of the prizes from least to most rare is: <br/>
                &nbsp; &nbsp; 1. Black cats <br/>
                &nbsp; &nbsp; 2. Orange cats <br/>
                &nbsp; &nbsp; 3. Siamese cats <br/>
                &nbsp; &nbsp; 4. British Shorthair cats<br/>
                &gt; NOTE: Beyond this point, you will lose points and win no prize if you quit in the middle of the game. <br/>
            </p>

            <div className="generalbuttonContainer">
                <Link to="/CWMselection" className = "generalbutton" onClick={() => playSound(2)}>
                    Leave Machine
                </Link>
                <Link to="/CWMcatgame" className = "generalbuttonGlitch" onClick={() => playSound(19)}>
                    Continue
                </Link>
            </div>
            
        </div>

    );

}


export default CatInstructionsscreen;