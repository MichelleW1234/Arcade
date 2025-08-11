import { useNavigate, Link } from 'react-router-dom';
import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut";

import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { usePlayer } from '../../../Providers/PlayerProvider.jsx';
import { useRPSUser} from '../../Providers/RPSUserProvider.jsx';

import {resetLevel, quitGame} from "../../Helpers/helpers.js";
import {playSound} from "../../../Helpers/helpers.js";

function Navbar ({showReferences, setShowReferences, showFlag}){

    const { ActiveGame, setActiveGame} = useActiveGame();
    const {Player, setPlayer} = usePlayer();
    const {RPSUser, setRPSUser} = useRPSUser();


    const navigate = useNavigate();
    useKeyboardShortcut("1", () => {
        if (showReferences == false && showFlag == false){
            quitGame(setRPSUser, ActiveGame, setActiveGame, setPlayer, Player);
            navigate("/selection");
        }
    },
        ".QuitGame"
    );

    useKeyboardShortcut("2", () => {
        if (showReferences == false && showFlag == false){
            resetGame();
            navigate("/RPSlevels");
        }
    },
        ".ChangeVariation"
    );

    useKeyboardShortcut("3", () => {
        if (showFlag == false){
            displayReferences();
        }
    },
        ".MoveReferences"
    );


    const displayReferences = () => {

        playSound(25);
        setShowReferences(prevState => !prevState);

    }

    const resetGame = () => {

        playSound(4);
        resetLevel(setRPSUser);

    }

    return (
        <div>
            <div className = "navbarContainer">
                <ul className = "navbarMenu">
                    <li>
                        <Link to= "/selection" className = "navBarButton QuitGame" onClick ={() => quitGame(setRPSUser, ActiveGame, setActiveGame, setPlayer, Player)}>
                            Quit Game
                        </Link>
                    </li>

                    <li>
                        <Link to="/RPSlevels" className = "navBarButton ChangeVariation" onClick ={() => resetGame()}>
                            Change Variation
                        </Link>
                    </li>

                    <li>
                        <button className = "navBarButton MoveReferences" onClick = {() => displayReferences()}> Move References </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;