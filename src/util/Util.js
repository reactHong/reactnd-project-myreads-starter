
export const isSameArray = (array1, array2) => {
  if (array1.length !== array2.length) return false;
  for (let i=0, len=array1.length; i<len; i++) {
    if (array1[i] !== array2[i]) return false;
  }
  return true;
}

export const debounce = (func, delay) => {
  
  let timeoutId = null;
  
  return (...args) => {
    console.log(args);
    return new Promise(resolve => {
      
      let checkTimeoutId = null;

      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      timeoutId = setTimeout(() => {
        clearTimeout(checkTimeoutId);
        func(...args);
        resolve(true);
        timeoutId = null;
        checkTimeoutId = null;
      }, delay);

      checkTimeoutId = setTimeout(() => {
        resolve(false);
        checkTimeoutId = null;
      }, delay);
    });
  };
}

export const throttle = (func, time) => {

  let timeoutId = null;

  return (...arg) => {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        timeoutId = null;
        func(...arg);
      }, time);
    }
  };
}
