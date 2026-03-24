// Function to calculate due days difference
export const getDueDaysDifference = (dateString: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(dateString);
  dueDate.setHours(0, 0, 0, 0);

  const diffTime = dueDate.getTime() - today.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
};