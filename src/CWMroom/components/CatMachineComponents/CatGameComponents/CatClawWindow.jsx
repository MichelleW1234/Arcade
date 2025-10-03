import { useState, useEffect, useRef } from "react";

import {animateClaw} from "../../../Helpers/helpers.js";

import "./CatClawWindow.css";

import claw from "../../../../Images/image 22.svg";
import clawCable from "../../../../Images/image 23.svg";
import prizes from "../../../../Images/image 24.svg";

function CatClawWindow({buttonHit, clawWentDown, setClawWentDown, currentPosition}) {

    const [clawExtension, setClawExtension] = useState([0,0]);
    const array = Array.from({ length: 8 }, () => Array(23).fill(0));

    const clawExtensionRef = useRef(clawExtension);
    useEffect(() => {
        clawExtensionRef.current = clawExtension;
    }, [clawExtension]);

    useEffect(() => {
    
        if (buttonHit === false || clawWentDown === true){

            return;

        }
    
        const interval = setInterval(() => {

            animateClaw(currentPosition, clawExtensionRef.current, setClawExtension, setClawWentDown);

        }, 100);

        return () => clearInterval(interval);
    
    }, [buttonHit, clawWentDown]);

    return (

        <div className="CWMCatOuterWindow">
            <div className="CWMCatClawRowContainer">
                {array.map((row, rowIndex) => (
                    row.map((_, colIndex) => {

                        const clawCableHere = rowIndex < clawExtension[0] && colIndex === clawExtension[1]
                        const clawHere = rowIndex === clawExtension[0] && colIndex === clawExtension[1]

                        return(

                            clawHere === true ? (

                                <img className="CWMCatClawRow" key={rowIndex + "," + colIndex} src = {claw} alt = "" />

                            ) : clawCableHere === true ? (

                                <img className="CWMCatClawRow" key={rowIndex + "," + colIndex} src = {clawCable} alt = "" />
                                
                            ) : (

                                <div className="CWMCatClawRow" key={rowIndex + "," + colIndex}></div>

                            )

                        )
                    })
                ))}

            </div>
            <div className="CWMCatPrizesContainer">
                <img className = "CWMCatPrizes" src = {prizes} alt = "" />
                <div className="CWMCatoverlayPrizeWindow"></div>
            </div>

        </div>

    );

}

export default CatClawWindow;