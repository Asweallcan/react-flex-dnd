const MAGIC_OFFSET = 20;

const getClosestScrollable = (path: EventTarget[]): HTMLElement | undefined => {
  for (let index = 0; index < path.length; index += 1) {
    const element = path[index];

    // @ts-ignore
    if (element.tagName === "HTML") return undefined;

    if (
      element instanceof HTMLElement &&
      (element.scrollHeight - element.offsetHeight > MAGIC_OFFSET ||
        element.scrollWidth - element.offsetWidth > MAGIC_OFFSET)
    ) {
      return element;
    }
  }

  return undefined;
};

export default getClosestScrollable;
