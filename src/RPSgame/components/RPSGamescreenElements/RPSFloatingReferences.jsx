import React from "react";
import { useReference } from '../../Providers/RPSReferenceProvider.jsx';
import { useLevel } from '../../Providers/RPSLevelProvider.jsx';
import "./RPSFloatingReferences.css";

function FloatingReferences (){

    const {reference} = useReference();
    const {level} = useLevel();
    

    return (
        <div className = "RPSFloatingReferencesContainer">
            <div className = "RPSFloatingReferencesFlag">
                <h1 className = "RPSReferenceSign">Level {level} <span className="RPSReferenceSignGlitch">References:</span></h1>
                <div className = "RPSReferences">
                    {reference.map((item, index) => (
                            <p key={index}> &gt; {item} </p> 
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FloatingReferences;