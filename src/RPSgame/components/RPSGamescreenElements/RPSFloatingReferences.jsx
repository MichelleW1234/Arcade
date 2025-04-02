import { useRPSUser} from '../../Providers/RPSUserProvider.jsx';

import "./RPSFloatingReferences.css";

function FloatingReferences (){

    const {RPSUser} = useRPSUser();
    const references = RPSUser[2];

    return (
        <div className = "RPSFloatingReferencesContainer">
            <div className = "RPSFloatingReferencesFlag">
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