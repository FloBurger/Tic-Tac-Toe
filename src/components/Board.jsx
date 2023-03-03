import { useEffect, useState } from "react";
import Square from "./Square";

function Board() {
  const [grid, setGrid] = useState([]);
  const [nextValueX, setnextValueX] = useState(true);
  const [gridSize, setGridSize] = useState(3);
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

  // Pushes the current Move to the History
  function setNextInHistory(i, j, value) {
    const nextHistory = [
      ...history.slice(0, currentMove),
      { value: value, row: i, column: j },
    ];
    setHistory(nextHistory);
  }

  function handleSquareClick(i, j) {
    const nextGrid = grid.slice();
    //Check if value already set
    if (nextGrid[i][j] || hasWinner) {
      return;
    }
    setCurrentMove(currentMove + 1);
    let value = nextValueX ? "X" : "O";
    if (nextValueX) {
      nextGrid[i][j] = value;
    } else {
      nextGrid[i][j] = value;
    }
    setNextInHistory(i, j, value);
    if (checkForWinner(nextGrid, i, j, value)) {
      setHasWinner(true);
      setGrid(nextGrid);
    }
    setnextValueX(!nextValueX);
    setGrid(nextGrid);
  }

  function checkForWinner(grid, row, column, value) {
    // row
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

  // Checks if every element in the Array is the same and not null
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
    setCurrentMove(0);
    setHasWinner(false);
  }

  function undoMove() {
    if (currentMove <= 0 || hasWinner) {
      return;
    }
    const nextGrid = grid.slice();
    nextGrid[history[currentMove - 1].row][history[currentMove - 1].column] =
      null;
    setGrid(nextGrid);
    setCurrentMove(currentMove - 1);
    setnextValueX(!nextValueX);
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
  }

  function changeGridSize(size) {
    setGridSize(size);
    reset();
  }

  let gamesStatus;
  if (hasWinner) {
    gamesStatus = "Winner: " + (nextValueX ? "O" : "X");
  } else if (currentMove === gridSize ** 2) {
    gamesStatus = "Tie";
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
              onSquareClick={() => handleSquareClick(indexI, indexJ)}
            />
          ))}
        </div>
      ))}
      <button className="button-1" role="button" onClick={reset}>
        Reset
      </button>
      <button className="button-1" role="button" onClick={undoMove}>
        Undo
      </button>
      <button className="button-1" role="button" onClick={redoMove}>
        Redo
      </button>
    </>
  );
}

export default Board;
