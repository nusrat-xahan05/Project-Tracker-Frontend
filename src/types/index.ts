// TS Type definition
export type Status = 'To Do' | 'In Progress' | 'In Review' | 'Done';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
export type Assignee = 'Tomal Sen' | 'Taman Manhoj' | 'Mrunal Thakur' | 'Divyanka Gupta' | 'Pav Saxena' | 'NJ Jahan';

export interface Task {
    id: string;
    title: string;
    assignee: Assignee;
    priority: Priority;
    status: Status;
    startDate: string | null;
    dueDate: string;
}