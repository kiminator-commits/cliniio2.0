import React, { useState } from 'react';
import Icon from '@mdi/react';
import {
  mdiClipboardList,
  mdiFileDocument,
  mdiClose,
  mdiTools,
  mdiAccountGroup,
  mdiCalendarWeek,
  mdiOfficeBuilding,
  mdiBroom,
} from '@mdi/js';

interface Category {
  id: string;
  title: string;
  iconColor: string;
  icon: string;
}

const categories: Category[] = [
  { id: 'setup', title: 'Setup/Take Down', iconColor: '#FF6B6B', icon: mdiTools },
  { id: 'patient', title: 'Per Patient', iconColor: '#4ECDC4', icon: mdiAccountGroup },
  { id: 'weekly', title: 'Weekly', iconColor: '#45B7D1', icon: mdiCalendarWeek },
  { id: 'public', title: 'Public Spaces', iconColor: '#96CEB4', icon: mdiOfficeBuilding },
  { id: 'deep', title: 'Deep Clean', iconColor: '#FF9F1C', icon: mdiBroom },
];

const CleaningChecklists: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleCategoryClick = category => {
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border-l-4 border-[#4ECDC4]">
      <div className="flex space-x-4 mb-6 border-b">
        <button className="pb-2 px-1 font-medium text-[#5b5b5b] border-b-2 border-[#4ECDC4] flex items-center">
          <Icon path={mdiClipboardList} size={1.1} color="#4ECDC4" className="mr-2" />
          Cleaning Checklists
        </button>
        <button className="pb-2 px-1 font-medium text-gray-500 hover:text-gray-700 flex items-center">
          <Icon path={mdiFileDocument} size={1.1} color="#4ECDC4" className="mr-2" />
          SDS Sheets
        </button>
      </div>

      <div className="flex gap-4 flex-wrap">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm transition-all min-h-[64px] flex-1 hover:bg-gray-100 min-w-[200px]"
          >
            <div
              className="p-2 rounded-full bg-opacity-10 flex-shrink-0 mr-3"
              style={{ backgroundColor: `${category.iconColor}20` }}
            >
              <Icon path={category.icon} size={1.2} color={category.iconColor} />
            </div>
            <div className="flex-grow text-left">
              <h3 className="font-medium text-[#5b5b5b] text-base">{category.title}</h3>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#5b5b5b]">{selectedCategory.title}</h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Icon path={mdiClose} size={1.2} color="#5b5b5b" />
              </button>
            </div>
            <div className="space-y-4">
              {/* Add your checklist items here */}
              <p className="text-gray-500">Checklist items will be displayed here...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CleaningChecklists;
