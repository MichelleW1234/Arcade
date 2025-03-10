import { useLevel } from '../../Providers/RPSLevelProvider.jsx';
import { useInput } from '../../Providers/RPSInputProvider.jsx';
import { useReference } from '../../Providers/RPSReferenceProvider.jsx';
import { useActiveGame } from '../../../Providers/ActiveGameProvider.jsx';
import {resetLevel} from "../../Helpers/RPShelpers.js";
import {retrieveActiveGame} from "../../../Helpers/helpers.js";
import "./RPSNavbar.css";

function Navbar ({setShowReferences}){

    const { level, setLevel } = useLevel();
    const { input, setInput } = useInput();
    const { reference, setReference } = useReference();
    const { ActiveGame, setActiveGame} = useActiveGame();

    const displayReferences = () => {

        setShowReferences(prevState => !prevState);

    }

    const reset = () => {

        resetLevel(setLevel, setInput, setReference);
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
                            <button className = "navBarButton" onClick ={() => resetLevel(setLevel, setInput, setReference)}> Change Level </button>
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