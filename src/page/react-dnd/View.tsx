import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import Board from './components/Board';
import { KnightPositionType } from './types';
import { HTML5Backend } from 'react-dnd-html5-backend';

/*
React dnd demo
*/

const init_knight_position = [1, 0];

export default function View() {
  const [knightPosition, setKnightPosition] =
    useState<KnightPositionType>(init_knight_position);

  const moveKnight = (x: number, y: number) => {
    console.log('moveKnight');
    setKnightPosition([x, y]);
  };

  const canMoveKnight = (toX: number, toY: number): boolean => {
    console.log(`canMoveKnight, toX: ${toX} toY: ${toY}`);
    const [x, y] = knightPosition;
    const dx = toX - x;
    const dy = toY - y;

    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    );

    // return true;
  };

  console.log('knightPosition', knightPosition);

  return (
    <DndProvider backend={HTML5Backend} debugMode={true}>
      <Board
        knightPosition={knightPosition}
        moveKnight={moveKnight}
        canMoveKnight={canMoveKnight}
      ></Board>
    </DndProvider>
  );
}
