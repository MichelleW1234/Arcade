import React, { useState, useEffect, useRef } from "react";

import {animateClaw} from "../../../Helpers/helpers.js";

import "./SpaceClawWindow.css";

import Claw from "../../../../Images/image 22.svg";
import ClawCable from "../../../../Images/image 23.svg";


function SpaceClawWindow({buttonHit, clawWentDown, setClawWentDown, currentPosition}) {

    const [clawExtension, setClawExtension] = useState([0,0]);
    const array = Array.from({ length: 8 }, () => Array(23).fill(0));

    const clawExtensionRef = useRef(clawExtension);
    useEffect(() => {
        clawExtensionRef.current = clawExtension;
    }, [clawExtension]);

    useEffect(() => {
    
        if (buttonHit == false || clawWentDown == true){

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
                    row.map((cell, colIndex) => {

                        const clawcableHere = rowIndex < clawExtension[0] && colIndex == clawExtension[1]
                        const clawHere = rowIndex == clawExtension[0] && colIndex == clawExtension[1]

                        return(

                            clawHere ? (

                                <img className="CWMSpaceClawRow" key={rowIndex + "," + colIndex} src = {Claw}/>

                            ) : clawcableHere ? (

                                <img className="CWMSpaceClawRow" key={rowIndex + "," + colIndex} src = {ClawCable}/>
                                
                            ) : (

                                <div className="CWMSpaceClawRow" key={rowIndex + "," + colIndex}></div>

                            )

                        )
                    })
                ))}

            </div>
            <img className = "CWMSpacePrizes"/>
        </div>

    );

}


export default SpaceClawWindow;