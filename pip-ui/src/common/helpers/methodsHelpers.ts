type StringMapArray<T> = {
  array: string[];
  map: { [k: string]: T };
};

export const stringFlatten = <T>(
  collection: T[],
  key: keyof T
): StringMapArray<T> => {
  const map: { [k: string]: T } = {};
  const array: string[] = [];

  collection.forEach((ele): void => {
    const prop = String(ele[key]);
    map[prop] = ele;
    array.push(prop);
  });

  return { array, map };
};
