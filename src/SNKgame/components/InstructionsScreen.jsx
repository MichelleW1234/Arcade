import { Link } from 'react-router-dom';

function InstructionsScreen (){

    return (

        <div className = "screenLayout">

            <h1 className = "instructionsSign">
                Instructions: 
            </h1>
            <p className = "largefont">
                &gt; Your goal is to use the controls to guide the snake to eat the apples. <br/>
                &gt; Immediately upon starting, the snake will start moving downwards from the top leftmost corner.<br/>
                &gt; By pressing the corresponding buttons, you can move the snake up, down, left, and right. <br/>
                &gt; However, the snake cannot immediately move in the opposite direction that it is traveling in
                at any given time and must be turned around with the necessary controls.<br/>
                &gt; For every apple that is eaten, you will gain 2 points. <br/>
                &gt; You will automatically give up 10 points by playing this game. <br/>
                &gt; NOTE: Beyond this point, you will lose points if you quit in the middle of the game. <br/>
            </p>

            <Link to="/SNKgame" className = "generalbuttonGlitch">
                Go to Game
            </Link>
            
        </div>

    );

}


export default InstructionsScreen;