import "./InnerGameBoard.css";


function InnerGameBoard ({snake, appleLocation}){

    //20 x 30 (20x20 pieces moving around the screen)
    const gameBoardMatrix = Array.from({ length: 20 }, () => Array(30).fill(0));

    return (

        <div className = "SNKrenderedgameboard">    

            {gameBoardMatrix.map((row, rowIndex) => (
                row.map((num, colIndex) => (

                    snake.some(([x, y]) => rowIndex === x && colIndex === y) ? (

                        <div key={rowIndex + "," + colIndex} className = "SNKsnakeLink"> </div> 

                    ) : appleLocation.x === rowIndex && appleLocation.y === colIndex ? (

                        <div key={rowIndex + "," + colIndex} className = "SNKApple"> </div> 

                    ) : (

                        <div key={rowIndex + "," + colIndex} className = "SNKemptySpace"> </div> 

                    )
                ))
            ))}

        </div>
    );

}


export default InnerGameBoard;