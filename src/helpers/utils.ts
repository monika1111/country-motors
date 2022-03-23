/**
 * @function getFlattenArray
 * @description Resulting flatten array from given array with nestings
 * @param {Array} arr
 * @param {Number} depth
 * @return {Array}
 */
export const getFlattenArray = (
  arr: any[],
  depth: number = Number.MAX_SAFE_INTEGER
): any[] => {
  const len = arr.length;
  let flattened: any[] = [];
  let i = 0;
  while (i < len) {
    if (i in arr) {
      const el = arr[i];
      if (Array.isArray(el) && depth > 0)
        flattened = flattened.concat(getFlattenArray(el, depth - 1));
      else flattened.push(el);
    }
    i++;
  }
  return flattened;
};

export const isEmpty = (value: any) => {
  if (value === null || value === undefined) {
    return true;
  } else if (Array.isArray(value)) {
    return value.length === 0;
  } else if (typeof value === "string") {
    return value.trim().length === 0;
  } else if (typeof value === "number") {
    return value.toString().trim().length === 0;
  } else if (typeof value === "boolean") {
    return !value;
  } else if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }
  return false;
};

/**
 * @function MergeRecursive
 * @description merges 2 objects recursively
 * @param {Object} to destination object
 * @param {Object} from source object
 * @return {Object} returns changed destination object
 */
export const mergeRecursive = (to: any, from: any) => {
  let p;
  for (p in from) {
    if (from.hasOwnProperty(p)) {
      try {
        if (from[p].constructor === Object) {
          if (from[p]["@replace"] === true) {
            //replace field instead of merging if specified
            to[p] = from[p];
            delete to[p]["@replace"];
          } else {
            to[p] = mergeRecursive(to[p], from[p]);
          }
        } else {
          to[p] = from[p];
        }
      } catch (e) {
        to[p] = from[p];
      }
    }
  }
  return to;
};

/**
 * Generates unique id
 * https://gist.github.com/jed/982883
 */
export const uid = (a: any = null): string => {
  return a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : (1e7 + -1e3 + -4e3 + -8e3 + -1e11).toString().replace(/[018]/g, uid);
};
