import { useEffect, useState } from 'react';
import Square from './Square'

export default function Board() {
    const [board, setBoard] = useState([]);

    useEffect(() => {
        matrix(5,5)
      }, []);
     
    function matrix(m, n) {
        var result = []
        for(var i = 0; i < n; i++) {
            result.push(new Array(m).fill(0))
        }
        console.log(result)
        setBoard(result)
    }
    return (
      <>   
        
        {board.map((rowItem) => (
            <div className="board-row">
                {rowItem.map((columnItem) =>(
                    <Square value={columnItem}/>
                ))} 
             </div>  
         ))}
      </>
    );
  }