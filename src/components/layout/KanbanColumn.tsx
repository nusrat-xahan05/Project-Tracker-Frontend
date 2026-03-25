import type { IDragState } from '../../hooks/useKanbanDrag';
import type { ITask, TStatus } from '../../types';
import TaskCard from '../ui/TaskCard';


interface KanbanColumnProps {
    status: TStatus;
    tasks: ITask[];
    drag: IDragState | null;
    startDrag: (e: React.PointerEvent<HTMLDivElement>, task: ITask) => void;
}

export default function KanbanColumn({ status, tasks, drag, startDrag }: KanbanColumnProps) {
    // Check if the column is hovered for dragged card
    const isHovered = drag?.hoveredColumn === status && drag.activeTask?.status !== status;

    return (
        <div data-status={status}
            className={`rounded-xl flex flex-col min-w-75 max-w-75 h-full transition-colors border-2 ${isHovered ? 'bg-blue-50/50 border-blue-400 border-dashed' : 'bg-gray-100 border-transparent'
                }`}>
            {/* Column Header - Task Status */}
            <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-gray-100/80 backdrop-blur rounded-t-xl z-10 sticky top-0">
                <h3 className="font-bold text-gray-700 text-sm">{status}</h3>
                <span className="bg-gray-200 text-gray-600 text-xs py-0.5 px-2 rounded-full font-medium">
                    {tasks.length}
                </span>
            </div>

            {/* Column Body */}
            <div className="p-2 flex-1 overflow-y-auto flex flex-col gap-2">
                {tasks.map(task => {
                    const isBeingDragged = drag?.activeTask?.id === task.id;

                    if (isBeingDragged) {
                        return (
                            <div
                                key={`placeholder-${task.id}`}
                                style={{ height: drag.initialRect?.height }}
                                className="bg-gray-200/50 rounded-lg border-2 border-dashed border-gray-300" />
                        );
                    }

                    return (
                        <div
                            key={task.id}
                            onPointerDown={(e) => startDrag(e, task)}
                            className="touch-none cursor-grab active:cursor-grabbing">
                            <TaskCard task={task} />
                        </div>
                    );
                })}

                {/* Handle Empty State */}
                {tasks.length === 0 && !isHovered && (
                    <div className="text-center text-gray-400 text-sm py-10 border-2 border-dashed border-gray-200 rounded-lg m-2">
                        Drop tasks here
                    </div>
                )}
            </div>
        </div>
    );
}