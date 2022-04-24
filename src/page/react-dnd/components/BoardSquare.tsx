import { useDrop } from 'react-dnd';
import { ItemTypes } from '../constants';
import Square from './Square';
import Overlay from './Overlay';

interface Props {
  x: number;
  y: number;
  moveKnight: (x: number, y: number) => void;
  canMoveKnight: (x: number, y: number) => boolean;
  children: React.ReactElement | null;
}

export default function BoardSquare({
  x,
  y,
  children,
  moveKnight,
  canMoveKnight,
}: Props) {
  const black = (x + y) % 2 === 1;

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.KNIGHT,
      drop: () => moveKnight(x, y),
      canDrop: () => canMoveKnight(x, y),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [x, y, moveKnight, canMoveKnight],
  );

  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && !canDrop && <Overlay color="red" />}
      {!isOver && canDrop && <Overlay color="yellow" />}
      {isOver && canDrop && <Overlay color="green" />}
    </div>
  );
}
