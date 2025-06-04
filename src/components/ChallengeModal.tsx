import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@mdi/react';
import {
  mdiTarget,
  mdiClose,
  mdiClockOutline,
  mdiLightbulbOutline,
  mdiCogOutline,
  mdiShieldCheckOutline,
  mdiAccountGroupOutline,
  mdiCheckCircleOutline,
  mdiStarOutline,
} from '@mdi/js';

export type ChallengeCategory = 'knowledge' | 'process' | 'quality' | 'collaboration' | 'daily';
export type ChallengeDifficulty = 'easy' | 'medium' | 'hard';
export type ChallengeStatus = 'pending' | 'completed' | 'all';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  difficulty: ChallengeDifficulty;
  points: number;
  timeEstimate: string;
  completed: boolean;
}

export interface CategoryOption {
  id: ChallengeCategory;
  icon: string;
  label: string;
}

export interface DifficultyOption {
  id: ChallengeDifficulty;
  label: string;
  color: string;
}

export interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChallengeComplete: (points: number) => void;
}

const categoryIcons: Record<ChallengeCategory, string> = {
  knowledge: mdiLightbulbOutline,
  process: mdiCogOutline,
  quality: mdiShieldCheckOutline,
  collaboration: mdiAccountGroupOutline,
  daily: mdiClockOutline,
  team: mdiAccountGroupOutline,
};

const categoryColors: Record<ChallengeCategory, string> = {
  knowledge: 'bg-blue-100 text-blue-800',
  process: 'bg-purple-100 text-purple-800',
  quality: 'bg-green-100 text-green-800',
  collaboration: 'bg-orange-100 text-orange-800',
  daily: 'bg-gray-100 text-gray-800',
  team: 'bg-pink-100 text-pink-800',
};

const difficultyColors: Record<ChallengeDifficulty, string> = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800',
};

const ChallengeModal: React.FC<ChallengeModalProps> = ({
  isOpen,
  onClose,
  onChallengeComplete,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<ChallengeDifficulty | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<ChallengeStatus>('pending');
  const [sampleChallenges, setSampleChallenges] = useState<Challenge[]>([]);

  // Load and generate challenges based on real work data
  useEffect(() => {
    const generateChallenges = async () => {
      try {
        // Generate challenges based on real work data
        const newChallenges: Challenge[] = [
          {
            id: '1',
            title: 'Complete Daily Tasks',
            description: 'Complete all assigned tasks for the day',
            category: 'daily' as ChallengeCategory,
            difficulty: 'easy',
            points: 50,
            timeEstimate: '2 hours',
            completed: false,
          },
          {
            id: '2',
            title: 'Team Collaboration',
            description: 'Participate in team meetings and discussions',
            category: 'team' as ChallengeCategory,
            difficulty: 'medium',
            points: 100,
            timeEstimate: '4 hours',
            completed: false,
          },
          {
            id: 'challenge-001',
            title: 'Sterilization Sprint',
            description: 'Complete sterilization for 10 tools',
            category: 'process',
            difficulty: 'easy',
            points: 50,
            timeEstimate: '5 minutes',
            completed: false,
          },
          {
            id: 'challenge-002',
            title: 'Inventory Master',
            description: 'Update inventory counts for 5 high-priority items',
            category: 'quality',
            difficulty: 'medium',
            points: 75,
            timeEstimate: '10 minutes',
            completed: false,
          },
          {
            id: 'challenge-003',
            title: 'Deep Clean Champion',
            description: 'Complete a thorough cleaning of the sterilization area',
            category: 'collaboration',
            difficulty: 'easy',
            points: 50,
            timeEstimate: '5 minutes',
            completed: false,
          },
          {
            id: 'challenge-004',
            title: 'Process Optimization',
            description: 'Identify and implement one process improvement',
            category: 'process',
            difficulty: 'hard',
            points: 100,
            timeEstimate: '15 minutes',
            completed: false,
          },
        ];

        // Check localStorage for completed challenges
        const storedChallenges = localStorage.getItem('completedChallenges');
        if (storedChallenges) {
          const completedIds = JSON.parse(storedChallenges);
          newChallenges.forEach(challenge => {
            if (completedIds.includes(challenge.id)) {
              challenge.completed = true;
            }
          });
        }

        setSampleChallenges(newChallenges);
      } catch (error) {
        console.error('Error generating challenges:', error);
      }
    };

    generateChallenges();
  }, []);

  const categories = [
    { id: 'knowledge', icon: mdiLightbulbOutline, label: 'Knowledge' },
    { id: 'process', icon: mdiCogOutline, label: 'Process' },
    { id: 'quality', icon: mdiShieldCheckOutline, label: 'Quality' },
    { id: 'collaboration', icon: mdiAccountGroupOutline, label: 'Collaboration' },
    { id: 'daily', icon: mdiClockOutline, label: 'Daily' },
    { id: 'team', icon: mdiAccountGroupOutline, label: 'Team' },
  ];

  const difficulties = [
    { id: 'easy', label: 'Easy', color: 'text-green-500' },
    { id: 'medium', label: 'Medium', color: 'text-yellow-500' },
    { id: 'hard', label: 'Hard', color: 'text-red-500' },
  ];

  const filteredChallenges = sampleChallenges.filter(challenge => {
    const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'pending' && !challenge.completed) ||
      (selectedStatus === 'completed' && challenge.completed);
    return matchesCategory && matchesDifficulty && matchesStatus;
  });

  const handleCompleteChallenge = (challenge: Challenge) => {
    // Update challenge completion status
    const updatedChallenges = sampleChallenges.map(c =>
      c.id === challenge.id ? { ...c, completed: true } : c
    );
    setSampleChallenges(updatedChallenges);

    // Store completed challenge in localStorage
    const completedIds = updatedChallenges.filter(c => c.completed).map(c => c.id);
    localStorage.setItem('completedChallenges', JSON.stringify(completedIds));

    // Add points to total score
    onChallengeComplete(challenge.points);
  };

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
            className="bg-white p-6 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto scrollbar-hide"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="p-3 bg-[#4ECDC4] rounded-xl">
                  <Icon path={mdiTarget} size={1} className="text-white" />
                </div>
                <h2 className="ml-3 text-xl font-bold text-[#5b5b5b]">Challenges</h2>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <Icon path={mdiClose} size={1} />
              </button>
            </div>

            {/* Filters Row */}
            <div className="mb-6 flex gap-4">
              {/* Categories */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">Category</h3>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value as ChallengeCategory | 'all')}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">Difficulty</h3>
                <select
                  value={selectedDifficulty}
                  onChange={e =>
                    setSelectedDifficulty(e.target.value as ChallengeDifficulty | 'all')
                  }
                  className="w-full p-2 border rounded-lg bg-white"
                >
                  <option value="all">All Difficulties</option>
                  {difficulties.map(difficulty => (
                    <option key={difficulty.id} value={difficulty.id}>
                      {difficulty.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">Status</h3>
                <select
                  value={selectedStatus}
                  onChange={e => setSelectedStatus(e.target.value as ChallengeStatus)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] focus:border-transparent"
                >
                  <option value="all">All Challenges</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Challenges List */}
            <div className="space-y-4">
              {filteredChallenges.map(challenge => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`relative p-6 rounded-lg shadow-md transition-all duration-300 ${
                    challenge.completed ? 'bg-gray-50 opacity-75' : 'bg-white hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${categoryColors[challenge.category]}`}>
                        <Icon path={categoryIcons[challenge.category]} size={1} />
                      </div>
                      <div>
                        <h3
                          className={`text-lg font-semibold ${
                            challenge.completed ? 'text-gray-500' : 'text-gray-900'
                          }`}
                        >
                          {challenge.title}
                        </h3>
                        <p
                          className={`text-sm ${
                            challenge.completed ? 'text-gray-400' : 'text-gray-600'
                          } mt-1`}
                        >
                          {challenge.description}
                        </p>
                      </div>
                    </div>
                    {challenge.completed && (
                      <div className="text-green-500">
                        <Icon path={mdiCheckCircleOutline} size={1.5} />
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          challenge.completed
                            ? 'bg-gray-100 text-gray-500'
                            : difficultyColors[challenge.difficulty]
                        }`}
                      >
                        {challenge.difficulty.charAt(0).toUpperCase() +
                          challenge.difficulty.slice(1)}
                      </div>
                      <div
                        className={`flex items-center ${
                          challenge.completed ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        <Icon path={mdiClockOutline} size={0.8} className="mr-1" />
                        <span className="text-sm">{challenge.timeEstimate}</span>
                      </div>
                      <div
                        className={`flex items-center ${
                          challenge.completed ? 'text-gray-400' : 'text-yellow-600'
                        }`}
                      >
                        <Icon path={mdiStarOutline} size={0.8} className="mr-1" />
                        <span className="text-sm font-medium">{challenge.points} points</span>
                      </div>
                    </div>
                    {!challenge.completed && (
                      <button
                        onClick={() => handleCompleteChallenge(challenge)}
                        className="px-4 py-2 bg-[#4ECDC4] text-white rounded-md hover:bg-[#3dbdb4] transition-colors"
                      >
                        Complete Challenge
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChallengeModal;
