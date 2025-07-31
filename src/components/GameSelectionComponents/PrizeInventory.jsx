import { usePrize} from '../../Providers/PrizeProvider.jsx';

import Bear from '../../Images/ArcadePrizeImages/Bear.svg';
import Bee from '../../Images/ArcadePrizeImages/Bee.svg';
import Heart from '../../Images/ArcadePrizeImages/Valentine.svg';
import GameBoy from '../../Images/ArcadePrizeImages/GameBoy.svg';
import Robot from '../../Images/ArcadePrizeImages/Robot.svg';
import Alien from '../../Images/ArcadePrizeImages/Alien.svg';
import Spider from '../../Images/ArcadePrizeImages/Spider.svg';
import Whale from "../../Images/ArcadePrizeImages/Whale.svg";
import Carrot from "../../Images/ArcadePrizeImages/Carrot.svg";

import BlackCat from "../../Images/ArcadePrizeImages/BlackCat.svg";
import OrangeCat from "../../Images/ArcadePrizeImages/OrangeCat.svg";
import SiameseCat from "../../Images/ArcadePrizeImages/SiameseCat.svg";
import BritishShorthairCat from "../../Images/ArcadePrizeImages/BritishShorthairCat.svg";

import Basketball from "../../Images/ArcadePrizeImages/Basketball.svg";
import Soccerball from "../../Images/ArcadePrizeImages/Soccerball.svg";
import Paddle from "../../Images/ArcadePrizeImages/Paddle.svg";
import Football from "../../Images/ArcadePrizeImages/Football.svg";

import Earth from "../../Images/ArcadePrizeImages/Earth.svg";
import Sun from "../../Images/ArcadePrizeImages/Sun.svg";
import Saturn from "../../Images/ArcadePrizeImages/Saturn.svg";
import Andromeda from "../../Images/ArcadePrizeImages/Andromeda.svg";

import "./PrizeInventory.css";
import { playSound } from '../../Helpers/helpers.js';

function PrizeInventory ({setShowInventory}){

    const { Prize, setPrize } = usePrize();

    const fullInventoryList = [["Bear", Bear], ["BumbleBee", Bee], ["Valentine", Heart], 
        ["GameBoy", GameBoy], ["Robot", Robot], ["Alien", Alien], ["Spider", Spider], 
        ["Carrot", Carrot], ["Whale", Whale], ["Black Cat", BlackCat], ["Orange Cat", OrangeCat], 
        ["Siamese Cat", SiameseCat], ["British Shorthair Cat", BritishShorthairCat], ["Football", Football], 
        ["Ping Pong Paddle", Paddle], ["Soccerball", Soccerball], ["Basketball", Basketball], ["Andromeda Galaxy", Andromeda], 
        ["Sun", Sun], ["Saturn", Saturn], ["Earth", Earth]];

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
                                    <img className = "inventoryImage" src = {fullInventoryList[index][1]}/>
                                    <h1>x{Math.abs(item[1])}</h1>
                                </div>

                            ) : (

                                <div key={index} className = "inventoryWindow">

                                    <h1> {fullInventoryList[index][0]}</h1>
                                    <br/>
                                    <img className = "inventoryImage" src = {fullInventoryList[index][1]}/>

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