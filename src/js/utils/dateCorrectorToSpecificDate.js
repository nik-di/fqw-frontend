export const dateCorrectorToSpecificDate = (daysBeforeCertain = 7) => {
  const dateCopy = new Date();
  const correctedDate = new Date(dateCopy.setDate(dateCopy.getDate() - daysBeforeCertain));
  return correctedDate;
}; 