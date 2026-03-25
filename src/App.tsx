import { useEffect, useMemo, useState } from 'react';
import { useTaskStore } from './store/useTaskDataStore';
import type { TViewMode } from './types';
import ListView from './components/views/ListView';
import { useUrlFilters } from './hooks/useUrlFilters';
import FilterBar from './components/layout/FilterBar';
import TimelineView from './components/views/TimelineView';
import KanbanBoard from './components/views/KanbanBoard';
import logo from './assets/velozity-logo.png';

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
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-60">
        <div>
          <img src={logo} alt="" />
        </div>

        <div className='pt-5'>
          <h1 className="text-xl font-bold">Project Management Tool</h1>
        </div>

        {/* View Switcher */}
        <div className="flex bg-gray-100 p-1 rounded-lg mt-5">
          {['Kanban', 'List', 'Timeline'].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view as TViewMode)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeView === view ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              {view}
            </button>
          ))}
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
      <main className="flex-1 overflow-hidden p-6 flex flex-col">
        <div className="bg-white border rounded-xl flex-1 p-4 shadow-sm overflow-hidden flex flex-col">
          <h2 className="text-lg font-semibold mb-4">{activeView} View Active</h2>
          {/* {activeView === 'Kanban' && <KanbanBoard tasks={filteredTasks} />} */}
          {activeView === 'Kanban' && (
            <KanbanBoard 
                tasks={filteredTasks} 
                // onUpdateStatus={updateTaskStatus} 
            />
          )}
          {activeView === 'List' && <ListView tasks={filteredTasks} />}
          {activeView === 'Timeline' && <TimelineView tasks={filteredTasks} />}
        </div>
      </main>
    </div>
  );
}

export default App;