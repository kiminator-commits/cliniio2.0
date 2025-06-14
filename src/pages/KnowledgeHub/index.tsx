import React from 'react';
import { PageLayout } from '../../components/Layout/PageLayout';

const KnowledgeHub: React.FC = () => {
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
        {/* Add your knowledge hub-specific content here */}
      </div>
    </PageLayout>
  );
};

export default KnowledgeHub;
