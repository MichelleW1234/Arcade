import { useAchievements} from '../../Providers/AchievementsProvider.jsx';

import { playSound } from '../../Helpers/helpers.js';

import "./Achievements.css";

function Achievements ({setShowAchievements}){

    const {Achievements, setAchievements } = useAchievements();

    const closeAchievements = () => {

        setShowAchievements(false);
        playSound(25);

    }

    return (

        <div className = "navBarFloatingFlag">
        
            <div className = "AchievementsOuterContainer">

                <div className = "AchievementsInnerContainer">

                    {Achievements.map((item, index) => 

                        item[1] >= item[1] ? (

                            <div key={index} className = "AchievementsWindow">
                                <h1> {item[2]}</h1>
                                <img className = "AchievementsBadge" src = {item[3]}/>
                            </div>

                        ):(

                            null

                        )

                    )}

                </div>

                <button className = "AchievementsButton" onClick = {() => closeAchievements()}> Close </button>

            </div>

        </div>


    );

}

export default Achievements;