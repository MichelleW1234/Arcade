import { playSound, resetAchievementsUpdate} from "../../Helpers/helpers";

export const changePosition = (currentPosition, setCurrentPosition, direction) => {

    if (direction.current === 0) {

        if (currentPosition === 0){

            direction.current = 1;
            setCurrentPosition(prev => prev + 1);

        } else {

            setCurrentPosition(prev => prev - 1);

        }

    } else {

        if (currentPosition === 22){

            direction.current = 0;
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

        if (prizeWon === 10) {

            setResult(1);

        }

    } else if (currentPosition < 11 || currentPosition > 11) {

        const prizeWon = Math.floor(Math.random() * 10);

        if (prizeWon === 5) {

            setResult(1);

        }

    } else {

        const prizeWon = Math.floor(Math.random() * 2);

        if (prizeWon === 1) {

            setResult(1);

        }

    }

    setButtonHit(true);
    playSound(23);

}



export const animateClaw = (currentPosition, clawExtension, setClawExtension, setClawWentDown) => {

    if (clawExtension[1] !== currentPosition){

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



const choosePrize = () => {

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




const setsEqual = (a, b) => {
  return a.size === b.size && [...a].every(val => b.has(val));
}


const clawAchievementsUpdate = (setAchievements, index, prizeWon) => {

    setAchievements(prev => {
        const newAchievements = prev.map(inner =>
            inner.map(val => Array.isArray(val) ? [...val] : val)
            );

        if (!newAchievements[index][0].includes(prizeWon)){

            newAchievements[index][0].push(prizeWon);

            if (newAchievements[index][0].length === newAchievements[index][1]) {

                newAchievements[index][0] = [];
                newAchievements[index][4] += 1;
                newAchievements[0][0] = true;

            }

        }

        return newAchievements;

    });

}


export const claimPrize = (result, setCWMUser, setPrize, setPlayer, ActiveGameCost, prizeIndices, setAchievements) => {

    if (result === 1){

        const prize = choosePrize();
        setCWMUser([prize]);

        if (prize === 1){

            setPrize(prev => {
                const newArray = prev.map(row => [...row]);
                newArray[prizeIndices[0]][0] = "X";
                newArray[prizeIndices[0]][1] -= 1;
                return newArray;
            });

        } else if (prize === 2){

            setPrize(prev => {
                const newArray = prev.map(row => [...row]);
                newArray[prizeIndices[1]][0] = "X";
                newArray[prizeIndices[1]][1] -= 1;
                return newArray;
            });

        } else if (prize === 3){

            setPrize(prev => {
                const newArray = prev.map(row => [...row]);
                newArray[prizeIndices[2]][0] = "X";      
                newArray[prizeIndices[2]][1] -= 1;
                return newArray;
            });


        } else {

            setPrize(prev => {
                const newArray = prev.map(row => [...row]); 
                newArray[prizeIndices[3]][0] = "X";          
                newArray[prizeIndices[3]][1] -= 1;
                return newArray;
            });

        }


        if (setsEqual(new Set(prizeIndices), new Set([9, 10, 11, 12]))){

            clawAchievementsUpdate(setAchievements, 10, prize);

        } else if (setsEqual(new Set(prizeIndices), new Set([13, 14, 15, 16]))){

            clawAchievementsUpdate(setAchievements, 11, prize);

        } else {

            clawAchievementsUpdate(setAchievements, 12, prize);

        }


    }

    setPlayer(prev => [prev[0] - ActiveGameCost]);
    playSound(2);

}




export const exitGame = (setPlayer, ActiveGameCost, setCWMUser) => {

    playSound(4);
    setCWMUser([0]);
    setPlayer(prev => [prev[0] - ActiveGameCost]);

}



export const resetGame = (setCWMUser, Achievements, setAchievements) => {
    
    playSound(19);
    setCWMUser([0]);
    resetAchievementsUpdate(Achievements, setAchievements);

}



export const reset = (setCWMUser, Achievements, setAchievements) => {
    
    playSound(4);
    setCWMUser([0]);
    resetAchievementsUpdate(Achievements, setAchievements);

}