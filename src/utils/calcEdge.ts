/* eslint-disable no-nested-ternary */
import { Edge } from "../types";

const calcEdge = (params: {
  x: number;
  y: number;
  threshold: number;
  draggableRect: DOMRect;
  disabledEdges: Edge[];
}): Edge | undefined => {
  const { x, y, threshold, draggableRect, disabledEdges } = params;

  const { top, left, width, height } = draggableRect;
  const right = left + width;
  const bottom = top + height;

  let edge = Edge.Top;

  let minRatio = (y - top) / height;

  const bottomRatio = (bottom - y) / height;
  if (bottomRatio < minRatio && !disabledEdges.includes(Edge.Bottom)) {
    edge = Edge.Bottom;
    minRatio = bottomRatio;
  }

  const leftRatio = (x - left) / width;
  if (leftRatio < minRatio && !disabledEdges.includes(Edge.Left)) {
    edge = Edge.Left;
    minRatio = leftRatio;
  }

  const rightRatio = (right - x) / width;
  if (rightRatio < minRatio && !disabledEdges.includes(Edge.Right)) {
    edge = Edge.Right;
    minRatio = rightRatio;
  }

  return minRatio > threshold ||
    (disabledEdges.includes(Edge.Top) && edge === Edge.Top)
    ? undefined
    : edge;
};

export default calcEdge;
