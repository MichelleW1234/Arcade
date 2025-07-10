import "./InnerGamescreen.css";

function InnerGamescreen ({circle, currentSlot, winner}){

    /*20 × 30 matrix*/
    const gameArray = Array.from({ length: 15 }, () => Array(20).fill(0));
    
    return (

        <div className = "ORBGameBoardScreen">
            {gameArray.map((row, rowIndex) => (
                row.map((cell, colIndex) => {

                    const circlePart = circle.some(
                        ([r, c]) => r === rowIndex && c === colIndex
                    );

                    const slot = circle[currentSlot][0] === rowIndex && circle[currentSlot][1] === colIndex;

                    const winningCirclePart = winner[0] === rowIndex && winner[1] === colIndex;

                    return (

                        slot ? (

                            <div key = {rowIndex + "," + colIndex} className="ORBGameBoardCurrentSlot"></div>


                        ) : winningCirclePart ? (

                            <div key = {rowIndex + "," + colIndex} className="ORBGameBoardWinningCircle"></div>

                        ) : circlePart ? (

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


export default InnerGamescreen;