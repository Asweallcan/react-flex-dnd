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

export const replaceRemovingDataToNull = (params: Params): Data => {
  const { data, key: target } = params;

  for (let index = 0; index < data.length; index += 1) {
    const item = data[index];

    const { key, children } = item;

    if (key === target) {
      // @ts-ignore
      data.splice(index, 1, null);

      // @ts-ignore
      return data;
    }

    if (children) {
      const nextChildren = replaceRemovingDataToNull({
        data: children,
        key: target,
      });

      if (nextChildren.length !== children.length) {
        item.children = nextChildren;

        // @ts-ignore
        return data;
      }
    }
  }

  // @ts-ignore
  return data;
};

export const clearData = (data: Data): Data => {
  for (let index = 0; index < data.length; index += 1) {
    const item = data[index];

    if (!item) {
      data.splice(index, 1);

      // @ts-ignore
      return data;
    }

    const { children } = item;

    if (children) {
      // @ts-ignore
      const nextChildren = clearData(children);

      if (nextChildren.length !== children.length) {
        item.children = nextChildren;

        // @ts-ignore
        return data;
      }
    }
  }

  // @ts-ignore
  return data;
};
