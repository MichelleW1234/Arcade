import {useNavigate, Link } from 'react-router-dom';
import {useState} from 'react';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";
import { useExitPoints } from "../../hooks/useExitPoints";
import { storage } from "../../storage";

import { useTTTUser } from '../Providers/TTTUserProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePlayer } from '../../Providers/PlayerProvider.jsx';

import {playSound} from '../../Helpers/helpers.js';

import './TurnDecidingscreen.css';

function TurnDecidingscreen() {

    const { TTTUser, setTTTUser} = useTTTUser();
    const { ActiveGame, setActiveGame} = useActiveGame();
    const {Player, setPlayer} = usePlayer();

    const [statement, setStatement] = useState("");

    const navigate = useNavigate();
    
    useKeyboardShortcut("Enter", () => {
        if (TTTUser[0] === -1) {
            document.querySelectorAll(".FlipCoin").forEach(el => {
                el.classList.add("active");
                setTimeout(() => el.classList.remove("active"), 100);
            });
            document.querySelectorAll(".BeginGame").forEach(el => el.classList.remove("active"));

            coinFlip();
        } else {
            document.querySelectorAll(".BeginGame").forEach(el => {
                el.classList.add("active");
                setTimeout(() => el.classList.remove("active"), 100);
            });
            document.querySelectorAll(".FlipCoin").forEach(el => el.classList.remove("active"));

            playSound(18);
            navigate("/TTTgame");
        }
    });
    

    useExitPoints(() => {
        const adjustedPoints = [Player[0] - ActiveGame[1]];
        storage.set("Player", adjustedPoints);
        setPlayer(adjustedPoints);
    });
    

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
                
                <button className = "generalbuttonGlitch FlipCoin" onClick={() => coinFlip()}> 
                    <div className="buttonNameContainer"> Flip Coin  <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                </button>

            ) : (

                <>
                    <p className ="largefont">{statement}</p>

                    <Link to= "/TTTgame" className = "generalbuttonGlitch BeginGame" onClick={() => playSound(18)}>
                        <div className="buttonNameContainer"> Begin Game <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
                    </Link>
                </>
            
        
            )}

        </div>

    )

}

export default TurnDecidingscreen;