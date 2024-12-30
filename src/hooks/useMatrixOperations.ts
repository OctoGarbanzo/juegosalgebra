export const useMatrixOperations = () => {
  const swapRows = (matrix: number[][], row1: number, row2: number): number[][] => {
    const newMatrix = matrix.map(row => [...row]);
    [newMatrix[row1], newMatrix[row2]] = [newMatrix[row2], newMatrix[row1]];
    return newMatrix;
  };

  const scaleRow = (matrix: number[][], row: number, factor: number): number[][] => {
    const newMatrix = matrix.map(row => [...row]);
    newMatrix[row] = newMatrix[row].map(val => val * factor);
    return newMatrix;
  };

  const addRows = (matrix: number[][], sourceRow: number, targetRow: number, factor: number): number[][] => {
    const newMatrix = matrix.map(row => [...row]);
    newMatrix[targetRow] = newMatrix[targetRow].map(
      (val, i) => val + factor * newMatrix[sourceRow][i]
    );
    return newMatrix;
  };

  return {
    swapRows,
    scaleRow,
    addRows
  };
};