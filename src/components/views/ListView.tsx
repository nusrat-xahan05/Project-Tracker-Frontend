import { useState, useMemo, useRef, type UIEvent } from 'react';
import PriorityBadge from '../ui/PriorityBadge';
import Avatar from '../ui/Avatar';
import type { ITask, TPriority } from '../../types';
import type { TsortOrder, TsortField } from '../../types/sort';


const priorityWeight: Record<TPriority, number> = {
    Critical: 4,
    High: 3,
    Medium: 2,
    Low: 1,
};

export default function ListView({ tasks }: { tasks: ITask[] }) {
    const [sortKey, setSortKey] = useState<TsortField>('dueDate');
    const [sortDir, setSortDir] = useState<TsortOrder>('asc');

    const handleSort = (key: TsortField) => {
        if (sortKey === key) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
    };

    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => {
            let comparison = 0;
            if (sortKey === 'title') {
                comparison = a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' });
            } else if (sortKey === 'priority') {
                comparison = priorityWeight[a.priority] - priorityWeight[b.priority];
            } else if (sortKey === 'dueDate') {
                comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            }
            return sortDir === 'asc' ? comparison : -comparison;
        });
    }, [tasks, sortKey, sortDir]);

    const renderSortIcon = (key: TsortField) => {
        if (sortKey !== key) return <span className="text-gray-300 ml-1 text-xs">↕</span>;
        return sortDir === 'asc' ? <span className="text-blue-600 ml-1 font-bold">↑</span> : <span className="text-blue-600 ml-1 font-bold">↓</span>;
    };

    // Virtual Scrolling Logic
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);

    const rowHeight = 56;
    const overscan = 5;

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop);
    };

    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
    // eslint-disable-next-line react-hooks/refs
    const visibleItemCount = Math.ceil((containerRef.current?.clientHeight || 800) / rowHeight) + (overscan * 2);
    const endIndex = Math.min(sortedTasks.length, startIndex + visibleItemCount);
    const visibleTasks = sortedTasks.slice(startIndex, endIndex);
    const totalHeight = sortedTasks.length * rowHeight;
    const offsetY = startIndex * rowHeight;


    return (
        <div className="flex flex-col h-screen max-h-screen bg-white border border-gray-200 rounded-lg overflow-hidden relative">

            <div className='flex-1 flex flex-col overflow-x-auto'>
                <div className='min-w-200 flex flex-col h-full'>
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 p-3 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600 z-20 shadow-sm shrink-0">
                        <div className="col-span-2 cursor-pointer hover:text-blue-600 flex items-center select-none" onClick={() => handleSort('title')}>
                            Task Title {renderSortIcon('title')}
                        </div>
                        <div className="col-span-2">Assignee</div>
                        <div className="col-span-2 cursor-pointer hover:text-blue-600 flex items-center select-none" onClick={() => handleSort('priority')}>
                            Priority {renderSortIcon('priority')}
                        </div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2">Start Date</div>
                        <div className="col-span-2 cursor-pointer hover:text-blue-600 flex items-center select-none" onClick={() => handleSort('dueDate')}>
                            Due Date {renderSortIcon('dueDate')}
                        </div>
                    </div>

                    {/* Table Body */}
                    <div
                        ref={containerRef}
                        onScroll={handleScroll}
                        className="flex-1 overflow-y-auto relative bg-white">
                        <div style={{ height: `${totalHeight}px` }} className="w-full relative">
                            <div style={{ transform: `translateY(${offsetY}px)`, position: 'absolute', top: 0, left: 0, right: 0 }}>
                                {visibleTasks.map((task) => {
                                    const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Done';

                                    return (
                                        <div
                                            key={task.id}
                                            style={{ height: `${rowHeight}px` }}
                                            className="grid grid-cols-12 gap-4 px-3 items-center border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                                            <div className="col-span-2 font-medium text-gray-800 truncate" title={task.title}>{task.title}</div>

                                            <div className="col-span-2 flex items-center gap-2">
                                                <Avatar name={task.assignee} />
                                                <span className="text-sm truncate hidden md:block">{task.assignee}</span>
                                            </div>

                                            <div className="col-span-2"><PriorityBadge priority={task.priority} /></div>

                                            <div className="col-span-2 text-sm text-gray-600 truncate">{task.status}</div>

                                            <div className="col-span-2 text-sm text-gray-500">
                                                {task.startDate ? new Date(task.startDate).toLocaleDateString() : <span className="italic text-gray-300">None</span>}
                                            </div>

                                            <div className={`col-span-2 text-sm ${isOverdue ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
                                                {new Date(task.dueDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
