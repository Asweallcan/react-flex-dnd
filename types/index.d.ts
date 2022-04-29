import { Edge } from "./types";
import { DragDropContext } from "./contexts";
import { Ghost, Draggable, Droppable, DragDropProvider } from "./components";
export * from "./types";
export { Ghost, Draggable, Droppable, DragDropContext, DragDropProvider };
declare const _default: {
    Edge: typeof Edge;
    Ghost: import("react").FC<{}>;
    Draggable: import("react").FC<{
        id: string;
        index: number;
        style?: import("react").CSSProperties | undefined;
        sortable?: boolean | undefined;
        disabled?: boolean | undefined;
        belongsTo: string;
        threshold?: number | undefined;
        className?: string | undefined;
        disabledEdges?: Edge[] | undefined;
        children: (draggableProps: import("./types").DraggableProps) => import("react").ReactNode;
    }>;
    Droppable: import("react").FC<{
        id: string;
        style?: import("react").CSSProperties | undefined;
        className?: string | undefined;
        direction?: import("./types").Direction | undefined;
        draggableId?: string | undefined;
        children: (droppableProps: import("./types").DroppableProps) => import("react").ReactNode;
        onDraggedItemEnters?: ((draggableId: string | undefined) => void) | undefined;
        onDraggedItemLeaves?: ((draggableId: string | undefined) => void) | undefined;
    }>;
    DragDropContext: import("react").Context<{
        draggingId?: string | undefined;
        droppableId?: string | undefined;
    }>;
    DragDropProvider: import("react").FC<{
        rootId?: string | undefined;
        ghostId?: string | undefined;
        children: import("react").ReactNode | ((params: {
            draggingId?: string | undefined;
            droppableId?: string | undefined;
            selectedDraggingIds?: Record<string, string[]> | undefined;
            originDroppable: string | undefined;
        }) => import("react").ReactNode);
        onDragEnd: (params: {
            to: {
                index: number;
                droppableId: string;
            };
            from: {
                index: number;
                droppableId: string;
            };
            draggableId: string;
            selectedDraggedIds: string[];
        }) => void;
    }>;
};
export default _default;
