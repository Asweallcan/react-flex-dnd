import { Edge } from '../types';
declare const calcEdge: (params: {
    pageX: number;
    pageY: number;
    threshold: number;
    draggableRect: DOMRect;
    disabledEdges: Edge[];
}) => Edge | undefined;
export default calcEdge;
