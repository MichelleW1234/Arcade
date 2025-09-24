import {playSound} from "../../Helpers/helpers.js";

export const newStreetCars = () => {

    let newStreetCarsArray = [];

    const random = Array.from({ length: 10 }, () => Math.floor(Math.random() * 2));

    for (let i = 0; i< random.length; i++){

        if (random[i] === 1){

            newStreetCarsArray.push(i);

        }

    }

    return newStreetCarsArray;

}


const crossedStreet = (newStreets) => {
    
    for (let i = 0; i<newStreets.length; i++){
        
        newStreets[i][0] += 1;

    }

    const filteredStreets = newStreets.filter(inner => inner[0] < 5);

    const streetNeeded = !newStreets.some(([first, second]) => first === 0);
    
    if (streetNeeded === true){

        const random = Math.floor(Math.random() * 5);

        if (random > 2){

            filteredStreets.push([0, newStreetCars()]);
        
        }

    }

    return filteredStreets;

}



export const trafficIncoming = (streets, setStreets, moveForwardRef) => {

    let newStreets = streets.map(([first, second]) => [first, [...second]]);

    if (moveForwardRef.current === true){

        newStreets = crossedStreet(newStreets);
        moveForwardRef.current = false;

    }


    for (let i = 0; i<newStreets.length; i++){
        for (let j = 0; j<newStreets[i][1].length; j++){
            newStreets[i][1][j] += 1; 
        }
    }

    let filteredStreets = newStreets.map(([first, second]) => [
        first,
        second.filter(num => num < 10)
    ]);

    for (let i = 0; i<filteredStreets.length; i++){
        
        const newTraffic = filteredStreets[i][1].includes(0);

        if (newTraffic === false){

            const random = Math.floor(Math.random() * 3);

            if (random === 2){

                filteredStreets[i][1].push(0);

            }

        }

    }

    setStreets(filteredStreets);

}



export const checkHit = (position, streets, setCarCrash) => {

    const street = streets.find(inner => inner[0] === 3);
    
    if (street !== undefined){

        const collision = street[1].includes(position);

        if (collision === true){

            setCarCrash(true);

        }

    }

}





