import { Link } from 'react-router-dom';

import "./PrizeRoomScreen.css";

function PrizeRoomScreen() {

    const prizeArray = [["Bear", 100], ["Bear", 100], ["Bear", 100]];

    return (

        <div className = "screenLayout">

            <div className = "instructionsSign"> Your balance: (complete later)</div>

            <div className = "prizeRoomContainer"> 

                <div className = "prizeRoomInnerContainer">

                    {prizeArray.map((item, index) => (

                        <div className = "prizeWindowContainer">
                            <h2 className = "prizeWindow">
                                Item: {item[0]} <br/>
                                Price: {item[1]} <br/>
                                (insert image here)
                            </h2>

                            <button className = "prizeButton"> Buy </button>
                        </div>

                    ))}

                </div>
                
            </div>
            
            <Link to="/selection" className = "generalbutton" onClick ={() => resetPoints()}>
                Leave Prize Room
            </Link>

        </div>

    )

}
  
    export default PrizeRoomScreen