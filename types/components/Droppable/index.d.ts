import { FC, ReactNode, CSSProperties } from "react";
import { Direction, DroppableProps } from "../../types";
declare const Droppable: FC<{
    id: string;
    style?: CSSProperties;
    className?: string;
    direction?: Direction;
    draggableId?: string;
    children: (droppableProps: DroppableProps) => ReactNode;
}>;
export default Droppable;
