import { useState } from 'react';

interface ModalConfig {
  isOpen: boolean;
  type: 'scale' | 'add';
  title: string;
  description: string;
  onConfirm: (value: number) => void;
}

export const useGameState = (initialMatrix: number[][]) => {
  const [matrix, setMatrix] = useState(initialMatrix);
  const [moves, setMoves] = useState(0);
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    isOpen: false,
    type: 'scale',
    title: '',
    description: '',
    onConfirm: () => {},
  });

  return {
    matrix,
    setMatrix,
    moves,
    setMoves,
    modalConfig,
    setModalConfig
  };
};