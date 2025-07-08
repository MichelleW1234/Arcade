import React, { useState, useEffect, useRef } from "react";

import { getRandomExcluding } from "../../Helpers/helpers.js";

import { useCBLUser } from "../../Providers/CBLUserProvider.jsx";

import "./InnerGameScreen.css";
import { playSound } from "../../../Helpers/helpers.js";

function InnerGameScreen({setColorAppearances, colorToBlast, setWrongColorBlasted}) {

    const { CBLUser, setCBLUser } = useCBLUser();

    const [colorSpot, setColorSpot] = useState([Math.floor(Math.random() * 16), Math.floor(Math.random() * 4)]);
    const [colorBlasted, setColorBlasted] = useState(false);

    /*20 × 30 matrix*/
    const gameArray = Array.from({ length: 4 }, () => Array(4).fill(0));


    const colorSpotRef = useRef(colorSpot);
    useEffect(() => {
        colorSpotRef.current = colorSpot;
    }, [colorSpot]);

    useEffect(() => {

        const interval = setInterval(() => {

            setColorBlasted(false);

            const newPosition = getRandomExcluding(colorSpotRef.current[0]);
            const type = Math.floor(Math.random() * 4);
            setColorSpot([newPosition, type]);

            setColorAppearances(prev => {
                const newVal = prev + 1;
                if (newVal === 50) {
                    playSound(6);
                }
                return newVal;
            });

        }, 700);

        return () => clearInterval(interval);

    }, []);


    const blasted = (type) => {

        if (type === colorToBlast) {

            setCBLUser(prev => {
                const updated = [...prev];
                updated[0] = updated[0] + 1;
                return updated;
            });

            setColorBlasted(true);
            playSound(21);

        } else {

            setWrongColorBlasted(true);
            playSound(6);

        }

    }


    return (

        <div className={
            colorToBlast === 0 ? "CBLGameBoardScreenOne"
            : colorToBlast === 1 ? "CBLGameBoardScreenTwo"
            : colorToBlast === 2 ? "CBLGameBoardScreenThree"
            : "CBLGameBoardScreenFour"
        }>

            {gameArray.map((row, rowIndex) => (
                row.map((cell, colIndex) => {

                    const colorHere = colorSpot[0] == rowIndex * 4 + colIndex;

                    return (

                        colorHere ? (

                            colorBlasted ? (

                                <button key={rowIndex + "," + colIndex} className="CBLGameBoardHole"></button>

                            ) : (

                                <button key={rowIndex + "," + colIndex}  
                                    className={colorSpot[1] === 0 ? "CBLGameBoardColorOne"
                                        : colorSpot[1] === 1 ? "CBLGameBoardColorTwo"
                                        : colorSpot[1] === 2 ? "CBLGameBoardColorThree"
                                        : "CBLGameBoardColorFour"}
                                    onClick={() => blasted(colorSpot[1])}>
                                </button>

                            )

                        ) : (

                            <button key={rowIndex + "," + colIndex} className="CBLGameBoardHole"></button>

                        )


                    )

                })
            ))}

        </div>

    );

}


export default InnerGameScreen;