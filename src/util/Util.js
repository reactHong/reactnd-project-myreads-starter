
export const isSameArray = (array1, array2) => {
  if (array1.length !== array2.length) return false;
  for (let i=0, len=array1.length; i<len; i++) {
    if (array1[i] !== array2[i]) return false;
  }
  return true;
}
