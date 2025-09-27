import "./InnerGamescreen.css";
import car from "./../../../Images/image 38.svg";
import chicken from "./../../../Images/image 33.svg";

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

                                <img src = {car} className = "CHCGameBoardStreet" key = {rowIndex + "," + colIndex} />

                            ) : (

                                playerHere && carCrash === false ? ( 

                                    <img src= {chicken} className = "CHCGameBoardStreet" key = {rowIndex + "," + colIndex} />

                                ) : (

                                    <div className = "CHCGameBoardStreet" key = {rowIndex + "," + colIndex}> </div>

                                )

                            )

                        ) : (

                            playerHere && carCrash === false ? (

                                <img src= {chicken} className = "CHCGameBoardGrass" key = {rowIndex + "," + colIndex} />

                            ) : ( 

                                <div className = "CHCGameBoardGrass" key = {rowIndex + "," + colIndex}></div>

                            )

                        )
                
                    )
                
                })

            ))}

        </div>

    );

}


export default InnerGamescreen;