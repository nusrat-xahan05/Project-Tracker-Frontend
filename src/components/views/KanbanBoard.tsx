import { useMemo } from 'react';
import TaskCard from '../ui/TaskCard';
import { STATUSES, type ITask, type TStatus } from '../../types';


export default function KanbanBoard({ tasks }: { tasks: ITask[] }) {
    // Status for the columns
    const groupedTasks = useMemo(() => {
        const groups: Record<TStatus, ITask[]> = {
            'To Do': [],
            'In Progress': [],
            'In Review': [],
            'Done': [],
        };
        tasks.forEach(task => groups[task.status].push(task));
        return groups;
    }, [tasks]);

    return (
        <div className="grid grid-cols-4 gap-4 pb-2 h-full">
            {STATUSES.map((status) => (
                <div key={status} className="bg-gray-100 rounded-xl flex flex-col h-full">
                    {/* Column Header */}
                    <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-gray-100/80 backdrop-blur rounded-t-xl z-10 sticky top-0">
                        <h3 className="font-bold text-gray-700 text-sm">{status}</h3>
                        <span className="bg-gray-200 text-gray-600 text-xs py-0.5 px-2 rounded-full font-medium">
                            {groupedTasks[status].length}
                        </span>
                    </div>

                    {/* Column Body */}
                    <div className="p-2 flex-1 overflow-y-auto flex flex-col gap-2">
                        {groupedTasks[status].map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}

                        {groupedTasks[status].length === 0 && (
                            <div className="text-center text-gray-400 text-sm py-10 border-2 border-dashed border-gray-200 rounded-lg m-2">
                                No tasks
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
