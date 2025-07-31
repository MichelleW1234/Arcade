import { playSound, retrieveActiveGame} from "../../Helpers/helpers";

export const changePosition = (currentPosition, setCurrentPosition, direction, setDirection) => {

    if (direction === 0) {

        if (currentPosition === 0){

            setDirection(1);
            setCurrentPosition(prev => prev + 1);

        } else {

            setCurrentPosition(prev => prev - 1);

        }

    } else {

        if (currentPosition === 22){

            setDirection(0);
            setCurrentPosition(prev => prev - 1);

        } else {

            setCurrentPosition(prev => prev + 1);

        }

    }

};


export const clawGrab = (currentPosition, setResult, setButtonHit) => {

    if (currentPosition < 5 || currentPosition > 17){

        setResult(0);

    } else if (currentPosition < 8 || currentPosition > 14) {

        const prizeWon = Math.floor(Math.random() * 21);

        if (prizeWon == 10) {

            setResult(1);

        }

    } else if (currentPosition < 11 || currentPosition > 11) {

        const prizeWon = Math.floor(Math.random() * 10);

        if (prizeWon == 5) {

            setResult(1);

        }

    } else {

        const prizeWon = Math.floor(Math.random() * 2);

        if (prizeWon == 1) {

            setResult(1);

        }

    }

    setButtonHit(true);
    playSound(23);

}


export const animateClaw = (currentPosition, clawExtension, setClawExtension, setClawWentDown) => {

    if (clawExtension[1] != currentPosition){

        setClawExtension(prev => {
            const updated = [...prev];
            updated[1] += 1;
            return updated;
        });

    } else if (clawExtension[0] < 15){

        setClawExtension(prev => {
            const updated = [...prev];
            updated[0] += 1;
            return updated;
        });

    } else {

        setClawWentDown(true);

    }

}


export const choosePrize = () => {

    const prize = Math.floor(Math.random() * 20);

    if (prize < 10) {

        return 1;

    } else if (prize < 15) {

        return 2;

    } else if (prize < 19) {

        return 3;

    } else {

        return 4;

    }

}


export const claimPrize = (result, setCWMUser, setPrize, Player, setPlayer, ActiveGameCost, prizeIndices) => {

    if (result == 1){

        const prize = choosePrize();
        setCWMUser([prize]);

        if (prize == 1){

            setPrize(prev => {
                const newArray = prev.map(row => [...row]); // Deep copy
                newArray[prizeIndices[0]][0] = "X";                         // Update the value
                newArray[prizeIndices[0]][1] -= 1;
                return newArray;
            });

        } else if (prize == 2){

            setPrize(prev => {
                const newArray = prev.map(row => [...row]); // Deep copy
                newArray[prizeIndices[1]][0] = "X";                      // Update the value
                newArray[prizeIndices[1]][1] -= 1;
                return newArray;
            });

        } else if (prize == 3){

            setPrize(prev => {
                const newArray = prev.map(row => [...row]); // Deep copy
                newArray[prizeIndices[2]][0] = "X";                       // Update the value
                newArray[prizeIndices[2]][1] -= 1;
                return newArray;
            });

        } else {

            setPrize(prev => {
                const newArray = prev.map(row => [...row]); // Deep copy
                newArray[prizeIndices[3]][0] = "X";                       // Update the value
                newArray[prizeIndices[3]][1] -= 1;
                return newArray;
            });

        }

    }

    setPlayer([Player[0] - ActiveGameCost]);
    playSound(2);

}


export const exitGame = (Player, setPlayer, ActiveGameCost, setCWMUser) => {

    playSound(4);
    setCWMUser([0]);
    setPlayer([Player[0] - ActiveGameCost]);

}

export const resetGame = (setCWMUser) => {
    
    playSound(19);
    setCWMUser([0]);

}

export const reset = (setCWMUser) => {
    
    playSound(4);
    setCWMUser([0]);

}

