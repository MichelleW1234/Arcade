import { useState, useEffect, useRef } from "react";

import {animateClaw} from "../../../Helpers/helpers.js";

import "./SpaceClawWindow.css";

import claw from "../../../../Images/image 22.svg";
import clawCable from "../../../../Images/image 23.svg";
import prizes from "../../../../Images/image 26.svg";


function SpaceClawWindow({buttonHit, clawWentDown, setClawWentDown, currentPosition}) {

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

        <div className="CWMSpaceOuterWindow">
            <div className="CWMSpaceClawRowContainer">
                {array.map((row, rowIndex) => (
                    row.map((_, colIndex) => {

                        const clawCableHere = rowIndex < clawExtension[0] && colIndex === clawExtension[1]
                        const clawHere = rowIndex === clawExtension[0] && colIndex === clawExtension[1]

                        return(

                            clawHere === true ? (

                                <img className="CWMSpaceClawRow" key={rowIndex + "," + colIndex} src = {claw} alt = "" />

                            ) : clawCableHere === true ? (

                                <img className="CWMSpaceClawRow" key={rowIndex + "," + colIndex} src = {clawCable} alt = "" />
                                
                            ) : (

                                <div className="CWMSpaceClawRow" key={rowIndex + "," + colIndex}></div>

                            )

                        )
                    })
                ))}

            </div>
            <div className="CWMSpacePrizesContainer">
                <img className = "CWMSpacePrizes" src = {prizes} alt = "" />
                <div className="CWMSpaceoverlayPrizeWindow "></div>
            </div>
        </div>

    );

}


export default SpaceClawWindow;