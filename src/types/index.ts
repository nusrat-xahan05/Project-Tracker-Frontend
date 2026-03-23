// TS Type definition
export type TViewMode = 'Kanban' | 'List' | 'Timeline';
export type TStatus = 'To Do' | 'In Progress' | 'In Review' | 'Done';
export type TPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type TAssignee = 'Tomal Sen' | 'Taman Manhoj' | 'Mrunal Thakur' | 'Divyanka Gupta' | 'Pav Saxena' | 'NJ Jahan';


export const STATUSES: TStatus[] = ['To Do', 'In Progress', 'In Review', 'Done'];
export const PRIORITIES: TPriority[] = ['Low', 'Medium', 'High', 'Critical'];
export const ASSIGNEES: TAssignee[] = ['Tomal Sen', 'Taman Manhoj', 'Mrunal Thakur', 'Divyanka Gupta', 'Pav Saxena', 'NJ Jahan'];


export interface ITask {
    id: string;
    title: string;
    assignee: TAssignee;
    priority: TPriority;
    status: TStatus;
    startDate: string | null;
    dueDate: string;
}