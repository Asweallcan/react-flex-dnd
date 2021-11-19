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
  CSSProperties,
} from "react";

import { Wrapper } from "./style";
import { Direction, DroppableProps } from "../../types";
import { DragDropContext, ControllerContext } from "../../contexts";

const Droppable: FC<{
  id: string;
  style?: CSSProperties;
  className?: string;
  direction?: Direction;
  draggableId?: string;
  children: (droppableProps: DroppableProps) => ReactNode;
}> = (props) => {
  const {
    id,
    style,
    children,
    className,
    direction = Direction.Horizontal,
    draggableId,
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

      const {
        droppableId: targetDroppableId,
        draggableId: targetDroppableDraggableId,
      } = (e.target as unknown as HTMLElement).dataset;

      if (
        targetDroppableId === id &&
        targetDroppableDraggableId !== draggingId
      ) {
        setDroppableId(id);
      }
    },
    [id, draggingId, isDragOver, setDroppableId]
  );

  return (
    <Wrapper
      style={style}
      className={className}
      onMouseOut={onMouseOut}
      onMouseMove={onMouseMove}
    >
      {typeof children === "function"
        ? children({
            ref,
            isDragOver,
            "data-direction": direction,
            "data-droppable-id": id,
            "data-draggable-id": draggableId,
            onMouseOut,
            onMouseMove,
          })
        : null}
    </Wrapper>
  );
};

export default Droppable;
