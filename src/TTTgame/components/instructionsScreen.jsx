function instructionsScreen() {

    return (

      <div className = "screenLayout">

          <h1 className = "headerwords"> Instructions: </h1>

          <p className = "largefont">   
            &gt; Your opponent is this computer. <br/>
            &gt; The board is a standard 3x3 with 9 total cells. <br/>
            &gt; You will determine who makes the first move by flipping a coin. <br/>
            &gt; Good luck! <br/>
          </p>

          <a href = "/TTTcoinFlip">
            <button className = "generalbutton"> Continue </button>
          </a>

      </div>

    )

  }
  
  export default instructionsScreen