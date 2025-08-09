import { useRPSUser} from '../../Providers/RPSUserProvider.jsx';

import {playSound} from "../../../Helpers/helpers.js";

import "./FloatingReferences.css";

function FloatingReferences ({setShowReferences}){

    const {RPSUser} = useRPSUser();
    const references = RPSUser[2];

    const closeReferences = () => {

        setShowReferences(false);
        playSound(25);

    }

    return (
        <div className = "navBarFloatingFlag">
            <div className = "RPSFloatingReferencesFlag">
                <div className = "RPSReferences">
                    {references.map((item, index) => (
                            <p key={index}> &gt; {item} </p> 
                    ))}
                </div>
                <button className='RPSreferencesButton' onClick = {() => closeReferences()}> Close </button>
            </div>
        </div>
    );
}

export default FloatingReferences;