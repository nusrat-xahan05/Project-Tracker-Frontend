import { useMemo } from 'react';
import TaskCard from '../ui/TaskCard';
import { useKanbanDrag } from '../../hooks/useKanbanDrag';
import { STATUSES, type ITask, type TStatus } from '../../types';
import KanbanColumn from '../layout/KanbanColumn';


export default function KanbanBoard({ tasks }: { tasks: ITask[] }) {
    const { drag, startDrag } = useKanbanDrag();

    // Status for the columns
    const groupedTasks = useMemo(() => {
        const groups: Record<TStatus, ITask[]> = {
            'To Do': [],
            'In Progress': [],
            'In Review': [],
            'Done': []
        };
        tasks.forEach(task => groups[task.status].push(task));
        return groups;
    }, [tasks]);

    return (
        <div className="flex-1 flex gap-4 overflow-x-auto pb-2 h-screen max-h-screen relative select-none touch-none">

            {/* Columns Header */}
            {STATUSES.map((status) => (
                <KanbanColumn
                    key={status}
                    status={status}
                    tasks={groupedTasks[status]}
                    drag={drag}
                    startDrag={startDrag}
                />
            ))}

            {/* Main Content - Body */}
            {drag?.activeTask && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: drag.initialRect?.width,
                        transform: `translate3d(${drag.currentOffset.x}px, ${drag.currentOffset.y}px, 0)`,
                        pointerEvents: 'none',
                        zIndex: 9999,
                        transition: drag.isReturning ? 'transform 0.3s cubic-bezier(0.2, 0, 0, 1)' : 'none',
                    }}
                    className="opacity-90 shadow-2xl rotate-2">
                    <TaskCard task={drag.activeTask} />
                </div>
            )}
        </div>
    );
}