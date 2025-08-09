import { useNavigate, Link } from 'react-router-dom';
import {useRef} from 'react';
import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut";

import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { usePlayer } from '../../../Providers/PlayerProvider.jsx';
import { useRPSUser} from '../../Providers/RPSUserProvider.jsx';

import {resetLevel, quitGame} from "../../Helpers/helpers.js";
import {playSound} from "../../../Helpers/helpers.js";

function Navbar ({setShowReferences}){

    const { ActiveGame, setActiveGame} = useActiveGame();
    const {Player, setPlayer} = usePlayer();
    const {RPSUser, setRPSUser} = useRPSUser();


    const navigate = useNavigate();
    useKeyboardShortcut("1", () => {
        quitGame(setRPSUser, ActiveGame, setActiveGame, setPlayer, Player);
        navigate("/selection");
    });

    useKeyboardShortcut("2", () => {
        resetGame();
        navigate("/RPSlevels");
    });

    const moveReferencesButtonRef = useRef(null);
    useKeyboardShortcut("3", () => {
        moveReferencesButtonRef.current?.click();
    });


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
                        <Link to= "/selection" className = "navBarButton" onClick ={() => quitGame(setRPSUser, ActiveGame, setActiveGame, setPlayer, Player)}>
                            Quit Game
                        </Link>
                    </li>

                    <li>
                        <Link to="/RPSlevels" className = "navBarButton" onClick ={() => resetGame()}>
                            Change Variation
                        </Link>
                    </li>

                    <li>
                        <button ref = {moveReferencesButtonRef} className = "navBarButton" onClick = {() => displayReferences()}> Move References </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;