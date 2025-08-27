import { useNavigate, Link } from 'react-router-dom';
import useKeyboardShortcut from "../hooks/useKeyboardShortcut.js";

import { usePlayer} from '../Providers/PlayerProvider.jsx';
import { usePrize} from '../Providers/PrizeProvider.jsx';

import {playSound} from "../Helpers/helpers.js";

import "./PrizeRoomscreen.css";

function PrizeRoomscreen() {

    const { Player, setPlayer } = usePlayer();
    const { Prize, setPrize } = usePrize();

    const navigate = useNavigate();

    useKeyboardShortcut("Enter", () => {
        playSound(24);
        navigate("/selection");
    },

        ".LeavePrizeRoom"

    );


    
    const purchaseItem = (index) => {

        playSound(17);
        
        setPlayer([Player[0] - Prize[index][1]]);

        const newMatrix = Prize.map(Array => [...Array]);
        newMatrix[index][0] = "X";
        setPrize(prevMatrix => newMatrix);
        
    }

    return (

        <div className = "gameScreenLayout">

            <h1 className = "instructionsSign"> Your Points: <span className='signGlitch'>{Player[0]}</span></h1>

            <div className = "prizeRoomContainer"> 

                <div className = "prizeRoomInnerContainer">

                    {Prize.map((item, index) => (

                        item[1] > 0 ? (
                
                            item[0] != "X" ? (

                                <div key = {index} className = "prizeWindowContainer">

                                    <h2 className = "prizeWindow">
                                        Item: {item[0]} <br/>
                                        Price: {item[1]} points <br/>
                                        <br/>
                                        <img className = "prizeImages" src = {item[2]}/>
                                    </h2>


                                    {item[1] <= Player[0] ? (

                                        <button className = "prizeButton"  onClick = {() => purchaseItem(index)}> Buy </button>

                                    ) : (

                                        <div className = "prizeButtonNonClick"> Unavailable </div>

                                    )}

                                </div>

                            ):(

                                <div key = {index} className = "prizeWindowContainer">

                                    <h2 className = "prizeWindowBought">
                                        X
                                    </h2>

                                    <div className = "prizeButtonNonClick"> Bought </div>

                                </div>

                            )
                        ) : (

                            null

                        )

                    ))}

                </div>
                
            </div>
            
            <Link to="/selection" className = "generalbuttonGlitch LeavePrizeRoom" onClick = {() => playSound(24)}>
                <div className="buttonNameContainer"> Leave Prize Room <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
            </Link>

        </div>

    )

}
  
    export default PrizeRoomscreen;