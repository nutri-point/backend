export const capitalizeString = (str: string) => {
  const lowerCaseString = str.toLowerCase();
  return lowerCaseString[0].toUpperCase() + lowerCaseString.substring(1);
};
