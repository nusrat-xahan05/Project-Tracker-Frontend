// Filter Options
export interface IFilterState {
    status: string[];
    priority: string[];
    assignee: string[];
    dateFrom: string;
    dateTo: string;
}

// FilterBar Props
export interface IFilterBarProps {
    filters: IFilterState;
    updateFilters: (newFilters: Partial<IFilterState>) => void;
    clearAllFilters: () => void;
    hasActiveFilters: boolean;
}