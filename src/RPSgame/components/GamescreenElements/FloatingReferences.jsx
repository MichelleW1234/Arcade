import React from "react";
import { useReference } from '../../ReferenceProvider.jsx';
import { useLevel } from '../../LevelProvider.jsx';
import "./FloatingReferences.css";

function FloatingReferences (){

    const {reference} = useReference();
    const {level} = useLevel();
    

    return (
        <div className = "FloatingReferencesContainer">
            <div className = "FloatingReferencesFlag">
                <h1 className = "ReferenceSign">Level {level} <span className="ReferenceSignGlitch">References:</span></h1>
                <div className = "references">
                    {reference.map((item, index) => (
                            <p key={index}> &gt; {item} </p> 
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FloatingReferences;