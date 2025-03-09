import './homeScreen.css';

function homeScreen() {

  return (

    <div className = "screenLayout">

        <h1 className = "headerwords"> Welcome to tic-tac-toe.</h1>

        <a href = "/TTTinstructions">
          <button className = "generalbutton"> Instructions </button>
        </a>

    </div>

  )
}

export default homeScreen