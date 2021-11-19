import { Edge } from "../types";
declare const calcEdge: (params: {
    x: number;
    y: number;
    threshold: number;
    draggableRect: DOMRect;
    disabledEdges: Edge[];
}) => Edge | undefined;
export default calcEdge;
