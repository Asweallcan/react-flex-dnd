import { FC, ReactNode } from "react";
declare const DragDropProvider: FC<{
    rootId?: string;
    ghostId?: string;
    children: ReactNode | ((params: {
        draggingId?: string;
        droppableId?: string;
    }) => ReactNode);
    onDragEnd: (params: {
        to: string;
        from: string;
        index: number;
        draggableId: string;
    }) => void;
}>;
export default DragDropProvider;
