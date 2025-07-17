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


import "./PrizeInventory.css";

function PrizeInventory (){

    const { Prize, setPrize } = usePrize();

    const fullInventoryList = [["Bear", Bear], ["BumbleBee", Bee], ["Valentine", Heart], 
        ["GameBoy", GameBoy], ["Robot", Robot], ["Alien", Alien], ["Spider", Spider], 
        ["Carrot", Carrot], ["Whale", Whale], ["Black Cat", BlackCat], ["Orange Cat", OrangeCat], 
        ["Siamese Cat", SiameseCat], ["British Shorthair Cat", BritishShorthairCat]];

    return (

        <div className = "inventoryfloatingFlag">

            <div className = "inventoryOuterContainer">

                <div className = "inventoryInnerContainer">

                    {Prize.map((item, index) => (

                        item[0] == "X" ?

                            item[1] < 0 ? (

                                Array.from({ length: Math.abs(item[1])}).map((_, repeatIndex) => (

                                    <div key={`${index},${repeatIndex}`} className = "inventoryWindow">

                                        <h1> {fullInventoryList[index][0]}</h1>
                                        <br/>
                                        <img className = "inventoryImage" src = {fullInventoryList[index][1]}/>

                                    </div> 

                                ))


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

            </div>

        </div>


    );

}

export default PrizeInventory;