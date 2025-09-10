import positionIndicator from "../../../Images/image 21.svg";

import "./ClawBar.css";

function ClawBar({currentPosition}) {

    return (

        <div className="CWMGameBoardScreen">
            <div className = "CWMBar">
                {Array.from({ length: 23 }, (_, i) => (

                    i < 5 || i > 17 ? (

                        currentPosition === i ? (

                            <div key={i} className="CWMBarNotAccurate">
                                <img className="CWMBarCurrent" key={i} src={positionIndicator}/>
                            </div>

                        ) : (

                            <div key={i} className="CWMBarNotAccurate"></div>

                        )

                    ) : i < 8 || i > 14 ? (

                        currentPosition === i ? (

                            <div key={i} className="CWMBarInRange">
                                <img className="CWMBarCurrent"  key={i} src={positionIndicator}/>
                            </div>

                        ) : (

                            <div key={i} className="CWMBarInRange"></div>

                        )

                    ) : i < 11 || i > 11 ? (

                        currentPosition === i ? (

                            <div key={i} className="CWMBarClose">
                                <img className="CWMBarCurrent"  key={i} src={positionIndicator}/>
                            </div>

                        ) : (

                            <div key={i} className="CWMBarClose"></div>
                        )

                    ) : (

                        currentPosition === i ? (

                            <div key={i} className="CWMBarVeryClose">
                                <img className="CWMBarCurrent"  key={i} src={positionIndicator}/>
                            </div>

                        ) : (

                            <div key={i} className="CWMBarVeryClose"></div>
                        )

                    )
                    
                ))}
            </div>

        </div>

    );

}


export default ClawBar;