import { useState, useEffect, useCallback } from 'react';
import type { IFilterState } from '../types/filterState';
import { getFiltersFromURL } from '../utils/getFiltersFromURL';


export const useUrlFilters = () => {
    const [filters, setFilters] = useState<IFilterState>(getFiltersFromURL());

    // Update filters to the URL
    const updateFilters = useCallback((newFilters: Partial<IFilterState>) => {
        const updated = { ...filters, ...newFilters };
        const params = new URLSearchParams();

        if (updated.status.length) params.set('status', updated.status.join(','));
        if (updated.priority.length) params.set('priority', updated.priority.join(','));
        if (updated.assignee.length) params.set('assignee', updated.assignee.join(','));
        if (updated.dateFrom) params.set('dateFrom', updated.dateFrom);
        if (updated.dateTo) params.set('dateTo', updated.dateTo);

        const newUrl = `${window.location.pathname}?${params.toString()}`;

        // PushState for Navigating back
        window.history.pushState({}, '', newUrl);
        setFilters(updated);
    }, [filters]);


    // Restore Navigating back filter history
    useEffect(() => {
        const handlePopState = () => {
            setFilters(getFiltersFromURL());
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);


    // For clearning all filters values
    const clearAllFilters = useCallback(() => {
        window.history.pushState({}, '', window.location.pathname);
        setFilters({ status: [], priority: [], assignee: [], dateFrom: '', dateTo: '' });
    }, []);

    const hasActiveFilters =
        filters.status.length > 0 ||
        filters.priority.length > 0 ||
        filters.assignee.length > 0 ||
        !!filters.dateFrom ||
        !!filters.dateTo;

    return { filters, updateFilters, clearAllFilters, hasActiveFilters };
};
