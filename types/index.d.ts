import { DragDropContext } from "./contexts";
import { Ghost, Draggable, Droppable, DragDropProvider } from "./components";
export { Ghost, Draggable, Droppable, DragDropContext, DragDropProvider };
declare const _default: {
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
        disabledEdges?: import("./types").Edge[] | undefined;
        children: (draggableProps: import("./types").DraggableProps) => import("react").ReactNode;
    }>;
    Droppable: import("react").FC<{
        id: string;
        style?: import("react").CSSProperties | undefined;
        className?: string | undefined;
        direction?: import("./types").Direction | undefined;
        draggableId?: string | undefined;
        children: (droppableProps: import("./types").DroppableProps) => import("react").ReactNode;
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
        }) => import("react").ReactNode);
        onDragEnd: (params: {
            to: string;
            from: string;
            index: number;
            draggableId: string;
        }) => void;
    }>;
};
export default _default;
