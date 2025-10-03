import {useNavigate, Link } from 'react-router-dom';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

import { usePlayer} from '../../Providers/PlayerProvider.jsx';
import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePrize } from '../../Providers/PrizeProvider.jsx';
import { useAchievements} from '../../Providers/AchievementsProvider.jsx';
import { useTermination } from '../../Providers/TerminationProvider.jsx';

import {playSound, retrieveActiveGame} from "../../Helpers/helpers.js";

import bear from '../../Images/ArcadePrizeImages/Bear.svg';
import bee from '../../Images/ArcadePrizeImages/Bee.svg';
import heart from '../../Images/ArcadePrizeImages/Valentine.svg';
import gameBoy from '../../Images/ArcadePrizeImages/GameBoy.svg';
import robot from '../../Images/ArcadePrizeImages/Robot.svg';
import alien from '../../Images/ArcadePrizeImages/Alien.svg';
import spider from '../../Images/ArcadePrizeImages/Spider.svg';
import whale from "../../Images/ArcadePrizeImages/Whale.svg";
import carrot from "../../Images/ArcadePrizeImages/Carrot.svg";
import hippo from "../../Images/ArcadePrizeImages/Hippo.svg";
import cow from "../../Images/ArcadePrizeImages/Cow.svg";

import blackCat from "../../Images/ArcadePrizeImages/BlackCat.svg";
import orangeCat from "../../Images/ArcadePrizeImages/OrangeCat.svg";
import siameseCat from "../../Images/ArcadePrizeImages/SiameseCat.svg";
import britishShorthairCat from "../../Images/ArcadePrizeImages/BritishShorthairCat.svg";

import basketball from "../../Images/ArcadePrizeImages/Basketball.svg";
import soccerball from "../../Images/ArcadePrizeImages/Soccerball.svg";
import paddle from "../../Images/ArcadePrizeImages/Paddle.svg";
import football from "../../Images/ArcadePrizeImages/Football.svg";

import earth from "../../Images/ArcadePrizeImages/Earth.svg";
import sun from "../../Images/ArcadePrizeImages/Sun.svg";
import saturn from "../../Images/ArcadePrizeImages/Saturn.svg";
import andromeda from "../../Images/ArcadePrizeImages/Andromeda.svg";

import rps from '../../Images/ArcadeAchievementBadges/RPS.svg';
import ttt from '../../Images/ArcadeAchievementBadges/TTT.svg';
import snk from '../../Images/ArcadeAchievementBadges/SNK.svg';
import spi from '../../Images/ArcadeAchievementBadges/SPI.svg';
import orb from '../../Images/ArcadeAchievementBadges/ORB.svg';
import cbl from '../../Images/ArcadeAchievementBadges/CBL.svg';
import bfr from '../../Images/ArcadeAchievementBadges/BFR.svg';
import smz from '../../Images/ArcadeAchievementBadges/SMZ.svg';
import chc from '../../Images/ArcadeAchievementBadges/CHC.svg';
import cwmcat from '../../Images/ArcadeAchievementBadges/CWMCat.svg';
import cwmsports from '../../Images/ArcadeAchievementBadges/CWMSports.svg';
import cwmspace from '../../Images/ArcadeAchievementBadges/CWMSpace.svg';

function NavBar ({showInventory, setShowInventory, showAchievements, setShowAchievements}){

    const { setActiveGame } = useActiveGame(); 
    const { setPlayer } = usePlayer(); 
    const { setPrize } = usePrize();
    const { setAchievements } = useAchievements();
    const { setTermination } = useTermination();

    const navigate = useNavigate();
    useKeyboardShortcut("1", () => {
        if (showInventory === false && showAchievements === false){
            resetPoints();
            navigate("/arcadeStart");
        }
    },
        ".LeaveArcade"
    );

    useKeyboardShortcut("2", () => {
        if (showInventory === false && showAchievements === false){
            playSound(24);
            navigate("/prizeRoom");
        }
    },
        ".VisitPrizeRoom"
    );

    useKeyboardShortcut("3", () => {
        if (showAchievements === false){
            displayInventory();
        }
    },
        ".ViewPrizeInventory"
    );

    useKeyboardShortcut("4", () => {
        if (showInventory === false && showAchievements === false){
            goToClawArcade();
            navigate("/CWMstart");
        }
    },
        ".GotoClawArcade"
    );

    useKeyboardShortcut("5", () => {
        if (showInventory === false){
            displayAchievements();
        }
    },
        ".ViewAchievements"
    );

    
    const displayInventory = () => {
    
        playSound(25);
        setShowInventory(prev => !prev);

    }

    const resetPoints = () => {

        playSound(24);
        setPlayer([0]);
        setActiveGame(retrieveActiveGame(0));
        setPrize([["Bear", 100, bear], ["BumbleBee", 80, bee], ["Valentine", 50, heart],
                ["GameBoy", 80, gameBoy], ["Robot", 60, robot], ["Alien", 40, alien], 
                ["Spider", 80, spider], ["Carrot", 40, carrot], ["Whale", 60, whale],
                ["Black Cat", 0, blackCat], ["Orange Cat", 0, orangeCat], ["Siamese Cat", 0, siameseCat],
                ["British Shorthair Cat", 0, britishShorthairCat], ["Football", 0, football], ["Ping Pong Paddle", 0, paddle], 
                ["Soccerball", 0, soccerball], ["Basketball", 0, basketball], ["Andromeda Galaxy", 0, andromeda], ["Sun", 0, sun], 
                ["Saturn", 0, saturn], ["Earth", 0, earth], ["Cow", 50, cow], ["Hippo", 30, hippo]]);
        setAchievements([[false], 
                        [0, 5, "Won 5 games of Rock-Paper-Scissors", rps, 0], 
                        [0, 10, "Won 10 games of Tic-Tac-Toe", ttt, 0], 
                        [0, 1, "Ate 50 Apples in one game of Snake", snk, 0], 
                        [0, 1, "Completed all 4 missions in one game of Space Invasion", spi, 0], 
                        [0, 5, "Won 5 games of Orbit", orb, 0], 
                        [0, 1, "Blasted 15 colors in one game of Color Blast", cbl, 0], 
                        [0, 1, "Popped 15 balloons in one game of Balloon Frenzy", bfr, 0], 
                        [0, 1, "Traveled 500 meters in one game of Sky Maze", smz, 0],
                        [0, 1, "Traveled 50 steps in one game of Chicken Crossing", chc, 0], 
                        [[], 4, "Won all 4 types of prizes from the Cat Claw Machine", cwmcat, 0], 
                        [[], 4, "Won all 4 types of prizes from the Sports Claw Machine", cwmsports, 0], 
                        [[], 4, "Won all 4 types of prizes from the Space Claw Machine", cwmspace, 0]]);
        setTermination([true]);

    }

    const goToClawArcade = () => {

        playSound(1);
        const currGameInfo = retrieveActiveGame(-1);
        setActiveGame(currGameInfo);

    }

    const displayAchievements = () => {
    
        playSound(25);
        setShowAchievements(prev => !prev);

    }


    return (

        <div className = "navbarContainer">

            <ul className = "navbarMenu">
                
                <li>
                    <Link to="/arcadeStart" className = "navBarButton LeaveArcade" onClick ={() => resetPoints()}>
                        <div className="buttonNameContainer">  Leave Arcade <br/> <span className = "buttonKeyDescription"> [1] </span></div>
                    </Link>
                </li>

                <li>
                    <Link to="/prizeRoom" className = "navBarButton VisitPrizeRoom" onClick ={() =>  playSound(24)}>
                        <div className="buttonNameContainer"> Visit Prize Room <br/> <span className = "buttonKeyDescription"> [2] </span></div>
                    </Link>
                </li>

                <li>
                    <div className = "navBarButton ViewPrizeInventory" onClick ={() => displayInventory()}>
                        <div className="buttonNameContainer"> View Prize Inventory <br/> <span className = "buttonKeyDescription"> [3] </span></div>
                    </div>
                </li>

                <li>
                    <Link to="/CWMstart" className = "navBarButton GotoClawArcade" onClick ={() => goToClawArcade()}>
                        <div className="buttonNameContainer"> Go to Claw Arcade <br/> <span className = "buttonKeyDescription"> [4] </span></div>
                    </Link>
                </li>

                <li>
                    <div className = "navBarButton ViewAchievements" onClick ={() => displayAchievements()}>
                        <div className="buttonNameContainer"> View Achievements <br/> <span className = "buttonKeyDescription"> [5] </span></div>
                    </div>
                </li>

            </ul>

        </div>

    );

}


export default NavBar;