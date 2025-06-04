import React, { useState } from 'react';
import { PageLayout } from '../../components/Layout/PageLayout';
import ItemScannerCard from '../../components/Inventory/ItemScannerCard';
import InventoryInsightsCard from '../../components/Inventory/InventoryInsightsCard';
import CategoriesCard from '../../components/Inventory/CategoriesCard';
import InventoryManagementTable from '../../components/Inventory/InventoryManagementTable';
import { TabType } from './models';

const Inventory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('tools');

  const handleCategoryChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <PageLayout
      title="Inventory Management"
      description="Track and manage clinical tools and supplies"
    >
      <div className="flex flex-col">
        {/* Header row with ItemScannerCard aligned right */}
        <div className="flex justify-end -mt-20 mr-4 mb-6">
          <ItemScannerCard />
        </div>

        {/* Main content area */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col gap-6 lg:w-1/4 pl-4">
            <InventoryInsightsCard />
            <CategoriesCard onCategoryChange={handleCategoryChange} />
          </div>
          <div className="flex-1">
            <InventoryManagementTable activeTab={activeTab} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Inventory;
