import React, { useEffect, useState} from "react";
import "./InnerGameScreen.css";

function InnerGameScreen ({roundNumber}){

    const topRow = 1;
    const rightCol = 18;
    const bottomRow = 13;
    const leftCol= 1;

    const circleTop = 
        Array.from({ length: 18 }, (_, i) => [topRow, i + 1]);
    const circleRight = 
        Array.from({ length: 13 }, (_, i) => [i + 1, rightCol]);
    const circleBottom = 
        Array.from({ length: 18 }, (_, i) => [bottomRow, i + 1]);
    const circleLeft = 
        Array.from({ length: 13 }, (_, i) => [i + 1, leftCol]);

    const circle = [
        ...circleTop,
        ...circleRight,
        ...circleBottom,
        ...circleLeft,
    ];

    /*20 × 30 matrix*/
    const [gameArray, setGameArray] = useState(() => 
        Array.from({ length: 15 }, () => Array(20).fill(0))
    );


    return (

        <div className = "ORBGameBoard">
            {gameArray.map((row, rowIndex) => (
                row.map((cell, colIndex) => {

                    const circlePart = circle.some(
                        ([r, c]) => r === rowIndex && c === colIndex
                    );

                    return (

                        circlePart ? (

                            <div key = {rowIndex + "," + colIndex} className="ORBGameBoardCircle"></div>

                        ) : (

                            <div key = {rowIndex + "," + colIndex} className="ORBGameBoardEmptySpace"></div>

                        )

                    )

                })
            ))}

        </div>

    );

}


export default InnerGameScreen;