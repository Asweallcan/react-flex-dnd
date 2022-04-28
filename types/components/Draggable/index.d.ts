import { FC, ReactNode, CSSProperties } from "react";
import { Edge, DraggableProps } from "../../types";
import "./style.less";
declare const Draggable: FC<{
    id: string;
    index: number;
    style?: CSSProperties;
    sortable?: boolean;
    disabled?: boolean;
    belongsTo: string;
    threshold?: number;
    className?: string;
    disabledEdges?: Edge[];
    children: (draggableProps: DraggableProps) => ReactNode;
}>;
export default Draggable;
