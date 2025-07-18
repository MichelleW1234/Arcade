import { Link } from 'react-router-dom';

import {playSound} from '../../Helpers/helpers.js';

function Instructionsscreen (){

    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign">
                Instructions: 
            </h1>
            <p className = "largefont">
                &gt; In this area, rather than earning points, you can win prizes, which get added to your inventory. <br/>
                &gt; There are multiple claw machines that contain different prize categories. <br/>
                &gt; All claw machines follow the same rules: <br/>
                &nbsp; &nbsp; &bull; Press the Grab button for the claw to grab. <br/>
                &nbsp; &nbsp; &bull; The bar at the top of the window will indicate to you when it is the best time to press Grab. <br/>
                &nbsp; &nbsp; &bull; The closer the green circle gets to red, the higher the likelihood that you'll win something. <br/>
                &gt; All claw machines cost 5 points to use. <br/>
            </p>

            <Link to="/CWMselection" className = "generalbuttonGlitch" onClick={() => playSound(1)}>
                Continue
            </Link>
            
        </div>

    );

}


export default Instructionsscreen;