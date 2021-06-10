import { useEffect, useState } from 'react';
import './App.css';

const initMatrix = [];

const App = () => {
  const [matrix, setMatrix] = useState(initMatrix);
  const [matrixSize, setMatrixSize]  = useState(3);
  const [currentPlayer, setCurrentPlayer]  = useState('o');
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [winner, setWinner] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setWinner(false);
    setSelectedColumn(null);
    setSelectedRow(null);
    const row = new Array(matrixSize).fill(null);
    const tempMatrix = [];
    for(let i=0; i<matrixSize; i++) {
      tempMatrix.push([...row]);
    }
    setMatrix(tempMatrix);
  }, [reset]);

  useEffect(() => {
    if (!winner) {
      isWinner();
    }
  });

  const resetGame = () => {
    setReset(!reset);
  }

  const squerClick = (row, column) => {
    if(!matrix[row][column] && !winner) {
      setSelectedRow(row);
      setSelectedColumn(column);
      let nextPlayer = currentPlayer === 'x' ? 'o' :'x';
      setCurrentPlayer(nextPlayer);
      const matrixCopy = [...matrix];
      matrixCopy[row][column] = nextPlayer;
      setMatrix(matrixCopy);
    }
  }

  const isWinner = () => {
    let vertical = true;
    let horizontal = true;
    let diagonal1 = true;
    let diagonal2 = true;

    if(selectedColumn === null || selectedRow === null) {
      return;
    }

    for (let i = 0; i < matrixSize; i++) {
      if (matrix[i][selectedColumn] !== currentPlayer) {
        vertical = false;
      }
      if (matrix[selectedRow][i] !== currentPlayer) {
        horizontal = false;
      }
      if (matrix[i][matrixSize - i -1] !== currentPlayer) {
        diagonal2 = false;
      }
      if (matrix[i][i] !== currentPlayer) {
        diagonal1 = false;
      }
      if (matrix[i][matrixSize - i -1] !== currentPlayer) {
        diagonal2 = false;
      }
    }

    if (vertical || horizontal || diagonal1 || diagonal2) {
      setWinner(true);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={resetGame}>Reset Game</button>
        <div>
          {matrix.map((val,column) => (
              <div className='column'>
                  {val.map((val1, row) => (
                    <div onClick={() => squerClick(row, column)} className='row'>
                      {matrix[row][column]}
                    </div>
                  ))}
              </div>
            ))}
        </div>
        <h2>{winner ? `Player ${currentPlayer} is a winner`: ''}</h2>
      </header>
    </div>
  );
}

export default App;
