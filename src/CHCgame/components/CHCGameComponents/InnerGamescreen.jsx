import "./InnerGamescreen.css";
import redCar from "./../../../Images/image 38.svg";
import blueCar from "./../../../Images/image 39.svg";
import chicken from "./../../../Images/image 40.svg";

function InnerGamescreen ({streets, position, carCrash}){

    const gameArray = Array.from({ length: 5 }, () => Array(10).fill(0));
    
    return (
         
        <div className = "CHCGameBoardScreen">

            {gameArray.map((row, rowIndex) => (
                row.map((_, colIndex) => {

                    const street = streets.find(inner => inner[0] === rowIndex);
                    const redVehicleHere = street !== undefined && street[1].some(([a, b]) => a === colIndex && b === 0);
                    const blueVehicleHere = street !== undefined && street[1].some(([a, b]) => a === colIndex && b === 1);
                    const playerHere = rowIndex === 3 && colIndex === position;

                    return (

                        street !== undefined ? (

                            redVehicleHere === true ? (

                                <img src = {redCar} className = "CHCGameBoardStreet" key = {rowIndex + "," + colIndex} />

                            ) : blueVehicleHere === true ? (

                                <img src = {blueCar} className = "CHCGameBoardStreet" key = {rowIndex + "," + colIndex} />

                            ) : (

                                playerHere === true && carCrash === false ? ( 

                                    <img src= {chicken} className = "CHCGameBoardStreet" key = {rowIndex + "," + colIndex} />

                                ) : (

                                    <div className = "CHCGameBoardStreet" key = {rowIndex + "," + colIndex}> </div>

                                )

                            )

                        ) : (

                            playerHere === true && carCrash === false ? (

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