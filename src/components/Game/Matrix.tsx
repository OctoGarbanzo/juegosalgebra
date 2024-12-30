import { MatrixCell } from './MatrixCell';

interface MatrixProps {
  matrix: number[][];
  selectedRows: { first: number | null; second: number | null };
  onCellClick: (row: number, col: number) => void;
}

export const Matrix = ({ matrix, selectedRows, onCellClick }: MatrixProps) => {
  const getRowLabel = (rowIndex: number) => {
    if (rowIndex === selectedRows.first) return 'A';
    if (rowIndex === selectedRows.second) return 'B';
    return undefined;
  };

  return (
    <div className="grid gap-4 p-4">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {row.map((value, colIndex) => (
            <MatrixCell
              key={`${rowIndex}-${colIndex}`}
              value={value}
              row={rowIndex}
              col={colIndex}
              isSelected={rowIndex === selectedRows.first || rowIndex === selectedRows.second}
              isLastColumn={colIndex === row.length - 1}
              rowLabel={getRowLabel(rowIndex)}
              onClick={() => onCellClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};