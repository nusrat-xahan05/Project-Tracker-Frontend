import { useState, useEffect } from 'react';
import type { ITask, TStatus } from '../types';
import { useTaskStore } from '../store/useTaskDataStore';

export interface IDragState {
    activeTask: ITask | null;
    initialRect: DOMRect | null;
    currentOffset: { x: number; y: number };
    clickOffset: { x: number; y: number };
    hoveredColumn: TStatus | null;
    isReturning: boolean;
}

export const useKanbanDrag = () => {
    const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
    const [drag, setDrag] = useState<IDragState | null>(null);

    const startDrag = (e: React.PointerEvent<HTMLDivElement>, task: ITask) => {
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();

        setDrag({
            activeTask: task,
            initialRect: rect,
            currentOffset: { x: rect.left, y: rect.top },
            clickOffset: { x: e.clientX - rect.left, y: e.clientY - rect.top },
            hoveredColumn: task.status,
            isReturning: false,
        });
    };

    // Handle drag movement and dropping
    useEffect(() => {
        if (!drag || drag.isReturning) return;

        const handlePointerMove = (e: PointerEvent) => {
            const newX = e.clientX - drag.clickOffset.x;
            const newY = e.clientY - drag.clickOffset.y;

            const elementBelow = document.elementFromPoint(e.clientX, e.clientY);
            const columnContainer = elementBelow?.closest('[data-status]');
            const hoveredStatus = columnContainer ? (columnContainer.getAttribute('data-status') as TStatus) : null;

            setDrag(prev => prev ? { ...prev, currentOffset: { x: newX, y: newY }, hoveredColumn: hoveredStatus } : null);
        };

        const handlePointerUp = () => {
            if (drag.hoveredColumn && drag.hoveredColumn !== drag.activeTask?.status) {
                updateTaskStatus(drag.activeTask!.id, drag.hoveredColumn);
                setDrag(null);
            } else {
                setDrag(prev => prev ? {
                    ...prev,
                    isReturning: true,
                    currentOffset: { x: prev.initialRect!.left, y: prev.initialRect!.top },
                    hoveredColumn: null
                } : null);

                setTimeout(() => setDrag(null), 300);
            }
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [drag, updateTaskStatus]);

    return { drag, startDrag };
};