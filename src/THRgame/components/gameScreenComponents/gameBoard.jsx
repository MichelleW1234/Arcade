import "./gameBoard.css"
import { useEffect, useState } from 'react';

function gameBoard({setWaveNumber, setThresholdBreached}) {

    const [laserValue, setLaserValue] = useState(50);
    const [laserBlasted, setLaserBlasted] = useState(-1);

    //15 x 27 (30x30 pieces moving around the screen)
    const gameBoardMatrix = Array.from({ length: 15 }, () => Array(27).fill(0));
    const aliens = [[0,5], [0,9], [0,15], [0, 20], [14, 10]];

    /*Listener for fire button pressed */
    useEffect(() => {
        
        return () => {
        };
    }, []);

    /* Wave rerendering */
    useEffect(() => {

        return () => {
        };
    }, []);


    return (

        <div className = "THRgameContainer">

            <div className = "THRgameScreen"> 

                {gameBoardMatrix.map((row, rowIndex) => (
                    row.map((num, colIndex) => {

                        const isAlienHere = aliens.some(
                            ([alienRow, alienCol]) => alienRow === rowIndex && alienCol === colIndex
                        );
                        
                        return (

                            isAlienHere ? (

                                <div key={rowIndex + "," + colIndex} className="THRalienSpace">

                                </div>


                            ) : (

                                <div key={rowIndex + "," + colIndex} className="THRemptySpace">

                                </div>
                    
                            )
                    
                        )

                    })
                ))}

                
            </div>

            <input className = "THRSlider"
                type="range"
                min="0"
                max="100"
                value={laserValue}
                onChange={(e) => setLaserValue(e.target.value)}
            />

            <button className = "THRFirebutton" onClick={() => setLaserBlasted(laserValue)}> Fire </button>

        </div>


    )

}
export default gameBoard