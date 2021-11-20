import { Edge } from "../types";
declare const calcEdgeIndex: (params: {
    edge?: Edge;
    droppable: HTMLElement;
    draggingId: string;
    draggables: Record<string, HTMLElement>;
    edgeDraggableId?: string;
}) => number;
export default calcEdgeIndex;
