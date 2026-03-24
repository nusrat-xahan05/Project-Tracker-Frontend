import { useEffect, useState } from 'react';
import { useTaskStore } from './store/useTaskDataStore';
import type { TViewMode } from './types';
import KanbanBoard from './components/views/KanbanBoard';


function App() {
  const { tasks, initializeTasks } = useTaskStore();
  const [activeView, setActiveView] = useState<TViewMode>('Kanban');

  // Initialize the 500 tasks on first load
  useEffect(() => {
    initializeTasks();
  }, [initializeTasks]);


  // Basic Loading State 
  if (tasks.length === 0) return <div className="p-10 text-center">Loading board...</div>;


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-20">
        <div>
          <h1 className="text-xl font-bold">Project Management Tool</h1>
        </div>


        {/* View Switcher */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
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


      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden p-6 flex flex-col">
        <div className="bg-white border rounded-xl flex-1 p-4 shadow-sm overflow-hidden flex flex-col">
          <h2 className="text-lg font-semibold mb-4">{activeView} View Active</h2>
          {activeView === 'Kanban' && <KanbanBoard tasks={tasks} />}
        </div>
      </main>
    </div>
  );
}

export default App;