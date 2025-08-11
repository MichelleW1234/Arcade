import {useNavigate, Link } from 'react-router-dom';
import {useState} from 'react';
import useKeyboardShortcut from "../hooks/useKeyboardShortcut";

import { usePlayer} from '../Providers/PlayerProvider.jsx';

import {playSound} from "../Helpers/helpers.js";

import "./RulesandPointsscreen.css";

function RulesandPointsscreen (){

    const { Player, setPlayer } = usePlayer();

    const [pointsClaimed, setPointsClaimed] = useState(false);

    const navigate = useNavigate();

    useKeyboardShortcut("Enter", () => {
        if (Player[0] === 20 && pointsClaimed == true){
            document.querySelectorAll(".LetsGo").forEach(el => {
                el.classList.add("active");
                setTimeout(() => el.classList.remove("active"), 100);
            });
            document.querySelectorAll(".\\32 0pts").forEach(el => el.classList.remove("active"));

            playSound(1);
            navigate("/selection");
        } else {
            document.querySelectorAll(".\\32 0pts").forEach(el => {
                el.classList.add("active");
                setTimeout(() => el.classList.remove("active"), 100);
            });
            document.querySelectorAll(".LetsGo").forEach(el => el.classList.remove("active"));

            claimPoints();
        }
    });




    const claimPoints = () => {

        playSound(2);
        setPlayer([20]);
        setPointsClaimed(true);

    }

    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign"> <span className='signGlitch'>Arcade Rules:</span> </h1>
            <p className = "largefont">  
                &gt; Earn points to win prizes. <br/>
                &gt; You will initially receive 20 points. <br/>
                &gt; Each game has a required number of points to be played.<br/>
                &gt; If you quit a game while you are actively playing it, you will automatically lose points. <br/>
                &gt; You can purchase prizes at any time, however, it's your job to manage your points. <br/>
                &gt; Once you are below the minimum number of points to play any of the games, you cannot win any more points. <br/>
            </p>

            <h1 className = "claimPointsSign"> Claim Points: </h1>

            {pointsClaimed == false ? (

                <button className = "generalbutton \\32 0pts" onClick={() => claimPoints()}>20 pts</button>

            ) : (

                <div className = "pointsClaimedButton"> 20 pts </div>

            )}

            {Player[0] === 20 ? (

                <Link to= "/selection" className = "generalbuttonGlitch LetsGo" onClick = {() => playSound(1)}>
                    Let's Go!
                </Link>
            
            ) : (

                null

            )}
        
        </div>

    );

}


export default RulesandPointsscreen;
