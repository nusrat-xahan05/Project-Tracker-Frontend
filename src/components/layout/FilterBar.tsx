import { PRIORITIES, STATUSES } from '../../types';
import type { IFilterBarProps } from '../../types/filterState';


export default function FilterBar({ filters, updateFilters, clearAllFilters, hasActiveFilters }: IFilterBarProps) {
    const toggleArrayFilter = (key: 'status' | 'priority' | 'assignee', value: string) => {
        const currentList = filters[key];
        const newList = currentList.includes(value)
            ? currentList.filter((item) => item !== value)
            : [...currentList, value];

        updateFilters({ [key]: newList });
    };

    return (
        <div className="bg-white border-b px-6 py-3 flex flex-wrap gap-4 items-center z-10">

            {/* Status Filter */}
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <div className="flex gap-1">
                    {STATUSES.map(status => (
                        <button
                            key={status}
                            onClick={() => toggleArrayFilter('status', status)}
                            className={`px-3 py-1 text-xs rounded-full border ${filters.status.includes(status)
                                ? 'bg-blue-100 border-blue-300 text-blue-800'
                                : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Priority Filter */}
            <div className="flex items-center gap-2 border-l pl-4">
                <span className="text-sm font-medium text-gray-700">Priority:</span>
                <select
                    className="text-sm border rounded p-1"
                    onChange={(e) => updateFilters({ priority: [e.target.value] })}
                    value={filters.priority[0] || ''}>
                    <option value="">All</option>
                    {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
            </div>

            {/* Date Range Filters */}
            <div className="flex items-center gap-2 border-l pl-4">
                <span className="text-sm font-medium text-gray-700">Due:</span>
                <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => updateFilters({ dateFrom: e.target.value })}
                    className="text-sm border rounded p-1 text-gray-600"
                />
                <span className="text-gray-400">-</span>
                <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => updateFilters({ dateTo: e.target.value })}
                    className="text-sm border rounded p-1 text-gray-600"
                />
            </div>

            {/* Clear Button */}
            {hasActiveFilters && (
                <button
                    onClick={clearAllFilters}
                    className="ml-auto text-sm text-red-600 hover:text-red-800 font-medium underline"
                >
                    Clear all filters
                </button>
            )}
        </div>
    );
}