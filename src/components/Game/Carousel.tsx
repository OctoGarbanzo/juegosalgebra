import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Matrix } from './Matrix';

interface Step {
  type: 'swap' | 'scale' | 'add';
  description: string;
  matrix: number[][];
}

interface CarouselProps {
  steps: Step[];
  currentStep: number;
  onPrevStep: () => void;
  onNextStep: () => void;
}

export const Carousel = ({ steps, currentStep, onPrevStep, onNextStep }: CarouselProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-2xl font-bold mb-4">Solution Steps</h3>
      <div className="flex items-center gap-4">
        <button
          onClick={onPrevStep}
          disabled={currentStep === 0}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1">
          <div className="text-lg mb-2">
            Step {currentStep + 1} of {steps.length}
          </div>
          <p className="text-gray-600">{steps[currentStep].description}</p>
          <div className="mt-4">
            <Matrix
              matrix={steps[currentStep].matrix}
              selectedRow={null}
              onCellClick={() => {}}
            />
          </div>
        </div>
        <button
          onClick={onNextStep}
          disabled={currentStep === steps.length - 1}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </motion.div>
  );
};