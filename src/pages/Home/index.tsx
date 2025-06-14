import { useHomeState } from '../../hooks/useHomeState';
import { TasksPanel } from './components/TasksPanel';
import { MetricsPanel } from './components/MetricsPanel';
import { DashboardHeader } from './components/DashboardHeader';

export default function Home() {
  const { storeAvailablePoints, storeShowFilters, storeTasks, storeMetrics } = useHomeState();

  return (
    <div className="home-container">
      <DashboardHeader />
      <div className="home-content">
        <div className="tasks-section">
          <TasksPanel
            tasks={storeTasks}
            storeAvailablePoints={storeAvailablePoints}
            storeShowFilters={storeShowFilters}
          />
        </div>
        <div className="metrics-section">
          <MetricsPanel metrics={storeMetrics} />
        </div>
      </div>
    </div>
  );
}
