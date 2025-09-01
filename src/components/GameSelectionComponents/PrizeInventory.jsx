import { usePrize} from '../../Providers/PrizeProvider.jsx';

import { playSound } from '../../Helpers/helpers.js';

import "./PrizeInventory.css";

function PrizeInventory ({setShowInventory}){

    const { Prize, setPrize } = usePrize();

    const fullInventoryList = [["Bear"], ["BumbleBee"], ["Valentine"], 
        ["GameBoy"], ["Robot"], ["Alien"], ["Spider"], 
        ["Carrot"], ["Whale"], ["Black Cat"], ["Orange Cat"], 
        ["Siamese Cat"], ["British Shorthair Cat"], ["Football"], 
        ["Ping Pong Paddle"], ["Soccerball"], ["Basketball"], ["Andromeda Galaxy"], 
        ["Sun"], ["Saturn"], ["Earth"], ["Cow"], ["Hippo"]];

    const closeInventory = () => {

        setShowInventory(false);
        playSound(25);

    }

    return (

        <div className = "navBarFloatingFlag">

            <div className = "inventoryOuterContainer">

                <div className = "inventoryInnerContainer">

                    {Prize.map((item, index) => (

                        item[0] == "X" ?

                            item[1] < 0 ? (

                                <div key={index} className = "inventoryWindow">
                                    <h1> {fullInventoryList[index][0]}</h1>
                                    <img className = "inventoryImage" src = {item[2]}/>
                                    <h1>x{Math.abs(item[1])}</h1>
                                </div>

                            ) : (

                                <div key={index} className = "inventoryWindow">

                                    <h1> {fullInventoryList[index][0]}</h1>
                                    <br/>
                                    <img className = "inventoryImage" src = {item[2]}/>

                                </div> 

                            )

                        :

                            null

                    ))}

                </div>

                <button className = "inventoryButton" onClick = {() => closeInventory()}> Close </button>

            </div>

        </div>


    );

}

export default PrizeInventory;