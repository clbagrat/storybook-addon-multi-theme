export const toggle = (array: any[], value: any) => {
  const set = new Set(array);

  if (set.has(value)) {
    set.delete(value);
  } else {
    set.add(value)
  }

  return [...set];
}
