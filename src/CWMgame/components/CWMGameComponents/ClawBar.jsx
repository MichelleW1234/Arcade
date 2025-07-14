import React, { useState, useEffect, useRef } from "react";

import "./ClawBar.css";
import { playSound } from "../../../Helpers/helpers.js";

function ClawBar({setButtonHit, setResult, currentPosition}) {

    const array = Array.from({ length: 31 }, (_, i) => i);

    return (

        <div className="CWMGameBoardScreen">
            <div className = "CWMBar">
                {array.map((index) => (

                    currentPosition == index ? (

                        <div key={index} className="CWMBarCurrent"></div>

                    ) : index < 10 || index > 20 ? (

                        <div key={index} className="CWMBarNotAccurate"></div>

                    ) : index < 13 || index > 17 ? (

                        <div key={index} className="CWMBarInRange"></div>

                    ) : index < 15 || index > 15 ? (

                        <div key={index} className="CWMBarClose"></div>

                    ) : (

                        <div key={index} className="CWMBarVeryClose"></div>

                    )
                    
                ))}
            </div>

        </div>

    );

}


export default ClawBar;