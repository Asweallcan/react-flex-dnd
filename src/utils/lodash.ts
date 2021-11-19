function getTag(value: any) {
  if (value == null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }
  return toString.call(value);
}

function isSymbol(value: any) {
  const type = typeof value;
  return (
    type == "symbol" ||
    (type === "object" && value != null && getTag(value) == "[object Symbol]")
  );
}

export function minBy(array: any[], iteratee: (item: any) => number) {
  let result;
  if (array == null) {
    return result;
  }
  let computed;
  for (const value of array) {
    const current = iteratee(value);

    if (
      current != null &&
      (computed === undefined
        ? current === current && !isSymbol(current)
        : current < computed)
    ) {
      computed = current;
      result = value;
    }
  }
  return result;
}

export function maxBy(array: any[], iteratee: (item: any) => number) {
  let result;
  if (array == null) {
    return result;
  }
  let computed;
  for (const value of array) {
    const current = iteratee(value);

    if (
      current != null &&
      (computed === undefined
        ? current === current && !isSymbol(current)
        : current > computed)
    ) {
      computed = current;
      result = value;
    }
  }
  return result;
}
