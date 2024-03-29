import { Data } from "./types";

type Params = {
  id: string;
  data: Data;
};

export const findData = (params: Params): Data[number] | undefined => {
  const { data, id: target } = params;

  for (let index = 0; index < data.length; index += 1) {
    const item = data[index];

    if (!item) continue;

    const { id } = item;

    if (id === target) return item;

    const { children } = item;

    if (children) {
      const temp = findData({
        id: target,
        data: children,
      });

      if (temp) return temp;
    }
  }

  return undefined;
};

export const removeData = (params: Params): Data => {
  const { data, id: target } = params;

  for (let index = 0; index < data.length; index += 1) {
    const item = data[index];

    const { id, children } = item;

    if (id === target) {
      data.splice(index, 1);

      return data;
    }

    if (children) {
      item.children = removeData({
        data: children,
        id: target,
      });
    }
  }

  return data;
};

export const containerAddItem = (params: {
  item: Data[number];
  data: Data;
  destination: number;
  containerId: string;
}): void => {
  const { item, data, destination, containerId } = params;

  const container = findData({ data, id: containerId });

  if (!container) return;

  if (!container.children) container.children = [];

  container.children.splice(destination, 0, item);
};
