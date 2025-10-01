import "./InnerGamescreen.css";

function InnerGamescreen ({circle, currentSlot, winner}){

    const gameArray = Array.from({ length: 15 }, () => Array(20).fill(0));
    
    return (

        <div className = "ORBGameBoardScreen">
            {gameArray.map((row, rowIndex) => (
                row.map((_, colIndex) => {

                    const circlePart = circle.some(
                        ([r, c]) => r === rowIndex && c === colIndex
                    );

                    const slot = circle[currentSlot][0] === rowIndex && circle[currentSlot][1] === colIndex;

                    const winningCirclePart = winner[0] === rowIndex && winner[1] === colIndex;

                    return (

                        <div 
                            key = {rowIndex + "," + colIndex} 
                            className= {
                                        slot === true ? "ORBGameBoardCurrentSlot"
                                        : winningCirclePart === true ? "ORBGameBoardWinningCircle"
                                        : circlePart === true ? "ORBGameBoardCircle"
                                        : "ORBGameBoardEmptySpace"
                                        }
                        ></div>

                    )

                })
            ))}

        </div>

    );

}


export default InnerGamescreen;