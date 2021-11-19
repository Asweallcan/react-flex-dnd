/* eslint-disable no-nested-ternary */
import { Edge } from '../types';

const calcEdge = (params: {
  pageX: number;
  pageY: number;
  threshold: number;
  draggableRect: DOMRect;
  disabledEdges: Edge[];
}): Edge | undefined => {
  const { pageX, pageY, threshold, draggableRect, disabledEdges } = params;

  const { top, left, width, height } = draggableRect;
  const right = left + width;
  const bottom = top + height;

  let edge = Edge.Top;

  let minRatio = (pageY - top) / height;

  const bottomRatio = (bottom - pageY) / height;
  if (bottomRatio < minRatio && !disabledEdges.includes(Edge.Bottom)) {
    edge = Edge.Bottom;
    minRatio = bottomRatio;
  }

  const leftRatio = (pageX - left) / width;
  if (leftRatio < minRatio && !disabledEdges.includes(Edge.Left)) {
    edge = Edge.Left;
    minRatio = leftRatio;
  }

  const rightRatio = (right - pageX) / width;
  if (rightRatio < minRatio && !disabledEdges.includes(Edge.Right)) {
    edge = Edge.Right;
    minRatio = rightRatio;
  }

  return minRatio > threshold
    ? undefined
    : disabledEdges.includes(Edge.Top) && edge === Edge.Top
    ? undefined
    : edge;
};

export default calcEdge;
