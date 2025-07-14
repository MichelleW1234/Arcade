import {useState, React} from 'react';
import { Link } from 'react-router-dom';

import { useTTTUser } from '../Providers/TTTUserProvider.jsx';

import {playSound} from '../../Helpers/helpers.js';

import './TurnDecidingscreen.css';

function TurnDecidingscreen() {

    const { TTTUser, setTTTUser} = useTTTUser();

    const [statement, setStatement] = useState("");

    const coinFlip = () => {

        playSound(2);
        const randomChoice = Math.floor(Math.random() * 2);

        if (randomChoice == 0){

            setStatement("The computer will go first.");

        } else {

            setStatement("You will go first.");

        }

        setTTTUser((prev) => {
            const updatedUser = [...prev];
            updatedUser[0] = randomChoice;
            return updatedUser;
        });

    }

    return(

        <div className = "TTTTurnScreenLayout">

            <h1 className ="headerwords"> Press this button: </h1>

            {TTTUser[0] === -1 ? (
                
                <button className = "generalbuttonGlitch" onClick={() => coinFlip()}> Flip Coin </button>

            ) : (

                <>
                    <h1 className ="largefont">{statement}</h1>

                    <Link to= "/TTTgame" className = "generalbuttonGlitch" onClick={() => playSound(18)}>
                        Begin Game
                    </Link>
                </>
            
        
            )}

        </div>

    )

}

export default TurnDecidingscreen;