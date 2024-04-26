import { useState } from 'react';
import styles from './index.module.css';
const score_white = [0];
const score_black = [0];
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
    if (board[y][x] !== 1 && board[y][x] !== 2) {
      // var checkRun = 'True';
      const newBoard = structuredClone(board);
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
      console.log(score_white, score_black);
    }
  };
  return (
    <div className={styles.container}>
      <div>
        white:{score_white} Black:{score_black}
      </div>
      <div>{turnColor === 1 ? 'Turn of Black' : 'Turn of White'}</div>
      <div className={styles.boardStyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stoneStyle}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
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
