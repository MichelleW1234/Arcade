import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';

import {retrieveActiveGame} from '../../Helpers/helpers.js';

function instructionsScreen() {

  const { ActiveGame, setActiveGame} = useActiveGame();

  return (

    <div className = "screenLayout">

      <h1 className = "headerwords"> Instructions: </h1>

      <p className = "largefont">   
        &gt; Your opponent is this computer. <br/>
        &gt; The board is a standard 3x3 with 9 total cells. <br/>
        &gt; You will determine who makes the first move by flipping a coin. <br/>
        &gt; NOTE: Beyond this point, you will lose points if you quit in the middle of the game. <br/>
      </p>

      <div className = "generalbuttonContainer">
        <a href="/selection" className = "generalbutton" onClick={() => setActiveGame(retrieveActiveGame(1))}> 
          Go Back
        </a>
        <a href = "/TTTcoinFlip" className = "generalbutton">
          Continue
        </a>
      </div>
      
    </div>

  )

}
  
  export default instructionsScreen