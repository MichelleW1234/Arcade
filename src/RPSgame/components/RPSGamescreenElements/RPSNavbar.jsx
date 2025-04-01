import { Link } from 'react-router-dom';

import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import { usePlayer } from '../../../Providers/PlayerProvider.jsx';
import { useRPSUser} from '../../Providers/RPSUserProvider.jsx';

import {resetLevel} from "../../Helpers/RPShelpers.js";
import {retrieveActiveGame, pointsDistribution} from "../../../Helpers/helpers.js";

function Navbar ({setShowReferences}){

    const { ActiveGame, setActiveGame} = useActiveGame();
    const {Player, setPlayer} = usePlayer();
    const {RPSUser, setRPSUser} = useRPSUser();

    const displayReferences = () => {

        setShowReferences(prevState => !prevState);

    }

    const reset = () => {

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
                        <Link to="/RPSlevels" className = "navBarButton" onClick ={() => resetLevel(setRPSUser)}>
                            Change Variation
                        </Link>
                    </li>

                    <li>
                        <button className = "navBarButton" onClick = {displayReferences}> Move References </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;