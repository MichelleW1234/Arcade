import {useNavigate, Link } from 'react-router-dom';
import {useRef} from 'react';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

import { usePlayer} from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePrize } from '../../Providers/PrizeProvider.jsx';
import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

import Bear from '../../Images/ArcadePrizeImages/Bear.svg';
import Bee from '../../Images/ArcadePrizeImages/Bee.svg';
import Heart from '../../Images/ArcadePrizeImages/Valentine.svg';
import GameBoy from '../../Images/ArcadePrizeImages/GameBoy.svg';
import Robot from '../../Images/ArcadePrizeImages/Robot.svg';
import Alien from '../../Images/ArcadePrizeImages/Alien.svg';
import Spider from '../../Images/ArcadePrizeImages/Spider.svg';
import Whale from "../../Images/ArcadePrizeImages/Whale.svg";
import Carrot from "../../Images/ArcadePrizeImages/Carrot.svg";
import Hippo from "../../Images/ArcadePrizeImages/Hippo.svg";
import Cow from "../../Images/ArcadePrizeImages/Cow.svg";

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

function NavBar ({setShowInventory}){

    const { ActiveGame, setActiveGame } = useActiveGame(); 
    const { Player, setPlayer } = usePlayer(); 
    const { Prize, setPrize } = usePrize();

    const navigate = useNavigate();
    useKeyboardShortcut("1", () => {
        resetPoints();
        navigate("/arcadeStart");
    });

    useKeyboardShortcut("2", () => {
        playSound(24);
        navigate("/prizeRoom");
    });

    useKeyboardShortcut("4", () => {
        goToClawArcade();
        navigate("/CWMstart");
    });

    const viewPrizeInventoryButtonRef = useRef(null);
    useKeyboardShortcut("3", () => {
       viewPrizeInventoryButtonRef.current?.click();
    });


    
    const displayInventory = () => {
    
        playSound(25);
        setShowInventory(prevState => !prevState);

    }

    const resetPoints = () => {

        playSound(24);
        setPlayer([0]);
        setActiveGame(retrieveActiveGame(1));
        setPrize([["Bear", 80, Bear], ["BumbleBee", 50, Bee], ["Valentine", 20, Heart], 
                    ["GameBoy", 100, GameBoy], ["Robot", 30, Robot], ["Alien", 20, Alien], 
                    ["Spider", 80, Spider], ["Carrot", 40, Carrot], ["Whale", 70, Whale],
                    ["Black Cat", 0, BlackCat], ["Orange Cat", 0, OrangeCat], ["Siamese Cat", 0, SiameseCat],
                    ["British Shorthair Cat", 0, BritishShorthairCat], ["Football", 0, Football], ["Ping Pong Paddle", 0, Paddle], 
                    ["Soccerball", 0, Soccerball], ["Basketball", 0, Basketball], ["Andromeda Galaxy", 0, Andromeda], ["Sun", 0, Sun], 
                    ["Saturn", 0, Saturn], ["Earth", 0, Earth], ["Cow", 40, Cow], ["Hippo", 40, Hippo]]);

    }

    const goToClawArcade = () => {

        playSound(1);
        const currGameInfo = retrieveActiveGame(-1);
        setActiveGame(currGameInfo);

    }

    return (

        <div className = "navbarContainer">

            <ul className = "navbarMenu">
                
                <li>
                    <Link to="/arcadeStart" className = "navBarButton" onClick ={() => resetPoints()}>
                        Leave Arcade
                    </Link>
                </li>

                <li>
                    <Link to="/prizeRoom" className = "navBarButton" onClick ={() =>  playSound(24)}>
                        Visit Prize Room
                    </Link>
                </li>

                <li>
                    <div ref={viewPrizeInventoryButtonRef} className = "navBarButton" onClick ={() => displayInventory()}>
                        View Prize Inventory
                    </div>
                </li>

                <li>
                    <Link to="/CWMstart" className = "navBarButton" onClick ={() => goToClawArcade()}>
                        Go to Claw Arcade
                    </Link>
                </li>

            </ul>

        </div>

    );

}


export default NavBar;