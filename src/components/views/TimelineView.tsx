import { useMemo } from 'react';
import Avatar from '../ui/Avatar';
import type { ITask } from '../../types';

const getPriorityColors = (priority: string) => {
    switch (priority) {
        case 'Critical': return 'bg-red-500 border-red-600';
        case 'High': return 'bg-orange-500 border-orange-600';
        case 'Medium': return 'bg-blue-500 border-blue-600';
        case 'Low': return 'bg-emerald-500 border-emerald-600';
        default: return 'bg-blue-500 border-blue-600';
    }
};

export default function TimelineView({ tasks }: { tasks: ITask[] }) {
    // Finds the task dates range
    const { startDate, endDate, datesArr } = useMemo(() => {
        const allDates = tasks.flatMap(t => [
            new Date(t.dueDate).getTime(),
            t.startDate ? new Date(t.startDate).getTime() : new Date(t.dueDate).getTime()
        ]);

        const minDate = new Date(Math.min(...allDates));
        const start = new Date(minDate.getFullYear(), minDate.getMonth(), 1);

        const maxDate = new Date(Math.max(...allDates));
        const end = new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0);

        const diffTime = Math.abs(end.getTime() - start.getTime());
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        const datesArr = Array.from({ length: totalDays }).map((_, i) => {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            return d;
        });

        return { startDate: start, endDate: end, datesArr };
    }, [tasks]);

    const getPositionPercent = (dateStr: string) => {
        const taskDate = new Date(dateStr).getTime();
        const startTime = startDate.getTime();
        const endTime = endDate.getTime();
        return ((taskDate - startTime) / (endTime - startTime)) * 100;
    };

    return (
        <div className="flex flex-col h-screen max-h-screen bg-white border border-gray-200 rounded-lg overflow-hidden">

            {/* Priority Scale - Table Header*/}
            <div className="flex items-center gap-4 p-3 bg-gray-50 border-b border-gray-200 text-xs font-medium z-50">
                <span className="text-gray-500 mr-2 uppercase tracking-wider">Priority Scale:</span>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span> Critical</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500"></span> High</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Medium</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Low</div>
                <div className="ml-auto text-gray-400">Total Days: {datesArr.length}</div>
            </div>

            {/* Main Viewport (Double Axis Scrolling) */}
            <div className="overflow-auto flex-1 relative bg-white">
                <div style={{ minWidth: `${(datesArr.length * 40) + 224}px` }} className="relative flex flex-col min-h-full">

                    {/* Dates Header Row */}
                    <div className="sticky top-0 z-40 flex bg-white border-b border-gray-200 shadow-sm">
                        
                        <div className="w-48 shrink-0 border-r border-gray-200 p-4 font-bold text-gray-700 bg-gray-50 sticky left-0 z-50">
                            Task Details
                        </div>

                        {/* Dates Array */}
                        <div className="flex flex-1">
                            {datesArr.map((date, i) => {
                                const isFirstOfMonth = date.getDate() === 1;
                                return (
                                    <div key={i} className="w-10 shrink-0 border-r border-gray-100 text-center py-2 flex flex-col items-center justify-center bg-white">
                                        {isFirstOfMonth && (
                                            <span className="absolute -top-1 text-[10px] font-black text-blue-600 uppercase">
                                                {date.toLocaleDateString('en-US', { month: 'short' })}
                                            </span>
                                        )}
                                        
                                        <span className="text-[9px] text-gray-500 uppercase font-semibold">
                                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                        </span>
                                        <span className="text-xs font-bold text-gray-700">{date.getDate()}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* TASK ROWS BODY */}
                    <div className="flex flex-col relative z-0">
                        {tasks.map((task) => {
                            const hasStart = !!task.startDate;
                            const left = getPositionPercent(task.startDate || task.dueDate);
                            const right = getPositionPercent(task.dueDate);
                            const width = Math.max(right - left, 1);
                            const colors = getPriorityColors(task.priority);

                            return (
                                <div key={task.id} className="flex border-b border-gray-50 hover:bg-blue-50/30 transition-colors group relative">

                                    {/* Task Info Sidebar (Sticky Left) */}
                                    <div className="w-48 shrink-0 border-r border-gray-200 p-3 flex gap-3 items-center bg-white sticky left-0 z-30 group-hover:bg-blue-50/10 transition-colors">
                                        <Avatar name={task.assignee} />
                                        <div className="min-w-0">
                                            <p className="text-[11px] font-bold text-gray-800 truncate" title={task.title}>{task.title}</p>
                                            <p className="text-[9px] text-gray-400 font-medium">{task.priority}</p>
                                        </div>
                                    </div>

                                    {/* Bar AREA */}
                                    <div className="flex-1 relative h-12 flex items-center">
                                        {hasStart ? (
                                            <div
                                                title={`Task: ${task.title}\nStatus: ${task.status}\nPriority: ${task.priority}`}
                                                className={`absolute h-6 rounded border shadow-sm flex items-center px-2 transition-all hover:brightness-110 hover:shadow-md cursor-help z-10 ${colors} text-white overflow-hidden`}
                                                style={{ left: `${left}%`, width: `${width}%` }}>
                                                <span className="text-[9px] font-bold truncate tracking-wide">
                                                    {task.status}
                                                </span>
                                            </div>
                                        ) : (
                                            <div
                                                title={`Deadline\nTask: ${task.title}\nStatus: ${task.status}`}
                                                className={`absolute w-4 h-4 rotate-45 border shadow-sm cursor-help z-10 -ml-2 ${colors} hover:scale-125 transition-transform`}
                                                style={{ left: `${left}%` }}
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}