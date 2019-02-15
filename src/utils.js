import { isArray, isNullOrUndef } from 'inferno-shared'

export function numeric(beg, end) {
  const a = +beg
  const b = +end - a
  
  return function(t) {
    const outp = a + b * t
    console.log(`timer: ${t} - ${outp}`)
    return outp
  } 
}

function flatten(arr, result) {
  for (let i = 0, len = arr.length; i < len; ++i) {
    const value = arr[i];
    if (isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
}

const ARR = [];

export const Children = {
  map(children, fn, ctx) {
    if (isNullOrUndef(children)) {
      return children;
    }
    children = Children.toArray(children);
    if (ctx && ctx !== children) {
      fn = fn.bind(ctx);
    }
    return children.map(fn);
  },
  count(children) {
    children = Children.toArray(children);
    return children.length;
  },
  only(children) {
    children = Children.toArray(children);
    if (children.length !== 1) {
      throw new Error('Children.only() expects only one child.');
    }
    return children[0];
  },
  toArray(children) {
    if (isNullOrUndef(children)) {
      return [];
    }
    // We need to flatten arrays here,
    // because React does it also and application level code might depend on that behavior
    if (isArray(children)) {
      const result = [];

      flatten(children, result);

      return result;
    }
    return ARR.concat(children);
  }
}