import { useEffect, useState } from "react";
import Square from "./Square";

function Board() {
  const [grid, setGrid] = useState([]);
  const [nextValueX, setnextValueX] = useState(true);
  const [gridSize, setGridSize] = useState(3);
  const [gameStatus, setGameStatus] = useState("X");
  const [history, setHistory] = useState([]);
  const [currentMove, setCurrentMove] = useState(0);
  const [hasWinner, setHasWinner] = useState(false);

  useEffect(() => {
    initializeGrid(gridSize);
  }, [gridSize]);

  function initializeGrid(size) {
    if (size < 3 || !size) {
      size = 3;
    }
    setHistory([Array(size * size).fill(null)]);
    var initGrid = [];
    for (var i = 0; i < size; i++) {
      initGrid.push(new Array(size).fill(null));
    }
    setGrid(initGrid);
  }

  function setNext(i, j, value) {
    const nextHistory = [
      ...history.slice(0, currentMove),
      { value: value, row: i, column: j },
    ];
    console.log(nextHistory);
    setHistory(nextHistory);
  }

  function handleClick(i, j) {
    const nextGrid = grid.slice();
    //Check if value already set
    if (nextGrid[i][j] || hasWinner) {
      return;
    }
    setCurrentMove(currentMove + 1);
    console.log(currentMove);
    let value = nextValueX ? "X" : "O";
    if (nextValueX) {
      nextGrid[i][j] = value;
      //setGameStatus(value);
    } else {
      nextGrid[i][j] = value;
      ///setGameStatus(value);
    }
    setNext(i, j, value);
    if (checkForWinner(nextGrid, i, j, value)) {
      console.log("Winner: " + value);
      setHasWinner(true);
      //setGameStatus("Winner: " + value);
      setGrid(nextGrid);
    }
    setnextValueX(!nextValueX);
    setGrid(nextGrid);
  }

  function checkForWinner(grid, row, column, value) {
    if (hasSameValue(grid[row])) {
      return value;
    }
    //column
    let currentColumn = [];
    for (let i = 0; i < grid.length; i++) {
      currentColumn.push(grid[i][column]);
    }
    if (hasSameValue(currentColumn)) {
      return value;
    }
    // diagonal
    // need to check if value is on diagonal
    let firstDiagonale = [];
    let secondDiagonale = [];
    let k = grid.length - 1;
    for (let i = 0; i < grid.length; i++) {
      firstDiagonale.push(grid[i][i]);
      secondDiagonale.push(grid[i][k]);
      k -= 1;
    }
    if (hasSameValue(firstDiagonale)) {
      return value;
    }
    if (hasSameValue(secondDiagonale)) {
      return value;
    }
    return null;
  }

  function hasSameValue(arr) {
    if (arr.every((val, i, arr) => val === arr[0] && val !== null)) {
      return true;
    } else {
      return false;
    }
  }

  function reset() {
    initializeGrid(gridSize);
    setnextValueX(true);
    setGameStatus("X");
    setCurrentMove(0);
    setHasWinner(false);
  }

  function undoMove() {
    if (currentMove <= 0) {
      return;
    }
    const nextGrid = grid.slice();
    nextGrid[history[currentMove - 1].row][history[currentMove - 1].column] =
      null;
    setGrid(nextGrid);
    setCurrentMove(currentMove - 1);
    setnextValueX(!nextValueX);
    setGameStatus(nextValueX ? "X" : "O");
  }

  function redoMove() {
    if (currentMove >= history.length || !history[currentMove].value) {
      return;
    }
    const nextGrid = grid.slice();
    nextGrid[history[currentMove].row][history[currentMove].column] =
      history[currentMove].value;
    setGrid(nextGrid);
    setCurrentMove(currentMove + 1);
    setnextValueX(!nextValueX);
    setGameStatus(nextValueX ? "X" : "O");
  }

  function changeGridSize(size) {
    setGridSize(size);
    reset();
  }

  let gamesStatus;
  if (hasWinner) {
    gamesStatus = "Winner: " + (nextValueX ? "O" : "X");
  } else {
    gamesStatus = "Next player: " + (nextValueX ? "X" : "O");
  }

  return (
    <>
      <form>
        <label>
          Enter Board Size:
          <input
            type="number"
            onChange={(e) => changeGridSize(parseInt(e.target.value))}
          />
        </label>
      </form>
      <div className="gameStatus">{gamesStatus}</div>
      {grid.map((rowItem, indexI) => (
        <div className="board-row">
          {rowItem.map((columnItem, indexJ) => (
            <Square
              value={columnItem}
              onSquareClick={() => handleClick(indexI, indexJ)}
            />
          ))}
        </div>
      ))}
      <button onClick={reset}>Reset</button>
      <button onClick={undoMove}>undo</button>
      <button onClick={redoMove}>redo</button>
    </>
  );
}

export default Board;
