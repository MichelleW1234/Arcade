export const changePosition = (currentPosition, setCurrentPosition, direction, setDirection) => {

    if (direction === 0) {

        if (currentPosition === 0){

            setDirection(1);
            setCurrentPosition(prev => prev + 1);

        } else {

            setCurrentPosition(prev => prev - 1);

        }


    } else {

        if (currentPosition === 30){

            setDirection(0);
            setCurrentPosition(prev => prev - 1);

        } else {

            setCurrentPosition(prev => prev + 1);

        }


    }

};


export const clawGrab = (currentPosition, setResult, setButtonHit) => {

    if (currentPosition < 10 || currentPosition > 20){

        setResult(0);

    } else if (currentPosition < 13 || currentPosition > 17) {

        const prizeWon = Math.floor(Math.random() * 21);

        if (prizeWon == 10) {

            setResult(1);

        }

    } else if (currentPosition < 15 || currentPosition > 15) {

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

}




export const chooseCat = () => {

    const cat = Math.floor(Math.random() * 20);

    if (cat < 10) {

        return 

    } else if (cat < 15) {

        return 

    } else if (cat < 19) {

        return 

    } else {
    //The rarest cat

        return 

    }

}
