import { Link } from 'react-router-dom';

import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { usePlayer } from '../../../Providers/PlayerProvider.jsx';
import { useRPSUser} from '../../Providers/RPSUserProvider.jsx';

import {resetLevel} from "../../Helpers/RPShelpers.js";
import {playSound, retrieveActiveGame, pointsDistribution} from "../../../Helpers/helpers.js";

function Navbar ({setShowReferences}){

    const { ActiveGame, setActiveGame} = useActiveGame();
    const {Player, setPlayer} = usePlayer();
    const {RPSUser, setRPSUser} = useRPSUser();

    const displayReferences = () => {

        playSound(3);
        setShowReferences(prevState => !prevState);

    }

    const resetGame = () => {

        playSound(4);
        resetLevel(setRPSUser);

    }

    const reset = () => {

        playSound(4);
        resetLevel(setRPSUser);
        pointsDistribution(ActiveGame, 0, setPlayer);
        setActiveGame(retrieveActiveGame(1));

    }


    return (
        <div>
            <div className = "navbarContainer">
                <ul className = "navbarMenu">
                    <li>
                        <Link to= "/selection" className = "navBarButton" onClick ={() => reset()}>
                            Quit Game
                        </Link>
                    </li>

                    <li>
                        <Link to="/RPSlevels" className = "navBarButton" onClick ={() => resetGame()}>
                            Change Variation
                        </Link>
                    </li>

                    <li>
                        <button className = "navBarButton" onClick = {() => displayReferences()}> Move References </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;