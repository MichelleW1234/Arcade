import React, { useState, useEffect, useRef} from "react";
import "./InnerGamescreen.css";
import Bird from "../../../Images/image 33.svg";
import Wall from "../../../Images/image 32.svg";

function InnerGamescreen ({wallPositions, birdPosition, startButtonClicked}){

    const gameArray = Array.from({ length: 10 }, () => Array(17).fill(0));
    
    return (
         
        <div className = "SMZGameBoardScreen">

            {!startButtonClicked && <div className = "SMZStartFlag"> Press any of the controls to start</div>}

            {gameArray.map((row, rowIndex) => (
                row.map((cell, colIndex) => {

                    const birdHere = birdPosition[0] === rowIndex && birdPosition[1] === colIndex;

                    const wallHere = wallPositions
                        .flat()
                        .some(([r, c]) => r === rowIndex && c === colIndex);


                    return (

                        wallHere ? (

                            <img src = {Wall} key = {rowIndex + "," + colIndex} className="SMZGameBoardWall"/>

                        ) : birdHere ? (

                            <img src = {Bird} key = {rowIndex + "," + colIndex} className="SMZGameBoardEmptySpace"/>

                        ) : (
                            
                            <div key = {rowIndex + "," + colIndex} className="SMZGameBoardEmptySpace"> </div>

                        )

                    )

                })
            ))}

        </div>

    );

}


export default InnerGamescreen;