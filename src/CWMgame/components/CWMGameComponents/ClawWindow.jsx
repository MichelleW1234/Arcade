import React, { useState, useEffect, useRef } from "react";

import {animateClaw} from "../../Helpers/helpers.js";

import "./ClawWindow.css";

import Claw from "../../../Images/image 22.svg";
import ClawCable from "../../../Images/image 23.svg";

import { playSound } from "../../../Helpers/helpers.js";

function ClawWindow({buttonHit, clawWentDown, setClawWentDown}) {

    const [clawExtension, setClawExtension] = useState(0);
    const array = Array.from({ length: 8 }, () => Array(11).fill(0));

    const clawExtensionRef = useRef(clawExtension);
    useEffect(() => {
        clawExtensionRef.current = clawExtension;
    }, [clawExtension]);

    useEffect(() => {
    
        if (buttonHit == false || clawWentDown == true){

            return;

        }
    
        const interval = setInterval(() => {

            animateClaw(clawExtensionRef.current, setClawExtension, setClawWentDown);

        }, 100);

        return () => clearInterval(interval);
    
    }, [buttonHit, clawWentDown]);

    return (

        <div className="CWMOuterWindow">
            <div className="CWMClawRowContainer">
                {array.map((row, rowIndex) => (
                    row.map((cell, colIndex) => {

                        const clawcableHere = colIndex == 5 && rowIndex < clawExtension

                        const clawHere = colIndex == 5 && rowIndex == clawExtension

                        return(

                            clawHere ? (

                                <img className="CWMClawRow" key={colIndex} src = {Claw}/>

                            ) : clawcableHere ? (

                                <img className="CWMClawRow" key={colIndex} src = {ClawCable}/>
                                
                            ) : (

                                <div className="CWMClawRow" key={colIndex}></div>

                            )

                        )
                    })
                ))}

            </div>
            <div className = "CWMPrizes"> </div>
        </div>

    );

}


export default ClawWindow;