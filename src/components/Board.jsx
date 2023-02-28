import { useEffect, useState } from "react";
import Square from "./Square";

export default function Board() {
  const [grid, setGrid] = useState([]);
  const [nextValueX, setnextValueX] = useState(true);

  useEffect(() => {
    fillGrid(5);
  }, []);

  function createGrid(size) {
    var result = [];
    for (var i = 0; i < size; i++) {
      result.push(new Array(size).fill(null));
    }
    console.log(result);
    return result;
  }

  function fillGrid(size) {
    let initGrid = createGrid(5);
    let counter = 1;
    for (let i = 0; i < size; ++i) {
      for (let j = 0; j < size; ++j) {
        let cellContent = {
          index: counter,
          value: null,
          magic: null,
        };
        initGrid[i][j] = cellContent;
        ++counter;
      }
    }
    setGrid(initGrid);
  }
  function handleClick(i, j) {
    const nextGrid = grid.slice();
    //Check if value already set
    if (nextGrid[i][j].value) {
      return;
    }
    if (nextValueX) {
      nextGrid[i][j].value = "X";
    } else {
      nextGrid[i][j].value = "O";
    }
    setnextValueX(!nextValueX);
    setGrid(nextGrid);
  }

  return (
    <>
      {grid.map((rowItem, indexI) => (
        <div className="board-row">
          {rowItem.map((columnItem, indexJ) => (
            <Square
              value={columnItem.value}
              onSquareClick={() => handleClick(indexI, indexJ)}
            />
          ))}
        </div>
      ))}
    </>
  );
}
