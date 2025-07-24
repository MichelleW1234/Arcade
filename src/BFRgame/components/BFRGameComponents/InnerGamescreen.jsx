import React, { useState, useEffect, useRef} from "react";
import "./InnerGamescreen.css";

function InnerGamescreen ({positions, laserBlast}){

    const gameArray = Array.from({ length: 15 }, () => Array(20).fill(0));
    
    return (

        <div className = "ORBGameBoardScreen">
            {gameArray.map((row, rowIndex) => (
                row.map((cell, colIndex) => {

                    const balloonHere = positions.some(
                        ([r, c]) => r === colIndex && c === 0
                    ) &&
                    rowIndex === 3;

                    const bombHere = positions.some(
                        ([r, c]) => r === colIndex && c === 1
                    ) &&
                    rowIndex === 3;

                    const laserHere = laserBlast === true && colIndex === 10;

                    return (

                        laserHere ? (
                            
                            <div key = {rowIndex + "," + colIndex} className="ORBGameBoardWinningCircle"></div>
                            
                        ) : balloonHere ? (

                            <div key = {rowIndex + "," + colIndex} className="ORBGameBoardCurrentSlot"></div>

                        ) : bombHere ? (

                            <div key = {rowIndex + "," + colIndex} className="ORBGameBoardWinningCircle"></div>

                        ) : (

                            <div key = {rowIndex + "," + colIndex} className="ORBGameBoardEmptySpace"></div>

                        )
    

                    )

                })
            ))}

        </div>

    );

}


export default InnerGamescreen;