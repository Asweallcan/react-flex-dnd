/* eslint-disable no-shadow */
import { minBy, maxBy } from "./lodash";
import { Edge, Direction } from "../types";

const getSameAxisDraggables = (params: {
  direction: Direction;
  draggables: Record<string, HTMLElement>;
  draggableId: string;
}) => {
  const { direction, draggableId, draggables } = params;

  const draggable = draggables[draggableId];

  const { top, left, right, bottom } = draggable.getBoundingClientRect();

  const sameAxisDraggables: HTMLElement[] = [];
  Object.keys(draggables).forEach((draggableId) => {
    const draggableRect = draggables[draggableId].getBoundingClientRect();

    if (direction === Direction.Horizontal) {
      // if hontizontal, find x axis intersection draggables
      if (draggableRect.bottom > top && bottom > draggableRect.top) {
        sameAxisDraggables.push(draggables[draggableId]);
      }
    } else if (draggableRect.right > left && right > draggableRect.left) {
      // if vertical, find y axis intersection draggables
      sameAxisDraggables.push(draggables[draggableId]);
    }
  });

  return sameAxisDraggables;
};

const calcIndex = (params: {
  edge?: Edge;
  droppable: HTMLElement;
  draggingId: string;
  draggables: Record<string, HTMLElement>;
  edgeDraggableId?: string;
}): number => {
  const { edge, droppable, draggingId, draggables, edgeDraggableId } = params;

  const { direction, droppableId } = droppable.dataset;

  const currentDroppableDraggables = Object.keys(draggables)
    .filter((draggableId) => {
      return draggables[draggableId].dataset.belongsTo === droppableId;
    })
    .reduce((acc, draggableId) => {
      acc[draggableId] = draggables[draggableId];

      return acc;
    }, {} as Record<string, HTMLElement>);

  if (!edge || !edgeDraggableId) {
    // if existed and no edge, be still
    if (currentDroppableDraggables[draggingId]) return -1;

    // if not existed and no edge, should append in current droppable
    return Object.keys(currentDroppableDraggables).length;
  }

  const isDifferentLevel =
    direction === Direction.Horizontal
      ? [Edge.Top, Edge.Bottom].includes(edge)
      : [Edge.Left, Edge.Right].includes(edge);

  if (isDifferentLevel) {
    const sameAxisDraggables = getSameAxisDraggables({
      direction: (direction as Direction) || Direction.Horizontal,
      draggables: currentDroppableDraggables,
      draggableId: edgeDraggableId,
    });

    const sameAxisIndex = (
      [Edge.Right, Edge.Bottom].includes(edge)
        ? maxBy(sameAxisDraggables, (el) => +el.dataset.index!)
        : minBy(sameAxisDraggables, (el) => +el.dataset.index!)
    )?.dataset.index;

    return Math.max(
      0,
      +sameAxisIndex! + ([Edge.Left, Edge.Top].includes(edge) ? 0 : 1)
    );
  }

  return Math.max(
    +draggables[edgeDraggableId].dataset.index! +
      (edge === (direction === Direction.Horizontal ? Edge.Left : Edge.Top)
        ? 0
        : 1),
    0
  );
};

export default calcIndex;
