import positionIndicator from "../../../Images/image 21.svg";

import "./ClawBar.css";

function ClawBar({currentPosition}) {

    const array = Array.from({ length: 23 }, (_, i) => i);

    return (

        <div className="CWMGameBoardScreen">
            <div className = "CWMBar">
                {array.map((index) => (

                    index < 5 || index > 17 ? (

                        currentPosition == index ? (

                            <div key={index} className="CWMBarNotAccurate">
                                <img className="CWMBarCurrent" key={index} src={positionIndicator}/>
                            </div>

                        ) : (

                            <div key={index} className="CWMBarNotAccurate"></div>

                        )

                    ) : index < 8 || index > 14 ? (

                        currentPosition == index ? (

                            <div key={index} className="CWMBarInRange">
                                <img className="CWMBarCurrent"  key={index} src={positionIndicator}/>
                            </div>

                        ) : (

                            <div key={index} className="CWMBarInRange"></div>

                        )

                    ) : index < 11 || index > 11 ? (

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