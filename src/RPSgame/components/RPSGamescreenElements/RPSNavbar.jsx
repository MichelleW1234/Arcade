import { useLevel } from '../../Providers/RPSLevelProvider.jsx';
import { useInput } from '../../Providers/RPSInputProvider.jsx';
import { useReference } from '../../Providers/RPSReferenceProvider.jsx';
import {resetLevel} from "../../Helpers/RPShelpers.js";
import "./RPSNavbar.css";

function Navbar ({setShowReferences}){

    const { level, setLevel } = useLevel();
    const { input, setInput } = useInput();
    const { reference, setReference } = useReference();

    const displayReferences = () => {

        setShowReferences(prevState => !prevState);

    }

    return (
        <div>
            <div className = "navbarContainer">
                <ul className = "navbarMenu">
                    <li>
                        <a href="/arcadeStart">
                            <button className = "navBarButton" onClick ={() => resetLevel(setLevel, setInput, setReference)}> Quit Game </button>
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