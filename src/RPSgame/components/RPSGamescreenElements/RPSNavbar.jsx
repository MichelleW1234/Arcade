import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { useRPSUser} from '../../Providers/RPSUserProvider.jsx';

import {resetLevel} from "../../Helpers/RPShelpers.js";
import {retrieveActiveGame} from "../../../Helpers/helpers.js";

import "./RPSNavbar.css";

function Navbar ({setShowReferences}){

    const { ActiveGame, setActiveGame} = useActiveGame();
    const {RPSUser, setRPSUser} = useRPSUser();

    const displayReferences = () => {

        setShowReferences(prevState => !prevState);

    }

    const reset = () => {

        resetLevel(setRPSUser);
        setActiveGame(retrieveActiveGame(1));

    }


    return (
        <div>
            <div className = "navbarContainer">
                <ul className = "navbarMenu">
                    <li>
                        <a href="/selection">
                            <button className = "navBarButton" onClick ={() => reset()}> Quit Game </button>
                        </a>
                    </li>

                    <li>
                        <a href="/RPSlevels">
                            <button className = "navBarButton" onClick ={() => resetLevel(setRPSUser)}> Change Level </button>
                        </a>
                    </li>

                    <li>
                        <button className = "RPSreadMoveReferencesButton" onClick = {displayReferences}> Move References </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;