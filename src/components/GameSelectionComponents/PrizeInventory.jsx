import Bear from '../../Images/ArcadePrizeImages/Bear.svg';
import Bee from '../../Images/ArcadePrizeImages/Bee.svg';
import Heart from '../../Images/ArcadePrizeImages/Valentine.svg';
import GameBoy from '../../Images/ArcadePrizeImages/GameBoy.svg';
import Robot from '../../Images/ArcadePrizeImages/Robot.svg';
import Alien from '../../Images/ArcadePrizeImages/Alien.svg';
import Spider from '../../Images/ArcadePrizeImages/Spider.svg';
import Whale from "../../Images/ArcadePrizeImages/Whale.svg";
import Carrot from "../../Images/ArcadePrizeImages/Carrot.svg";


import "./PrizeInventory.css";

function PrizeInventory ({Prize}){

    const fullInventoryList = [["Bear", Bear], ["BumbleBee", Bee], ["Valentine", Heart], 
        ["GameBoy", GameBoy], ["Robot", Robot], ["Alien", Alien], ["Spider", Spider], 
        ["Carrot", Carrot], ["Whale", Whale]];

    return (

        <div className = "inventoryfloatingFlag">

            <div className = "inventoryOuterContainer">

                <div className = "inventoryInnerContainer">

                    {Prize.map((item, index) => (

                        item[0] == "X" ?

                            <div key={index} className = "inventoryWindow">

                                <h1> {fullInventoryList[index][0]}</h1>
                                <br/>
                                <img className = "inventoryImage" src = {fullInventoryList[index][1]}/>

                            </div> 

                        :

                            null

                    ))}

                </div>

            </div>

        </div>


    );

}

export default PrizeInventory;