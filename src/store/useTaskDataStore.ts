import { create } from 'zustand';
import type { TStatus, ITask } from '../types';
import { generateSeedData } from '../utils/generateSeedData';


interface TaskState {
    tasks: ITask[];
    initializeTasks: () => void;
    updateTaskStatus: (taskId: string, newStatus: TStatus) => void;
    updateTask: (taskId: string, updates: Partial<ITask>) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    // Generate the 500+ tasks only once when the store initializes
    tasks: [],
    initializeTasks: () => {
        const seedData = generateSeedData(500);
        set({ tasks: seedData });
    },

    // Function for Drag-and-Drop Kanban board
    updateTaskStatus: (taskId, newStatus) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
            ),
        })),

    // Function for editing in List View
    updateTask: (taskId, updates) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updates } : task
            ),
        })),
}));
