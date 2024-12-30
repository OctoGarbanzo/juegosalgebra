import React, { useState, useEffect } from 'react';
import { Matrix } from './Matrix';
import { Controls } from './Controls';
import { motion } from 'framer-motion';

interface LevelProps {
  level: number;
  targetMatrix: number[][];
  initialMatrix: number[][];
  onComplete: () => void;
}

export const Level: React.FC<LevelProps> = ({
  level,
  targetMatrix,
  initialMatrix,
  onComplete,
}) => {
  const [matrix, setMatrix] = useState(initialMatrix);
  const [moves, setMoves] = useState(0);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (JSON.stringify(matrix) === JSON.stringify(targetMatrix)) {
      onComplete();
    }
  }, [matrix, targetMatrix, onComplete]);

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell([row, col]);
  };

  const handleSwapRows = () => {
    if (!selectedCell) return;
    const newMatrix = [...matrix];
    const [row] = selectedCell;
    if (row < matrix.length - 1) {
      [newMatrix[row], newMatrix[row + 1]] = [newMatrix[row + 1], newMatrix[row]];
      setMatrix(newMatrix);
      setMoves(moves + 1);
    }
  };

  const handleMultiplyRow = () => {
    if (!selectedCell) return;
    const newMatrix = [...matrix];
    const [row] = selectedCell;
    newMatrix[row] = newMatrix[row].map(val => val * 2);
    setMatrix(newMatrix);
    setMoves(moves + 1);
  };

  const handleAddRows = () => {
    if (!selectedCell) return;
    const newMatrix = [...matrix];
    const [row] = selectedCell;
    if (row < matrix.length - 1) {
      newMatrix[row] = newMatrix[row].map((val, i) => val + newMatrix[row + 1][i]);
      setMatrix(newMatrix);
      setMoves(moves + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-8 p-8"
    >
      <h2 className="text-3xl font-bold text-gray-800">Level {level}</h2>
      <div className="flex gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Current Matrix</h3>
          <Matrix matrix={matrix} onCellClick={handleCellClick} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Target Matrix</h3>
          <Matrix matrix={targetMatrix} onCellClick={() => {}} />
        </div>
      </div>
      <Controls
        moves={moves}
        onSwapRows={handleSwapRows}
        onMultiplyRow={handleMultiplyRow}
        onAddRows={handleAddRows}
      />
    </motion.div>
  );
};