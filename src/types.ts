import { DragEvent, MouseEvent, RefObject } from "react";

export enum Edge {
  Top = "top",
  Left = "left",
  Right = "right",
  Bottom = "bottom",
}

export enum Direction {
  Vertical = "vertical",
  Horizontal = "horizontal",
}

export type DraggableProps = {
  ref: RefObject<HTMLDivElement>;
  edge?: Edge;
  draggable: boolean;
  isDragging: boolean;
  "data-index": number;
  "data-belongs-to": string;
  "data-draggable-id": string;
  onMouseOut: (e: MouseEvent) => void;
  onDragStart: (e: DragEvent) => void;
  onMouseMove: (e: MouseEvent) => void;
};

export type DroppableProps = {
  ref: RefObject<HTMLDivElement>;
  isDragOver: boolean;
  "data-direction": Direction;
  "data-droppable-id": string;
  "data-draggable-id"?: string;
  onMouseOut: (e: MouseEvent) => void;
  onMouseMove: (e: MouseEvent) => void;
};
