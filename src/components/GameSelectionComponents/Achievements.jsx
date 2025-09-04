import { useAchievements} from '../../Providers/AchievementsProvider.jsx';

import { playSound } from '../../Helpers/helpers.js';

import Lock from "../../Images/image 34.svg";

import "./Achievements.css";

function Achievements ({setShowAchievements}){

    const {Achievements } = useAchievements();

    const closeAchievements = () => {

        setShowAchievements(false);
        playSound(25);

    }

    return (

        <div className = "navBarFloatingFlag">
        
            <div className = "AchievementsOuterContainer">

                <div className = "AchievementsInnerContainer">

                    {Achievements.map((item, index) => (

                        index === 0 ? (
 
                            null 
                            
                        ) : (

                            <div key={index} className = "AchievementsWindow">

                                <h1 className = "AchievementsFont"> {item[2]}</h1>
                                <br/>

                                {item[4] > 0 ? ( 

                                    <>
                                        <img className = "AchievementsBadgeUnlocked" src = {item[3]}/>
                                        <h1 className = "AchievementsFont"> x{item[4]}</h1>
                                    </>

                                ):(

                                    <>
                                        <img className = "AchievementsBadgeLocked" src = {Lock}/>
                                        <h1 className = "AchievementsFont"> Locked </h1>
                                    </>

                                )}

                            </div>

                        )

                    ))}

                </div>

                <button className = "AchievementsButton" onClick = {() => closeAchievements()}> Close </button>

            </div>

        </div>


    );

}

export default Achievements;