import { useEffect, useState } from "react";
import Square from "./Square";

function Board() {
  const [grid, setGrid] = useState([]);
  const [nextValueX, setnextValueX] = useState(true);
  const [gridSize, setGridSize] = useState(4);

  useEffect(() => {
    initializeGrid(gridSize);
  }, []);

  function initializeGrid(size) {
    var initGrid = [];
    for (var i = 0; i < size; i++) {
      initGrid.push(new Array(size).fill(null));
    }
    console.log(initGrid);
    setGrid(initGrid);
  }

  function handleClick(i, j) {
    const nextGrid = grid.slice();
    let value = nextValueX ? "X" : "O";
    if (nextGrid[i][j]) {
      return;
    }
    //Check if value already set
    if (nextValueX) {
      nextGrid[i][j] = "X";
    } else {
      nextGrid[i][j] = "O";
    }
    if (checkForWinner(nextGrid, i, j, value)) {
      console.log("Winner: " + value);
      setGrid(nextGrid);
      return;
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

  return (
    <>
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
    </>
  );
}

export default Board;
