const MAGIC_OFFSET = 20;

const getClosestScrollable = (path: HTMLElement[]): HTMLElement | null => {
  for (let index = 0; index < path.length; index += 1) {
    const element = path[index];

    if (
      element instanceof HTMLElement &&
      (element.scrollHeight - element.offsetHeight > MAGIC_OFFSET ||
        element.scrollWidth - element.offsetWidth > MAGIC_OFFSET)
    ) {
      return element;
    }
  }

  return null;
};

export default getClosestScrollable;
