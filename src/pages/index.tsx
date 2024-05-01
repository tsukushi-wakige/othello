import { useState } from 'react';
import styles from './index.module.css';
const score_white = [0];
const score_black = [0];
const memoryPosition: number[][] = [];
const flip = (board: number[][], turnColor: number) => {
  console.log(memoryPosition);
  console.log(board);
  for (const position of memoryPosition) {
    board[position[0]][position[1]] = turnColor;
  }
  return board;
};
const judge = (y: number, x: number, board: number[][], turnColor: number) => {
  memoryPosition.length = 0;
  let preReturnTrue = false;
  if (board[y][x] === 1 || board[y][x] === 2) return false;
  for (const direction of directions) {
    const preMemoryPosition = [];
    if (
      board[y + direction[0]] !== undefined &&
      board[y + direction[0]][x + direction[1]] === 3 - turnColor
    ) {
      for (let i = 1; i < 8; i++) {
        if (
          board[y + direction[0] * i] !== undefined &&
          board[y + direction[0] * i][x + direction[1] * i] === turnColor
        ) {
          for (const position of preMemoryPosition) {
            memoryPosition.push(position);
          }
          preReturnTrue = true;
        } else if (
          board[y + direction[0] * i] !== undefined &&
          board[y + direction[0] * i][x + direction[1] * i] === 3 - turnColor
        ) {
          preMemoryPosition.push([y + direction[0] * i, x + direction[1] * i]);
          console.log(preMemoryPosition);
        }
      }
    }
  }
  if (preReturnTrue === true) {
    return true;
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
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const clickHandler = (x: number, y: number) => {
    const newBoard = structuredClone(board);
    if (judge(y, x, newBoard, turnColor) === true) {
      newBoard[y][x] = turnColor;
      const newBoard2 = flip(newBoard, turnColor);
      setBoard(newBoard2);
      setTurnColor(3 - turnColor);
    }
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (newBoard[i][j] === 3) {
          newBoard[i][j] = 0;
        }
        if (judge(i, j, newBoard, 3 - turnColor) === true) {
          newBoard[i][j] = 3;
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
