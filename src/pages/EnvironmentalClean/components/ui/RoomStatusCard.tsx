import React from 'react';
import { motion } from 'framer-motion';
import Icon from '@mdi/react';
import { RoomStatusType } from '../../types';

interface RoomStatusCardProps {
  option: {
    id: RoomStatusType;
    label: string;
    color: string;
    icon: string;
  };
  count: number;
  isSelected: boolean;
  onClick: () => void;
  isLoading?: boolean;
}

const RoomStatusCard: React.FC<RoomStatusCardProps> = ({
  option,
  count,
  isSelected,
  onClick,
  isLoading = false
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={isLoading}
      className={`
        relative w-full p-4 rounded-lg border-2 transition-all
        ${isSelected ? 'border-[#4ECDC4] bg-[#4ECDC4] bg-opacity-5' : 'border-gray-200 hover:border-[#4ECDC4]'}
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div 
            className="p-2 rounded-full mr-3"
            style={{ backgroundColor: `${option.color}20` }}
          >
            <Icon 
              path={option.icon} 
              size={1} 
              style={{ color: option.color }}
            />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-medium text-gray-700">{option.label}</h3>
            <p className="text-2xl font-bold" style={{ color: option.color }}>
              {count}
            </p>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default RoomStatusCard; 