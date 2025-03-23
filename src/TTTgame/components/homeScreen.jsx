import React from 'react';

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';

import {retrieveActiveGame} from '../../Helpers/helpers.js';

function homeScreen() {

  const { ActiveGame, setActiveGame} = useActiveGame();

  return (

    <div className = "screenLayout">

        <h1 className = "headerwords"> Welcome to Tic-Tac-Toe.</h1>

        <div className = "generalbuttonContainer">
          <a href="/selection" className = "generalbutton" onClick={() => setActiveGame(retrieveActiveGame(1))}> 
            Go Back
          </a>
          <a href = "/TTTinstructions" className = "generalbutton">
            Instructions
          </a>
        </div>
        
    </div>

  )
}

export default homeScreen