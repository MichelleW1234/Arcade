import Bear from '../../Images/image 1.svg';
import Bee from '../../Images/image 2.svg';
import Heart from '../../Images/image 3.svg';
import GameBoy from '../../Images/image 4.svg';
import Robot from '../../Images/image 5.svg';
import Alien from '../../Images/image 6.svg';
import Spider from '../../Images/image 7.svg';
import Whale from "../../Images/image 19.svg";
import Carrot from "../../Images/image 20.svg";


import "./PrizeInventory.css";

function PrizeInventory ({Prize}){

    const fullInventoryList = [["Bear", Bear], ["BumbleBee", Bee], ["Valentine", Heart], 
        ["GameBoy", GameBoy], ["Robot", Robot], ["Alien", Alien], ["Spider", Spider], 
        ["Carrot", Carrot], ["Whale", Whale]];

    return (

        <div className = "inventoryfloatingFlag">

            <div className = "inventoryContainer">

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