import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@mdi/react';
import { mdiChartLine, mdiClose } from '@mdi/js';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  gamificationData: {
    stats: {
      toolsSterilized: number;
      inventoryChecks: number;
      perfectDays: number;
      totalTasks: number;
      completedTasks: number;
      currentStreak: number;
      bestStreak: number;
    };
  };
}

const StatsModal: React.FC<StatsModalProps> = ({ isOpen, onClose, gamificationData }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="p-3 bg-[#4ECDC4] rounded-xl">
                  <Icon path={mdiChartLine} size={1} className="text-white" />
                </div>
                <h2 className="ml-3 text-xl font-bold text-[#5b5b5b]">Cumulative Stats</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-2 min-h-[44px] flex items-center justify-center rounded-lg"
              >
                <Icon path={mdiClose} size={1} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-[#4ECDC4] bg-opacity-10 p-4 rounded-xl">
                <div className="mb-1 text-[#4ECDC4] font-semibold">Tools Sterilized</div>
                <div className="text-3xl font-bold text-[#4ECDC4]">
                  {gamificationData.stats.toolsSterilized}
                </div>
                <div className="text-xs text-[#4ECDC4] mt-1">That's impressive!</div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="mb-1 text-blue-600 font-semibold">Inventory Checks</div>
                <div className="text-3xl font-bold text-blue-700">
                  {gamificationData.stats.inventoryChecks}
                </div>
                <div className="text-xs text-blue-500 mt-1">Always organized!</div>
              </div>

              <div className="bg-green-50 p-4 rounded-xl">
                <div className="mb-1 text-green-600 font-semibold">Perfect Days</div>
                <div className="text-3xl font-bold text-green-700">
                  {gamificationData.stats.perfectDays}
                </div>
                <div className="text-xs text-green-500 mt-1">Zero errors!</div>
              </div>

              <div className="bg-purple-50 p-4 rounded-xl">
                <div className="mb-1 text-purple-600 font-semibold">Task Completion</div>
                <div className="text-3xl font-bold text-purple-700">
                  {Math.round(
                    (gamificationData.stats.completedTasks / gamificationData.stats.totalTasks) *
                      100
                  )}
                  %
                </div>
                <div className="text-xs text-purple-500 mt-1">
                  {gamificationData.stats.completedTasks} / {gamificationData.stats.totalTasks}{' '}
                  tasks completed
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-xl">
                <div className="mb-1 text-amber-600 font-semibold">Current Streak</div>
                <div className="text-3xl font-bold text-amber-700">
                  {gamificationData.stats.currentStreak}
                </div>
                <div className="text-xs text-amber-500 mt-1">
                  Best streak: {gamificationData.stats.bestStreak}
                </div>
              </div>
            </div>

            {/* <p className="text-sm text-gray-500">
              Here's your impact and progress for today.
            </p> */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StatsModal;
