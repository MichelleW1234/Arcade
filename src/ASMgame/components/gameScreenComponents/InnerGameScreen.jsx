import React, { useState, useEffect} from "react";

import {newSpot} from "../../Helpers/helpers.js";

import "./InnerGameScreen.css";

function InnerGameScreen ({setNumAliens}){

    const [alienSpot, setAlienSpot] = useState([-1, -1]);
    const [alienOut, setAlienOut] = useState(true);
    const [alienWasHit, setAlienWasHit] = useState(false);

    /*20 × 30 matrix*/
    const gameArray = Array.from({ length: 4 }, () => Array(4).fill(0));

    useEffect(() => {
    
        const interval = setInterval(() => {

            setAlienWasHit(false);

            if (alienOut == true){

                const appears = Math.floor(Math.random() * 2);

                if (appears == 0){

                    setAlienSpot(newSpot());
                    setNumAliens(prev => prev + 1);

                } else {

                    setAlienSpot([-1, -1]);

                }

                setAlienOut(false);

            } else {

                setAlienSpot([-1, -1]);
                setAlienOut(true);

            }

        }, 600);

        return () => clearInterval(interval);

    }, [alienOut]);
    

    const alienHit = (rowIndex, colIndex) => {

        /*Make provider for num of alien hits */
        setAlienWasHit(true);

    }


    return (

        <div className = "ASMGameBoardScreen">
            {gameArray.map((row, rowIndex) => (
                row.map((cell, colIndex) => {

                    const alienHere = alienSpot[0] === rowIndex && alienSpot[1] === colIndex;

                    return (

                        alienHere ? (

                            alienWasHit ? (

                                <button key = {rowIndex + "," + colIndex} className="ASMGameBoardHole"></button>

                            ) : (

                                <button key = {rowIndex + "," + colIndex} className="ASMGameBoardHole" onClick = {() =>  alienHit()}>
                                    <div> image goes here</div>
                                </button>   

                            )
                
                        ) : (

                            <button key = {rowIndex + "," + colIndex} className="ASMGameBoardHole"></button>

                        )


                    )

                })
            ))}

        </div>

    );

}


export default InnerGameScreen;