import { Link } from 'react-router-dom';

import { usePlayer} from '../Providers/PlayerProvider.jsx';
import { usePrize} from '../Providers/PrizeProvider.jsx';

import {playSound} from "../Helpers/helpers.js";

import "./PrizeRoomscreen.css";

function PrizeRoomscreen() {

    const { Player, setPlayer } = usePlayer();
    const { Prize, setPrize } = usePrize();

    const purchaseItem = (index) => {

        playSound(17);
        
        const difference = Player[0] - Prize[index][1];
        setPlayer(prevMatrix => [difference, prevMatrix[0]]);

        const newMatrix = Prize.map(Array => [...Array]);
        newMatrix[index] = ["X"];
        setPrize(prevMatrix => newMatrix);
        
    }

    return (

        <div className = "screenLayout">

            <div className = "instructionsSign"> Your balance: {Player[0]}</div>

            <div className = "prizeRoomContainer"> 

                <div className = "prizeRoomInnerContainer">

                    {Prize.map((item, index) => (

                        item[0] != "X" ? 

                            <div key = {index} className = "prizeWindowContainer">

                                <h2 className = "prizeWindow">
                                    Item: {item[0]} <br/>
                                    Price: {item[1]} points <br/>
                                    <br/>
                                    <img className = "prizeImages" src = {item[2]}/>
                                </h2>


                                {item[1] <= Player[0] ?

                                    <button className = "prizeButton"  onClick = {() => purchaseItem(index)}> Buy </button>

                                :

                                    <div className = "prizeButtonNonClick"> Unavailable </div>

                                }

                            </div>

                        :

                            <div key = {index} className = "prizeWindowContainer">

                                <h2 className = "prizeWindowBought">
                                    X
                                </h2>

                                <div className = "prizeButtonNonClick"> Bought </div>

                            </div>

                    ))}

                </div>
                
            </div>
            
            <Link to="/selection" className = "generalbuttonGlitch" onClick = {() => playSound(1)}>
                Leave Prize Room
            </Link>

        </div>

    )

}
  
    export default PrizeRoomscreen;