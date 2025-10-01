import positionIndicator from "../../../Images/image 21.svg";

import "./ClawBar.css";

function ClawBar({currentPosition}) {

    return (

        <div className="CWMGameBoardScreen">
            <div className = "CWMBar">
                {Array.from({ length: 23 }, (_, i) => (

                    currentPosition === i ? (

                        <div 
                            key={i} 
                            className={i < 5 || i > 17 ? "CWMBarNotAccurate"
                                    : i < 8 || i > 14 ? "CWMBarInRange"
                                    : i < 11 || i > 11 ? "CWMBarClose" 
                                    : "CWMBarVeryClose"}
                        >
                            <img className="CWMBarCurrent" key={i} src={positionIndicator} alt = "" />
                        </div>

                    ) : (

                        <div 
                            key={i} 
                            className={i < 5 || i > 17 ? "CWMBarNotAccurate"
                                    : i < 8 || i > 14 ? "CWMBarInRange"
                                    : i < 11 || i > 11 ? "CWMBarClose" 
                                    : "CWMBarVeryClose"}>
                        </div>

                    )    
                    
                ))}
            </div>

        </div>

    );

}


export default ClawBar;