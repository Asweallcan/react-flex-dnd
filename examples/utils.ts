/* eslint-disable no-continue */
import { Data } from "./types";

type Params = {
  key: string;
  data: Data;
};

export const findData = (params: Params): Data[number] => {
  const { data, key: target } = params;

  for (let index = 0; index < data.length; index += 1) {
    const item = data[index];

    if (!item) continue;

    const { key } = item;

    if (key === target) return item;

    const { children } = item;

    if (children) {
      const temp = findData({
        key: target,
        data: children,
      });

      if (temp) return temp;
    }
  }

  return null;
};

export const removeData = (params: Params): Data => {
  const { data, key: target } = params;

  for (let index = 0; index < data.length; index += 1) {
    const item = data[index];

    const { key, children } = item;

    if (key === target) {
      // @ts-ignore
      data.splice(index, 1);

      // @ts-ignore
      return data;
    }

    if (children) {
      item.children = removeData({
        data: children,
        key: target,
      });
    }
  }

  // @ts-ignore
  return data;
};
