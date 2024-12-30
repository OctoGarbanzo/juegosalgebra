import { motion } from 'framer-motion';

interface MatrixCellProps {
  value: number;
  row: number;
  col: number;
  isSelected: boolean;
  isLastColumn: boolean;
  rowLabel?: string;
  onClick: () => void;
}

export const MatrixCell = ({ 
  value, 
  row, 
  col, 
  isSelected, 
  isLastColumn,
  rowLabel,
  onClick 
}: MatrixCellProps) => {
  return (
    <motion.div
      className={`relative w-16 h-16 flex items-center justify-center cursor-pointer rounded-lg shadow-lg
        ${isSelected ? 'bg-blue-100' : 'bg-white'}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: row * 0.1 + col * 0.1 }}
      onClick={onClick}
    >
      <span className="text-2xl font-bold text-gray-800">{value.toFixed(2)}</span>
      {isLastColumn && rowLabel && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">{rowLabel}</span>
        </div>
      )}
    </motion.div>
  );
};