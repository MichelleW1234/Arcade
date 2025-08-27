import { useNavigate, Link } from 'react-router-dom';
import {useState} from 'react';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";
import { useExitPoints } from "../../hooks/useExitPoints";


import Turn from './TTTGameComponents/Turn.jsx';

import { useActiveGame } from '../../Providers/ActiveGameProvider.jsx';
import { usePlayer } from '../../Providers/PlayerProvider.jsx';
import { useTTTUser } from '../Providers/TTTUserProvider.jsx';

import {resetGame} from "../Helpers/helpers.js";
import {playSound, retrieveActiveGame, pointsDistribution} from "../../Helpers/helpers.js";

import "./Gamescreen.css";

function Gamescreen() {

  const { ActiveGame, setActiveGame} = useActiveGame();
  const { Player, setPlayer} = usePlayer();
  const { TTTUser, setTTTUser} = useTTTUser();

  const [error, setError] = useState("");
  const [availableMoves, setAvailableMoves] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [matrix, setMatrix] = useState([-1, -1, -1, -1, -1, -1,-1, -1, -1]);
  const [computerMoves, setComputerMoves] = useState([]);
  const [userMoves, setUserMoves] = useState([]);
  const [threeInARow, setThreeInARow] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(TTTUser[0]);


  const navigate = useNavigate();

  useKeyboardShortcut("Escape", () => {
    reset();
    navigate("/selection");
  },
    ".QuitGame"
  );

  useKeyboardShortcut("Enter", () => {
    if (TTTUser[1] != -1){
      pointsDistribution(ActiveGame, TTTUser[1], setPlayer, Player);
      navigate("/TTTsummary");
    }
  },
    ".ViewResults"
  );


  useExitPoints(() => {
    const adjustedPoints = [Player[0] - ActiveGame[1]];
    localStorage.setItem("Player", JSON.stringify(adjustedPoints));
    setPlayer(adjustedPoints);
  });

  
  const reset = () => {

    playSound(4);
    resetGame(setTTTUser);
    setPlayer([Player[0] - ActiveGame[1]]);
    setActiveGame(retrieveActiveGame(0));

  }

  return (

    <div>

      <Link to= "/selection" className = "generalbutton QuitGame" onClick={() => reset()}>
        <div className="buttonNameContainer"> Quit Game<br/> <span className = "buttonKeyDescription"> [Esc] </span></div>
      </Link>

      <div className = "gameScreenLayout">

        <div className = "TTTboard">

          {TTTUser[1] === -1 ? (

            <>

              {error === "" ? (
                                  
                <h1 className = "TTTturnBoard"> <span className='signGlitch'>Active Player: {currentTurn === 1 ? "  You" : "  Computer"} </span></h1>

              ) : (

                <h1 className = "TTTturnBoard"> {error} </h1>

              )}

              <Turn
                          
                setError = {setError}
                starter = {TTTUser[0]}
                matrix = {matrix}
                setMatrix = {setMatrix}
                availableMoves = {availableMoves}
                setAvailableMoves = {setAvailableMoves}
                computerMoves = {computerMoves}
                setComputerMoves = {setComputerMoves}
                userMoves = {userMoves}
                setUserMoves = {setUserMoves}
                setThreeInARow = {setThreeInARow}
                currentTurn = {currentTurn}
                setCurrentTurn = {setCurrentTurn}

              />

            </>

          ) : (
                        
            <>
  
              <h1 className = "TTTturnBoard"> <span className='signGlitch'>Game Over.</span></h1>

              <div className = "TTTfinished_chart_container">

                  {matrix.map((item, index) => (

                      matrix[index] === 1 ? (

                        threeInARow.includes(index) ? (

                          <div key = {index} className="TTTresulting_chart_win"> O </div>

                        ) : (

                          <div key = {index} className="TTTresulting_chart"> O </div>

                        )
                          
                      ) : matrix[index] === 0 ? (

                        threeInARow.includes(index) ? (

                          <div key = {index} className="TTTresulting_chart_win"> X </div>

                        ) : (

                          <div key = {index} className="TTTresulting_chart"> X </div>

                        )

                      ) : (

                        <div key = {index} className="TTTresulting_chart"> </div>

                      )

                  ))}

              </div>

              <Link to= "/TTTsummary" className = "TTTbutton ViewResults" onClick={() => pointsDistribution(ActiveGame, TTTUser[1], setPlayer, Player)}>
                <div className="buttonNameContainer"> View Results <br/> <span className = "buttonKeyDescription"> [Return] </span></div>
              </Link>

            </>

          )}  

        </div>

      </div>

    </div>
  )
}

export default Gamescreen;
