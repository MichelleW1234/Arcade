import "./Instructionsscreen.css";

function Instructionsscreen (){

    return (
        <div className= "instructions">
            <h1 className = "InstructionsSign">Instructions: </h1>
            <p className="words">
                &gt; A game has 10 rounds.<br/>
                &gt; In each round, you either win or lose to the computer. <br/>
                &gt; If you win, you get a point. <br/>
                &gt; If the computer wins, it gets a point.<br/>
                &gt; There will be a point summary at the end of the game, which will determine who wins overall (or if there is a winner). <br/>
            </p>
            <p className="words">
                Good luck!
            </p>
            <a href = "/levels">
                <button className = "chooseLevelButton"> Choose Level </button>
            </a>
        </div>
    );
}

export default Instructionsscreen;