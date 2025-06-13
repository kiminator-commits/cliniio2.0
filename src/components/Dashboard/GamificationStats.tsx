import { motion } from 'framer-motion';
import { FaFire, FaChartLine, FaTrophy } from 'react-icons/fa';

interface GamificationData {
  streak: number;
  level: number;
  rank: number;
  totalScore: number;
}

interface GamificationStatsProps {
  gamificationData: GamificationData;
}

export const GamificationStats = ({ gamificationData }: GamificationStatsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-4 mb-6 border-l-4 border-[#4ECDC4] border-opacity-50"
      aria-label="Clinic Efficiency Summary"
      aria-live="polite"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Current Streak */}
        <div className="flex items-center p-2">
          <div className="p-3 bg-[#4ECDC4] bg-opacity-10 rounded-full">
            <FaFire size={24} className="text-[#4ECDC4]" />
          </div>
          <div className="ml-3">
            <h2 className="text-sm font-semibold text-[#1e293b]">Current Streak</h2>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-[#4ECDC4]">{gamificationData.streak}</span>
              <span className="ml-1 text-gray-600 text-sm">days</span>
            </div>
          </div>
        </div>

        {/* Level */}
        <div className="flex items-center p-2">
          <div className="p-3 bg-[#4ECDC4] bg-opacity-10 rounded-full">
            <FaChartLine size={24} className="text-[#4ECDC4]" />
          </div>
          <div className="ml-3">
            <h2 className="text-sm font-semibold text-[#1e293b]">Level</h2>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-[#4ECDC4]">{gamificationData.level}</span>
              <div className="ml-2 px-2 py-1 bg-blue-100 rounded-full animate-[pulse_2s_ease-in-out_infinite]">
                <span className="text-xs font-semibold text-blue-600">
                  Top {gamificationData.rank}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Total Points */}
        <div className="flex items-center p-2">
          <div className="p-3 bg-[#4ECDC4] bg-opacity-10 rounded-full">
            <FaTrophy size={24} className="text-[#4ECDC4]" />
          </div>
          <div className="ml-3">
            <h2 className="text-sm font-semibold text-[#1e293b]">Points</h2>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-[#4ECDC4]">
                {gamificationData.totalScore}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
