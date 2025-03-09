import { useStarter } from '../Providers/StarterProvider.jsx';
import {useState, React} from 'react';
import './turnDecidingScreen.css';

function turnDecidingScreen() {

    const { Starter, setStarter} = useStarter();
    const [statement, setStatement] = useState("");

    const coinFlip = () => {

        const randomChoice = Math.floor(Math.random() * 2);

        if (randomChoice == 0){

            setStarter(randomChoice);
            setStatement("The computer will go first.");

        } else {

            setStarter(randomChoice);
            setStatement("You will go first.");

        }

    }

    return(

        <div className = "screenLayout">

            <h1 className ="headerwords"> Press this button: </h1>

            {Starter === -1 ? (
                
                <button className = "generalbutton" onClick={() => coinFlip()}> Flip Coin </button>

            ) : (

                <div className = "container">

                    <h1 className ="largefont">{statement}</h1>

                    <a href = "/TTTgame">
                        <button className = "generalbutton"> Begin Game </button>
                    </a>

                </div>
        
            )}

        </div>

    )

}

export default turnDecidingScreen