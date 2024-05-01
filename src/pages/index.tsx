import { useState } from 'react';
import styles from './index.module.css';
const score_white = [0];
const score_black = [0];
const suggest = (y, x, board, turnColor) => {
  for (const direction of directions) {
    if (
      board[y + direction[0]] !== undefined &&
      board[y + direction[0]][x + direction[1]] === 3 - turnColor
    ) {
      for (let i = 1; i < 8; i++) {
        if (
          board[y + direction[0] * i] !== undefined &&
          board[y + direction[0] * i][x + direction[1] * i] === turnColor
        ) {
          return true;
        }
        console.log(board[y][x]);
      }
    }
  }
};
const directions = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];
const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const clickHandler = (x: number, y: number) => {
    const newBoard = structuredClone(board);
    if (board[y][x] !== 1 && board[y][x] !== 2) {
      // var checkRun = 'True';

      console.log(score_white, score_black);
      for (const direction of directions) {
        const memoryPosision = [];
        // if (checkRun === 'False') {
        //   break;
        // }
        if (
          board[y + direction[0]] !== undefined &&
          board[y + direction[0]][x + direction[1]] === 3 - turnColor
        ) {
          for (let i = 1; i < 8; i++) {
            if (
              board[y + direction[0] * i] !== undefined &&
              board[y + direction[0] * i][x + direction[1] * i] === 3 - turnColor
            ) {
              memoryPosision[memoryPosision.length] = [y + direction[0] * i, x + direction[1] * i];
              continue;
            } else if (
              board[y + direction[0] * i] !== undefined &&
              board[y + direction[0] * i][x + direction[1] * i] === turnColor
            ) {
              newBoard[y][x] = turnColor;
              for (const posision of memoryPosision) {
                newBoard[posision[0]][posision[1]] = turnColor;
              }
              setTurnColor(3 - turnColor);
              for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                  if (newBoard[i][j] === 3) {
                    newBoard[i][j] = 0;
                  }
                  if (suggest(i, j, newBoard, 3 - turnColor) === true) {
                    newBoard[i][j] = 3;
                  }
                }
              }
              setBoard(newBoard);
              break;
            } else {
              break;
            }
          }
        }
      }
      score_white[0] = 0;
      score_black[0] = 0;
      for (const rows of newBoard) {
        for (let i = 0; i < 8; i++) {
          if (rows[i] !== 0) {
            rows[i] === 1 ? score_black[0]++ : score_white[0]++;
          }
        }
      }
    }
  };
  return (
    <div className={styles.container}>
      <div>
        white:{score_white[0]} Black:{score_black[0]}
      </div>
      <div>{turnColor === 1 ? 'Turn of Black' : 'Turn of White'}</div>
      <div className={styles.boardStyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && color !== 3 && (
                <div
                  className={styles.stoneStyle}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
              {color === 3 && (
                <div
                  className={styles.artStyle}
                  style={{ background: board[y][x] === 3 ? '#0084FF' : '#ffffff0' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};
export default Home;
