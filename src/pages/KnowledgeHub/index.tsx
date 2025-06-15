import React from 'react';
import { PageLayout } from '../../components/Layout/PageLayout';
import { useKnowledgeHubState } from '@/hooks/useKnowledgeHubState';
import KnowledgeHubContent from './components/KnowledgeHubContent';

const KnowledgeHub: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    showAchievementsModal: showAchievements,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setShowAchievementsModal: setShowAchievements,
  } = useKnowledgeHubState();

  return (
    <PageLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#5b5b5b] mb-1">Knowledge Hub</h1>
            <p className="text-gray-500 text-sm">
              Access training materials and educational resources
            </p>
          </div>
        </div>
        <KnowledgeHubContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </PageLayout>
  );
};

export default KnowledgeHub;
