function Instructionsscreen (){

    return (
        <div className= "screenLayout">
            <h1 className = "instructionsSign"> Instructions: </h1>
            <p className="largefont">
                &gt; A game has 10 rounds.<br/>
                &gt; In each round, you either win or lose to the computer. <br/>
                &gt; If you win, you get a point. <br/>
                &gt; If the computer wins, it gets a point.<br/>
                &gt; There will be a point summary at the end of the game, which will determine who wins overall (or if there is a winner). <br/>
                &gt; You can read about how different objects affect one another by clicking the "Move References" button while playing. <br/>
            </p>
            <p className="largefont">
                Good luck!
            </p>
            <a href = "/RPSlevels">
                <button className = "generalbutton"> Choose Level </button>
            </a>
        </div>
    );
}

export default Instructionsscreen;