import { Edge } from "../types";
declare const calcIndex: (params: {
    edge?: Edge;
    droppable: HTMLElement;
    draggingId: string;
    draggables: Record<string, HTMLElement>;
    edgeDraggableId?: string;
}) => number;
export default calcIndex;
