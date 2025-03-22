import React from "react";

import { useRPSUser} from '../../Providers/RPSUserProvider.jsx';

import "./RPSFloatingReferences.css";

function FloatingReferences (){

    const {RPSUser} = useRPSUser();
    const level = RPSUser[0];
    const references = RPSUser[2];

    

    return (
        <div className = "RPSFloatingReferencesContainer">
            <div className = "RPSFloatingReferencesFlag">
                <h1 className = "RPSReferenceSign">Level {level} <span className="RPSReferenceSignGlitch">References:</span></h1>
                <div className = "RPSReferences">
                    {references.map((item, index) => (
                            <p key={index}> &gt; {item} </p> 
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FloatingReferences;