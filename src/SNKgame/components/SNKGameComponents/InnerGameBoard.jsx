import "./InnerGameBoard.css";

function InnerGameBoard ({snake, appleLocation}){

    const gameboardMatrix = Array.from({ length: 20 }, () => Array(30).fill(0));

    return (

        <div className = "SNKrenderedgameboard">    

            {gameboardMatrix.map((row, rowIndex) => (
                row.map((_, colIndex) => {

                    const isApple = appleLocation[0] === rowIndex && appleLocation[1] === colIndex;
                    const isSnake = snake.some(([x, y]) => rowIndex === x && colIndex === y);
                    
                    return (

                        <div key={rowIndex + "," + colIndex} className="SNKemptySpace">

                            {isSnake === true ? (

                                <div className="SNKsnakeLink"></div>

                            ) : isApple === true ? (

                                <div className="SNKApple"></div>

                            ) : null}
                            
                        </div>
                
                    )

                })
            ))}

        </div>
    );

}


export default InnerGameBoard;