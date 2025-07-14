import React, { useState, useEffect, useRef } from "react";

import "./ClawBar.css";
import positionIndicator from "../../../Images/image 21.svg";

import { playSound } from "../../../Helpers/helpers.js";

function ClawBar({setButtonHit, setResult, currentPosition}) {

    const array = Array.from({ length: 31 }, (_, i) => i);

    return (

        <div className="CWMGameBoardScreen">
            <div className = "CWMBar">
                {array.map((index) => (

                    index < 10 || index > 20 ? (

                        currentPosition == index ? (

                            <div key={index} className="CWMBarNotAccurate">
                                <img className="CWMBarCurrent" key={index} src={positionIndicator}/>
                            </div>

                        ) : (

                            <div key={index} className="CWMBarNotAccurate"></div>

                        )

                    ) : index < 13 || index > 17 ? (

                        currentPosition == index ? (

                            <div key={index} className="CWMBarInRange">
                                <img className="CWMBarCurrent"  key={index} src={positionIndicator}/>
                            </div>

                        ) : (

                            <div key={index} className="CWMBarInRange"></div>

                        )

                    ) : index < 15 || index > 15 ? (

                        currentPosition == index ? (

                            <div key={index} className="CWMBarClose">
                                <img className="CWMBarCurrent"  key={index} src={positionIndicator}/>
                            </div>

                        ) : (

                            <div key={index} className="CWMBarClose"></div>
                        )

                    ) : (

                        currentPosition == index ? (

                             <div key={index} className="CWMBarVeryClose">
                                <img className="CWMBarCurrent"  key={index} src={positionIndicator}/>
                            </div>

                        ) : (

                            <div key={index} className="CWMBarVeryClose"></div>
                        )

                    )
                    
                ))}
            </div>

        </div>

    );

}


export default ClawBar;