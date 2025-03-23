import {useState, React} from 'react';

import { useTTTUser } from '../Providers/TTTUserProvider.jsx';

import './turnDecidingScreen.css';

function turnDecidingScreen() {

    const { TTTUser, setTTTUser} = useTTTUser();

    const [statement, setStatement] = useState("");

    const coinFlip = () => {

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

        <div className = "screenLayout">

            <h1 className ="headerwords"> Press this button: </h1>

            {TTTUser[0] === -1 ? (
                
                <button className = "generalbuttonGlitch" onClick={coinFlip}> Flip Coin </button>

            ) : (

                <div className = "TTTcontainer">

                    <h1 className ="largefont">{statement}</h1>

                    <a href = "/TTTgame" className = "generalbuttonGlitch">
                        Begin Game
                    </a>

                </div>
        
            )}

        </div>

    )

}

export default turnDecidingScreen