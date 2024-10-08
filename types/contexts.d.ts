/// <reference types="react" />
import { Edge } from "./types";
type DragDropContextValue = {
    draggingId?: string;
    droppableId?: string;
};
export declare const DragDropContext: import("react").Context<DragDropContextValue>;
type DraggableContextValue = {
    edge?: Edge;
    edgeDraggableId?: string;
};
export declare const DraggableContext: import("react").Context<DraggableContextValue>;
type ConfigContextValue = {
    ghostId?: string;
};
export declare const ConfigContext: import("react").Context<ConfigContextValue>;
type ControllerContextValue = {
    setEdge: (edge?: Edge, draggableId?: string | undefined) => void;
    setDraggable: (draggableId: string, draggableElement: HTMLElement | null | undefined) => void;
    setDroppable: (droppableId: string, draggableElement: HTMLElement | null | undefined) => void;
    setDraggingId: (draggableId?: string) => void;
    setDroppableId: (droppableId?: string) => void;
};
export declare const ControllerContext: import("react").Context<ControllerContextValue>;
export {};
