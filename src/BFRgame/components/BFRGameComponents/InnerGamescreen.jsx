import React, { useState, useEffect, useRef} from "react";
import "./InnerGamescreen.css";

function InnerGamescreen ({positions, laserBlast}){

    const gameArray = Array.from({ length: 10 }, () => Array(17).fill(0));
    
    return (

        <div className = "BFRGameBoardScreen">
            {gameArray.map((row, rowIndex) => (
                row.map((cell, colIndex) => {

                    const birdHere = positions.some(
                        ([r, c]) => r === colIndex && c === 0
                    ) &&
                    rowIndex === 2;

                    const balloonHere = positions.some(
                        ([r, c]) => r === colIndex && c === 1
                    ) &&
                    rowIndex === 2;

                    const laserShot = laserBlast === true && colIndex === 8;

                    return (

                        laserShot ? (
                            
                            <img key = {rowIndex + "," + colIndex} className="BFRLaserColumn"/>
                        
                        ) : balloonHere ? (

                            <img key = {rowIndex + "," + colIndex} className="BFRBalloon"/>

                        ) : birdHere ? (

                            <img key = {rowIndex + "," + colIndex} className="BFRBird"/>

                        ) : colIndex == 8 ? (

                            <div key = {rowIndex + "," + colIndex} className="BFRLaserField"/>

                        ) : (

                            <div key = {rowIndex + "," + colIndex} className="BFRGameBoardEmptySpace"></div>

                        )
    

                    )

                })
            ))}

        </div>

    );

}


export default InnerGamescreen;