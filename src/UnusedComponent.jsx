import React, { useState, useEffect } from "react";

const Gamecomponent = () => {
    const [score, setScore] = useState(0);

    useEffect(() => {
        const gameLoop = setInterval(() => {
            setScore(prevScore => prevScore + 1); // Update score every frame
        }, 1000);

        return () => clearInterval(gameLoop); // Cleanup game loop when component is unmounted
    }, []);

    return (
        <div>
            <h1>Score: {score}</h1>
            <div id="gameCanvas"></div>
        </div>
    );
};

export default Gamecomponent;