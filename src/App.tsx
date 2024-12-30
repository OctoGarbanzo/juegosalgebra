import { useState } from 'react';
import { motion } from 'framer-motion';
import { Matrix } from './components/Game/Matrix';
import { Controls } from './components/Game/Controls';
import { Carousel } from './components/Game/Carousel';
import { OperationModal } from './components/Game/OperationModal';
import { useMatrixOperations } from './hooks/useMatrixOperations';
import { useGameState } from './hooks/useGameState';

const initialMatrix = [
  [2, 1, -1, 8],
  [-3, -1, 2, -11],
  [-2, 1, 2, -3]
];

const targetMatrix = [
  [1, 0, 0, 2],
  [0, 1, 0, -1],
  [0, 0, 1, 3]
];

function App() {
  const [selectedRows, setSelectedRows] = useState<{ first: number | null; second: number | null }>({
    first: null,
    second: null
  });

  const { matrix, setMatrix, moves, setMoves, modalConfig, setModalConfig } = useGameState(initialMatrix);
  const { swapRows, scaleRow, addRows } = useMatrixOperations();

  const handleCellClick = (row: number) => {
    if (selectedRows.first === null) {
      setSelectedRows({ ...selectedRows, first: row });
    } else if (selectedRows.second === null && row !== selectedRows.first) {
      setSelectedRows({ ...selectedRows, second: row });
    }
  };

  const handleSwapRows = () => {
    const { first, second } = selectedRows;
    if (first === null || second === null) return;
    
    setMatrix(swapRows(matrix, first, second));
    setSelectedRows({ first: null, second: null });
    setMoves(moves + 1);
  };

  const handleScaleRow = () => {
    const { first } = selectedRows;
    if (first === null) return;
    
    setModalConfig({
      isOpen: true,
      type: 'scale',
      title: 'Scale Row',
      description: `Multiply Row A by a factor`,
      onConfirm: (factor) => {
        setMatrix(scaleRow(matrix, first, factor));
        setSelectedRows({ first: null, second: null });
        setMoves(moves + 1);
      },
    });
  };

  const handleAddRows = () => {
    const { first, second } = selectedRows;
    if (first === null) return;
    
    setModalConfig({
      isOpen: true,
      type: 'add',
      title: 'Add Rows',
      description: `To Row A, add Row B multiplied by a factor`,
      onConfirm: (factor) => {
        const targetRow = second ?? (first === matrix.length - 1 ? first - 1 : first + 1);
        setMatrix(addRows(matrix, first, targetRow, factor));
        setSelectedRows({ first: null, second: null });
        setMoves(moves + 1);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto py-8"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Matrix Transformation Game</h1>
        <div className="flex gap-8 justify-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Current Matrix</h2>
            <Matrix
              matrix={matrix}
              selectedRows={selectedRows}
              onCellClick={handleCellClick}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Target Matrix</h2>
            <Matrix
              matrix={targetMatrix}
              selectedRows={{ first: null, second: null }}
              onCellClick={() => {}}
            />
          </div>
          <Controls
            moves={moves}
            selectedRows={selectedRows}
            onSwapRows={handleSwapRows}
            onScaleRow={handleScaleRow}
            onAddRows={handleAddRows}
          />
        </div>
        <OperationModal {...modalConfig} />
      </motion.div>
    </div>
  );
}

export default App;