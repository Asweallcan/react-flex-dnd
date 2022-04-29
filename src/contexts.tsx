import React, { createContext } from "react";

import { Edge } from "./types";

// exposed
type DragDropContextValue = {
  draggingId?: string;
  droppableId?: string;
};

export const DragDropContext = createContext<DragDropContextValue>(
  {} as DragDropContextValue
);

type DraggableContextValue = {
  edge?: Edge;
  edgeDraggableId?: string;
};

export const DraggableContext = createContext<DraggableContextValue>(
  {} as DraggableContextValue
);

type ConfigContextValue = {
  ghostId?: string;
};

export const ConfigContext = createContext<ConfigContextValue>(
  {} as ConfigContextValue
);

type ControllerContextValue = {
  setEdge: (edge?: Edge, draggableId?: string | undefined) => void;
  setDraggable: (
    draggableId: string,
    draggableElement: HTMLElement | null | undefined
  ) => void;
  setDroppable: (
    droppableId: string,
    draggableElement: HTMLElement | null | undefined
  ) => void;
  setDraggingId: (draggableId?: string) => void;
  setDroppableId: (droppableId?: string) => void;
  setOriginDroppable: (originDroppable: string | undefined) => void
  onSelectDraggable: (
      e: React.MouseEvent,
      draggableId: string,
      draggableElement: HTMLElement | null | undefined
  ) => void;
  selectedDraggingIds: Record<string, string[]> | undefined;
};

export const ControllerContext = createContext<ControllerContextValue>(
  {} as ControllerContextValue
);
