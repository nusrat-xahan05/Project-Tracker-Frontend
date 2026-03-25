import { useEffect, useMemo, useState } from 'react';
import { useTaskStore } from './store/useTaskDataStore';
import type { TViewMode } from './types';
import ListView from './components/views/ListView';
import { useUrlFilters } from './hooks/useUrlFilters';
import FilterBar from './components/layout/FilterBar';
import TimelineView from './components/views/TimelineView';
import KanbanBoard from './components/views/KanbanBoard';
import logo from './assets/velozity-logo.png';
import LiveCollaborators from './components/ui/LiveCollaborators';

function App() {
  const { tasks, initializeTasks } = useTaskStore();
  const { filters, updateFilters, clearAllFilters, hasActiveFilters } = useUrlFilters();
  const [activeView, setActiveView] = useState<TViewMode>('Kanban');

  // Initialize the 500 tasks on first load
  useEffect(() => {
    initializeTasks();
  }, [initializeTasks]);

  // Filter the tasks based on URL state
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchStatus = filters.status.length === 0 || filters.status.includes(task.status);
      const matchPriority = filters.priority.length === 0 || filters.priority.includes(task.priority);
      const matchAssignee = filters.assignee.length === 0 || filters.assignee.includes(task.assignee);

      const matchDateFrom = !filters.dateFrom || new Date(task.dueDate) >= new Date(filters.dateFrom);
      const matchDateTo = !filters.dateTo || new Date(task.dueDate) <= new Date(filters.dateTo);

      return matchStatus && matchPriority && matchAssignee && matchDateFrom && matchDateTo;
    });
  }, [tasks, filters]);

  // Basic Loading State 
  if (tasks.length === 0) return <div className="p-10 text-center">Loading board...</div>;

  return (
    <div className="max-w-384 mx-auto min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-400 px-6 py-4 flex gap-3 justify-between lg:items-center items-start sticky top-0 z-60">
        <div className='w-1/3'>
          <img src={logo} alt="Velozity Logo" />
        </div>

        <div className='w-1/3 lg:mt-5'>
          <h1 className="text-2xl font-bold text-red-600 text-center">Project Tracker Dashboard</h1>
        </div>

        <div className='w-1/3 flex flex-col lg:flex-row items-end lg:justify-end lg:items-center gap-3 lg:mt-5'>
          <LiveCollaborators />

          {/* View Switcher */}
          <div className="flex bg-red-500 p-1 rounded-lg w-fit">
            {['Kanban', 'List', 'Timeline'].map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view as TViewMode)}
                className={`px-4 py-2 cursor-pointer rounded-md text-sm font-medium transition-colors ${activeView === view ? 'bg-white shadow text-red-700' : 'text-white hover:text-gray-950'
                  }`}>
                {view}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Filter Bar Component */}
      <FilterBar
        filters={filters}
        updateFilters={updateFilters}
        clearAllFilters={clearAllFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden p-6 flex flex-col bg-red-50">
        <div className="bg-white border rounded-xl flex-1 p-4 shadow-sm overflow-hidden flex flex-col">
          <h2 className="text-base italic font-semibold mb-4 underline">{activeView} View Active: </h2>
          {activeView === 'Kanban' && <KanbanBoard tasks={filteredTasks} />}
          {activeView === 'List' && <ListView tasks={filteredTasks} />}
          {activeView === 'Timeline' && <TimelineView tasks={filteredTasks} />}
        </div>
      </main>
    </div>
  );
}

export default App;