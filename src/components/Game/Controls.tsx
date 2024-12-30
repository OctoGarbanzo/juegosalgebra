import { ArrowDownUp, Plus, Divide } from 'lucide-react';

interface ControlsProps {
  onSwapRows: () => void;
  onScaleRow: () => void;
  onAddRows: () => void;
  moves: number;
  selectedRows: { first: number | null; second: number | null };
}

export const Controls = ({ onSwapRows, onScaleRow, onAddRows, moves, selectedRows }: ControlsProps) => {
  const { first: rowA, second: rowB } = selectedRows;
  const disabled = rowA === null;

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg">
      <div className="text-xl font-bold text-center">
        Moves: {moves}
      </div>
      <button
        onClick={onSwapRows}
        disabled={rowA === null || rowB === null}
        className="flex flex-col items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        <div className="flex items-center gap-2">
          <ArrowDownUp size={20} />
          <span>Swap Rows</span>
        </div>
        {rowA !== null && rowB !== null && (
          <span className="text-sm">Swap Row A ↔ Row B</span>
        )}
      </button>
      <button
        onClick={onScaleRow}
        disabled={disabled}
        className="flex flex-col items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
      >
        <div className="flex items-center gap-2">
          <Divide size={20} />
          <span>Scale Row</span>
        </div>
        {rowA !== null && (
          <span className="text-sm">Scale Row A by factor</span>
        )}
      </button>
      <button
        onClick={onAddRows}
        disabled={disabled}
        className="flex flex-col items-center gap-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
      >
        <div className="flex items-center gap-2">
          <Plus size={20} />
          <span>Add Rows</span>
        </div>
        {rowA !== null && (
          <div className="text-sm text-center">
            <div>To Row A, add:</div>
            <div>Row B × factor</div>
          </div>
        )}
      </button>
    </div>
  );
};