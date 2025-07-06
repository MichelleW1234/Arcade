import React, { useState, useEffect, useRef } from "react";

import { getRandomExcluding } from "../../Helpers/helpers.js";

import { useCBLUser } from "../../Providers/CBLUserProvider.jsx";

import "./InnerGameScreen.css";
import { playSound } from "../../../Helpers/helpers.js";

function InnerGameScreen() {

    const { CBLUser, setCBLUser } = useCBLUser();

    const [colorSpot, setColorSpot] = useState([Math.floor(Math.random() * 16), Math.floor(Math.random() * 20)]);
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
            const type = Math.floor(Math.random() * 20);
            setColorSpot([newPosition, type]);

        }, 650);

        return () => clearInterval(interval);

    }, []);

    const bonked = () => {

        if (colorSpot[1] < 18) {

            setCBLUser(prev => {
                const updated = [...prev];
                updated[0] = updated[0] + 1;
                return updated;
            });

        } else {

            setCBLUser(prev => {
                const updated = [...prev];
                updated[0] = updated[0] + 5;
                return updated;
            });

        }
    
        setColorBlasted(true);

    }


    return (

        <div className="CBLGameBoardScreen">

            {gameArray.map((row, rowIndex) => (
                row.map((cell, colIndex) => {

                    const colorHere = colorSpot[0] == rowIndex * 4 + colIndex;

                    return (

                        colorHere ? (

                            colorBlasted ? (

                                <button key={rowIndex + "," + colIndex} className="CBLGameBoardHole"></button>

                            ) : (

                                colorSpot[1] < 18 ? (

                                    <button key={rowIndex + "," + colIndex} className="CBLGameBoardColor" onClick={() => bonked()}></button>

                                ) : (

                                    <button key={rowIndex + "," + colIndex} className="CBLGameBoardColorSpecial" onClick={() => bonked()}></button>

                                )
                    

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