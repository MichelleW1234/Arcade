import "./InnerGameBoard.css";


function InnerGameBoard ({snake, appleLocation}){

    //20 x 30 (20x20 pieces moving around the screen)
    const gameBoardMatrix = Array.from({ length: 20 }, () => Array(30).fill(0));

    return (

        <div className = "SNKrenderedgameboard">    

            {gameBoardMatrix.map((row, rowIndex) => (
                row.map((num, colIndex) => {

                    const isApple = appleLocation[0] === rowIndex && appleLocation[1] === colIndex;
                    const isSnake = snake.some(([x, y]) => rowIndex === x && colIndex === y);
                    
                    return (

                        <div key={rowIndex + "," + colIndex} className="SNKemptySpace">

                            {isSnake && <div className="SNKsnakeLink"></div>}
                            {isApple && <div className="SNKApple"></div>}
                         
                        </div>
                
                    )

                })
            ))}

        </div>
    );

}


export default InnerGameBoard;