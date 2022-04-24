import Knight from './Knight';
import { KnightPositionType } from '../types';
import BoardSquare from './BoardSquare';
import styles from './Board.module.less';

interface Props {
  knightPosition: KnightPositionType;
  moveKnight: (x: number, y: number) => void;
  canMoveKnight: (x: number, y: number) => boolean;
}

function renderPiece(
  x: number,
  y: number,
  [knightX, knightY]: KnightPositionType,
) {
  if (x === knightX && y === knightY) {
    return <Knight x={knightX} y={knightY} />;
  } else {
    return null;
  }
}

function renderSquare(
  i: number,
  knightPosition: KnightPositionType,
  moveKnight: (x: number, y: number) => void,
  canMoveKnight: (x: number, y: number) => boolean,
) {
  const x = i % 8;
  const y = Math.floor(i / 8);

  return (
    <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
      <BoardSquare
        x={x}
        y={y}
        moveKnight={moveKnight}
        canMoveKnight={canMoveKnight}
      >
        {renderPiece(x, y, knightPosition)}
      </BoardSquare>
    </div>
  );
}

function Board(props: Props) {
  const { knightPosition, moveKnight, canMoveKnight } = props;

  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition, moveKnight, canMoveKnight));
  }

  return <div className={styles.board}>{squares}</div>;
}

export default Board;
