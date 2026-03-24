import type { TPriority } from "../../types";


export default function PriorityBadge({ priority }: { priority: TPriority }) {
    // Color based on the priority level
    const colors = {
        Low: 'bg-gray-100 text-gray-700 border-gray-200',
        Medium: 'bg-blue-100 text-blue-700 border-blue-200',
        High: 'bg-orange-100 text-orange-700 border-orange-200',
        Critical: 'bg-red-100 text-red-700 border-red-200 shadow-sm font-bold',
    };

    return (
        <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider rounded border ${colors[priority]}`}>
            {priority}
        </span>
    );
}