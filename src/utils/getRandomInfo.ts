// Helper function to get a random item from an array
export const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];


// Helper function to get a random date string
export const getRandomDate = (daysOffset: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split('T')[0];
};