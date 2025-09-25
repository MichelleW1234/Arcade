import "./InnerGamescreen.css";

function InnerGamescreen ({streets, position, carCrash}){

    const gameArray = Array.from({ length: 5 }, () => Array(10).fill(0));
    
    return (
         
        <div className = "CHCGameBoardScreen">

            {gameArray.map((row, rowIndex) => (
                row.map((_, colIndex) => {

                    const street = streets.find(inner => inner[0] === rowIndex);
                    const streetVehicleHere = street !== undefined ? 
                        street[1].includes(colIndex) 
                        : false;

                    const playerHere = rowIndex === 3 && colIndex === position;

                    return (

                        street !== undefined ? (

                            streetVehicleHere ? (

                                <div className = "CHCGameBoardCar" key = {rowIndex + "," + colIndex}></div>

                            ) : (

                                playerHere && carCrash === false ? ( 

                                    <div className = "CHCGameBoardPlayer" key = {rowIndex + "," + colIndex}></div>

                                ) : (

                                    <div className = "CHCGameBoardEmptySpace" key = {rowIndex + "," + colIndex}></div>

                                )

                            )

                        ) : (

                            playerHere && carCrash === false ? (

                                <div className = "CHCGameBoardPlayer" key = {rowIndex + "," + colIndex}></div>

                            ) : ( 

                                <div className = "CHCGameBoardEmptySpace" key = {rowIndex + "," + colIndex}></div>

                            )

                        )
                
                    )
                
                })

            ))}

        </div>

    );

}


export default InnerGamescreen;