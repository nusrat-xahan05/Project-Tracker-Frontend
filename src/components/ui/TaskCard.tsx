import type { ITask } from '../../types';
import { getDueDaysDifference } from '../../utils/getDueDayDifference';
import Avatar from './Avatar';
import PriorityBadge from './PriorityBadge';

export default function TaskCard({ task }: { task: ITask }) {
    const daysDiff = getDueDaysDifference(task.dueDate);
    const isDone = task.status === 'Done';

    // Overdue logic:
    let isOverdue = '';
    if (!isDone) {
        if (daysDiff === 0)
            isOverdue = '⏰ Due Today';
        else if (daysDiff < -7)
            isOverdue = `⚠️ Overdue by: ${Math.abs(daysDiff)} days`;
        else if (daysDiff < 0)
            isOverdue = '⚠️ Overdue';
    }

    return (
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow">
            <div className="flex gap-2 items-center mb-2 border-b border-gray-300 pb-2">
                <Avatar name={task.assignee} />
                <h3 className='text-sm italic font-medium text-gray-800'>{task.assignee}</h3>
            </div>


            <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 leading-tight">{task.title}</h4>
                <span className="text-xs text-gray-500 font-mono">{task.id.replace('task-', '#')}</span>
            </div>

            <div className="flex justify-between items-end mt-auto">
                <PriorityBadge priority={task.priority} />

                <div className="text-right text-xs font-medium">
                    <div className={`${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
                        {isOverdue ? isOverdue : task.status === 'Done' ? '✅ Completed' : '⏰ On Track'}
                    </div>
                    <div className='text-gray-600'>
                        Due Date: {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                </div>
            </div>
        </div>
    );
}