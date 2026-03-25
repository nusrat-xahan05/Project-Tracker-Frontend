// TS Type definition
export type TViewMode = 'Kanban' | 'List' | 'Timeline';
export type TStatus = 'To Do' | 'In Progress' | 'In Review' | 'Done';
export type TPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export const ASSIGNEES = [
    'Tomal Sen', 
    'Taman Manhoj', 
    'Mrunal Thakur', 
    'Divyanka Gupta', 
    'Pav Saxena', 
    'NJ Jahan'
] as const;

export type TAssignee = (typeof ASSIGNEES)[number];

export const STATUSES: TStatus[] = ['To Do', 'In Progress', 'In Review', 'Done'];
export const PRIORITIES: TPriority[] = ['Low', 'Medium', 'High', 'Critical'];
export const DATA_ASSIGNEES: TAssignee[] = ['Tomal Sen', 'Taman Manhoj', 'Mrunal Thakur', 'Divyanka Gupta', 'Pav Saxena', 'NJ Jahan'];


export interface ITask {
    id: string;
    title: string;
    assignee: TAssignee;
    priority: TPriority;
    status: TStatus;
    startDate: string | null;
    dueDate: string;
}