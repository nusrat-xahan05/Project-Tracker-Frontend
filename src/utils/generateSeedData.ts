import { ASSIGNEES, PRIORITIES, STATUSES, type ITask } from "../types";
import { getRandomDate, getRandomItem } from "./getRandomInfo";



export const generateSeedData = (count: number = 500): ITask[] => {
  const tasks: ITask[] = [];

  for (let i = 1; i <= count; i++) {
    // Randomly select 'STARTDATE' between -15 days for 'past' & +30 days for 'future'
    const getstartDate = Math.floor(Math.random() * 45) - 15; 
    
    // Randomly select 'DUEDATE' between 'startDate' to +14 days for future
    const getDueDate = getstartDate + (Math.floor(Math.random() * 14) + 1);

    // Randomly handle edge case (missionDate) - 10% chance to have no start date
    const isMissingStartDate = Math.random() < 0.1;
    

    // Generate task with random attributes
    tasks.push({
      id: `task-${i.toString().padStart(4, '0')}`,
      title: `Project Task ${i}`,
      assignee: getRandomItem(ASSIGNEES),
      priority: getRandomItem(PRIORITIES),
      status: getRandomItem(STATUSES),
      startDate: isMissingStartDate ? null : getRandomDate(getstartDate),
      dueDate: getRandomDate(getDueDate),
    });
  }

  return tasks;
};