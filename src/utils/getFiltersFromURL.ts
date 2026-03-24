import type { IFilterState } from "../types/filterState";

export const getFiltersFromURL = (): IFilterState => {
    const params = new URLSearchParams(window.location.search);
    return {
        status: params.get('status')?.split(',').filter(Boolean) || [],
        priority: params.get('priority')?.split(',').filter(Boolean) || [],
        assignee: params.get('assignee')?.split(',').filter(Boolean) || [],
        dateFrom: params.get('dateFrom') || '',
        dateTo: params.get('dateTo') || '',
    };
};