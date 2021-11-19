import { FC, ReactNode } from "react";
declare const DragDropProvider: FC<{
    rootId?: string;
    ghostId?: string;
    children: ReactNode | ((params: {
        draggingId?: string;
        droppableId?: string;
    }) => ReactNode);
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
    }) => void;
}>;
export default DragDropProvider;
