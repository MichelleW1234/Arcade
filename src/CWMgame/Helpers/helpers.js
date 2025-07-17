import { playSound } from "../../Helpers/helpers";

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


export const chooseCat = () => {

    const cat = Math.floor(Math.random() * 20);

    if (cat < 10) {

        return 1;

    } else if (cat < 15) {

        return 2;

    } else if (cat < 19) {

        return 3;

    } else {
    //The rarest cat

        return 4;

    }

}
