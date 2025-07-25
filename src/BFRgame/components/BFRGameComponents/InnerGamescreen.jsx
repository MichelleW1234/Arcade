import React, { useState, useEffect, useRef} from "react";
import "./InnerGamescreen.css";
import Balloon from "../../../Images/image 30.svg";
import Bird from "../../../Images/image 31.svg";
import Laser from "../../../Images/image 32.svg";

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
                            
                            <img src = {Laser} key = {rowIndex + "," + colIndex} className="BFRLaserField"/>
                        
                        ) : balloonHere ? (

                            colIndex == 8 ? (

                                <img src = {Balloon} key = {rowIndex + "," + colIndex} className="BFRLaserField"/>

                            ) : (

                                <img src = {Balloon} key = {rowIndex + "," + colIndex} className="BFRGameBoardEmptySpace"/>

                            )

                        ) : birdHere ? (

                            colIndex == 8 ? (

                                <img src = {Bird} key = {rowIndex + "," + colIndex} className="BFRLaserField"/>


                            ) : (

                                <img src = {Bird} key = {rowIndex + "," + colIndex} className="BFRGameBoardEmptySpace"/>

                            )
                               

                        ) : (
                            
                            colIndex == 8 ? (

                                <div key = {rowIndex + "," + colIndex} className="BFRLaserField"/>

                            ) : (

                                <div key = {rowIndex + "," + colIndex} className="BFRGameBoardEmptySpace"></div>
                        
                            )

                        )
    

                    )

                })
            ))}

        </div>

    );

}


export default InnerGamescreen;