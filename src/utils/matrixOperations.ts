// Matrix operations utility functions
export const swapRows = (matrix: number[][], row1: number, row2: number): number[][] => {
  const newMatrix = matrix.map(row => [...row]);
  [newMatrix[row1], newMatrix[row2]] = [newMatrix[row2], newMatrix[row1]];
  return newMatrix;
};

export const scaleRow = (matrix: number[][], row: number, factor: number): number[][] => {
  const newMatrix = matrix.map(row => [...row]);
  newMatrix[row] = newMatrix[row].map(val => val * factor);
  return newMatrix;
};

export const addRows = (matrix: number[][], sourceRow: number, targetRow: number, factor: number): number[][] => {
  const newMatrix = matrix.map(row => [...row]);
  newMatrix[targetRow] = newMatrix[targetRow].map((val, i) => val + factor * newMatrix[sourceRow][i]);
  return newMatrix;
};

export const generateGaussJordanSteps = (matrix: number[][]): Step[] => {
  const steps: Step[] = [];
  const m = matrix.map(row => [...row]);
  const rows = m.length;
  const cols = m[0].length;

  for (let i = 0; i < rows; i++) {
    // Find pivot
    let pivot = m[i][i];
    if (pivot === 0) {
      // Find non-zero pivot
      for (let j = i + 1; j < rows; j++) {
        if (m[j][i] !== 0) {
          steps.push({
            type: 'swap',
            description: `Swap rows ${i + 1} and ${j + 1}`,
            matrix: swapRows(m, i, j)
          });
          [m[i], m[j]] = [m[j], m[i]];
          pivot = m[i][i];
          break;
        }
      }
    }

    // Scale row to make pivot 1
    if (pivot !== 1) {
      const factor = 1 / pivot;
      steps.push({
        type: 'scale',
        description: `Scale row ${i + 1} by ${factor.toFixed(2)}`,
        matrix: scaleRow(m, i, factor)
      });
      m[i] = m[i].map(val => val * factor);
    }

    // Eliminate column
    for (let j = 0; j < rows; j++) {
      if (j !== i && m[j][i] !== 0) {
        const factor = -m[j][i];
        steps.push({
          type: 'add',
          description: `Add ${factor.toFixed(2)} times row ${i + 1} to row ${j + 1}`,
          matrix: addRows(m, i, j, factor)
        });
        m[j] = m[j].map((val, k) => val + factor * m[i][k]);
      }
    }
  }

  return steps;
};