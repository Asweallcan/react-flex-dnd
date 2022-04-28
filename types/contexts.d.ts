import React from "react";
import { Edge } from "./types";
declare type DragDropContextValue = {
    draggingId?: string;
    droppableId?: string;
};
export declare const DragDropContext: React.Context<DragDropContextValue>;
declare type DraggableContextValue = {
    edge?: Edge;
    edgeDraggableId?: string;
};
export declare const DraggableContext: React.Context<DraggableContextValue>;
declare type ConfigContextValue = {
    ghostId?: string;
};
export declare const ConfigContext: React.Context<ConfigContextValue>;
declare type ControllerContextValue = {
    setEdge: (edge?: Edge, draggableId?: string | undefined) => void;
    setDraggable: (draggableId: string, draggableElement: HTMLElement | null | undefined) => void;
    setDroppable: (droppableId: string, draggableElement: HTMLElement | null | undefined) => void;
    setDraggingId: (draggableId?: string) => void;
    setDroppableId: (droppableId?: string) => void;
    setOriginDroppable: (originDroppable: string | undefined) => void;
    onSelectDraggable: (e: React.MouseEvent, draggableId: string, draggableElement: HTMLElement | null | undefined) => void;
    selectedDraggingIds: Record<string, string[]> | undefined;
};
export declare const ControllerContext: React.Context<ControllerContextValue>;
export {};
