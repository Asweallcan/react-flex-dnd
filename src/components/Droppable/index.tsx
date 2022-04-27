/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
    useRef,
    useEffect,
    useContext,
    useCallback,
    FC,
    ReactNode,
    MouseEvent,
    CSSProperties, DragEvent,
} from "react";

import { Direction, DroppableProps } from "../../types";
import { DragDropContext, ControllerContext } from "../../contexts";

import "./style.less";

const Droppable: FC<{
  id: string;
  style?: CSSProperties;
  className?: string;
  direction?: Direction;
  draggableId?: string;
  children: (droppableProps: DroppableProps) => ReactNode;
  onDraggedItemEnters?: (draggableId: string | undefined) => void;
  onDraggedItemLeaves?: (draggableId: string | undefined) => void;
}> = (props) => {
  const {
    id,
    style,
    children,
    className,
    direction = Direction.Horizontal,
    draggableId,
    onDraggedItemEnters,
    onDraggedItemLeaves,
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  const { draggingId, droppableId } = useContext(DragDropContext);
  const { setDroppable, setDroppableId } = useContext(ControllerContext);

  const isDragOver = droppableId === id;

  useEffect(() => {
    setDroppable(id, ref.current);

    return () => {
      setDroppable(id, null);
    };
  }, [id, setDroppable]);


  const onMouseEnter = useCallback(
        (e: MouseEvent) => {
            if (draggingId && onDraggedItemEnters) {
                onDraggedItemEnters(draggingId);
            }
        },
        [id, droppableId]
  );

  const onMouseOut = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();

      if (droppableId !== id) return;

      setDroppableId();
    },
    [id, droppableId, setDroppableId]
  );

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!draggingId || isDragOver) return;

      let findDroppable = e.target as HTMLElement;
      while (!findDroppable.dataset.droppableId) {
        findDroppable = findDroppable.parentNode as HTMLElement;
      }

      const {
        droppableId: targetDroppableId,
        draggableId: targetDroppableDraggableId,
      } = findDroppable.dataset;

      if (
        targetDroppableId === id &&
        targetDroppableDraggableId !== draggingId
      ) {
        setDroppableId(id);
      }
    },
    [id, draggingId, isDragOver, setDroppableId]
  );

  const cls = ["react-flex-dnd-droppable", className].filter(Boolean).join(" ");

  return (
    <div style={style} className={cls}>
      {typeof children === "function"
        ? children({
            ref,
            isDragOver,
            "data-direction": direction,
            "data-droppable-id": id,
            "data-draggable-id": draggableId,
            onMouseOut,
            onMouseMove,
            onMouseEnter,
          })
        : null}
    </div>
  );
};

export default Droppable;
