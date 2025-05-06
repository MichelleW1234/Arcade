import { useState } from 'react';

import GameBoard from "./gameScreenComponents/gameBoard.jsx"
import "./GameScreen.css"

function gameScreen() {

    const [value, setValue] = useState(50);

    return (

        <div className = "screenLayout">

            <div className = "instructionsSign"> Wave Number: </div>

            <div className="THRouterContainer">

                <GameBoard/>
                <input className = "THRSlider"
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button className = "THRFirebutton"> Fire </button>
                
            </div>

        </div>

    )

}
export default gameScreen