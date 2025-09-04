export const orbiting = (circle, currentSlot, setCurrentSlot) => {

    if (currentSlot === circle.length-1){

        setCurrentSlot(0);

    } else {

        setCurrentSlot(prev => prev + 1);

    }

}