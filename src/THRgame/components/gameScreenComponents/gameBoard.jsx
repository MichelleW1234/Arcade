import "./gameBoard.css"
import { useEffect, useState } from 'react';

function gameBoard({setWaveNumber, setThresholdBreached}) {

    const [laserValue, setLaserValue] = useState(14);
    const [laserBlasted, setLaserBlasted] = useState(-1);

    //15 x 27 (30x30 pieces moving around the screen)
    const gameBoardMatrix = Array.from({ length: 15 }, () => Array(27).fill(0));
    const alienPositions = [[0,5], [0,9], [0,15], [0, 20], [14, 10]];


    /*Listener for lasers being shot*/
    useEffect(() => {

        const isInAlienColumn = alienPositions.some(
            ([, col]) => col === laserBlasted
        );
                        
        if (isInAlienColumn) {
            console.log("There's an alien in this column!");
            
        }

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

                        const isAlienHere = alienPositions.some(
                            ([alienRow, alienCol]) => alienRow === rowIndex && alienCol === colIndex
                        );

                        const isLaserHere = laserBlasted === colIndex;
                        
                        return (

                            isLaserHere ? (

                                <div key={rowIndex + "," + colIndex} className="THRlaserSpace">

                                </div>

                            ) : isAlienHere ? (

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
                max="26"
                value={laserValue}
                onChange={(e) => setLaserValue(e.target.value)}
            />

            <button className = "THRFirebutton" onClick={() => setLaserBlasted(laserValue)}> Fire </button>

        </div>


    )

}
export default gameBoard