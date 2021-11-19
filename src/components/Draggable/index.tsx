/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, {
  useRef,
  useEffect,
  useContext,
  useCallback,
  FC,
  ReactNode,
  DragEvent,
  MouseEvent,
  CSSProperties,
} from "react";

import { Wrapper } from "./style";
import { calcEdge } from "../../utils";
import { Edge, DraggableProps } from "../../types";
import {
  DragDropContext,
  DraggableContext,
  ControllerContext,
} from "../../contexts";

const getRect = (ref: HTMLElement) => ref.getBoundingClientRect();

const Draggble: FC<{
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
}> = (props) => {
  const {
    id,
    style,
    index,
    children,
    disabled,
    sortable = true,
    className,
    threshold = 1,
    belongsTo,
    disabledEdges = [],
    ...rest
  } = props;

  const { draggingId } = useContext(DragDropContext);
  const { edge, edgeDraggableId } = useContext(DraggableContext);
  const { setEdge, setDraggingId, setDroppableId, setDraggable } =
    useContext(ControllerContext);

  const isDragging = draggingId === id;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDraggable(id, ref.current);

    return () => {
      setDraggable(id, null);
    };
  }, [id, setDraggable]);

  const onDragStart = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setDraggingId(id);
    },
    [id, setDraggingId]
  );

  const onMouseOut = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();

      setEdge();
      setDroppableId();
    },
    [setEdge, setDroppableId]
  );

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();

      if (!sortable || !draggingId || isDragging) return;

      const edge = calcEdge({
        pageX: e.pageX,
        pageY: e.pageY,
        threshold,
        disabledEdges,
        draggableRect: getRect(ref.current!)!,
      });

      setEdge(edge, edge ? id : undefined);

      if (edge) setDroppableId(belongsTo);
    },
    [
      id,
      sortable,
      threshold,
      belongsTo,
      draggingId,
      isDragging,
      disabledEdges,
      setEdge,
      setDroppableId,
    ]
  );

  return (
    <Wrapper
      {...rest}
      style={style}
      disabled={!!disabled}
      className={className}
      isDragging={isDragging}
    >
      {typeof children === "function"
        ? children({
            ref,
            edge: edgeDraggableId === id ? edge : undefined,
            draggable: !disabled,
            isDragging,
            "data-index": index,
            "data-belongs-to": belongsTo,
            "data-draggable-id": id,
            onMouseOut,
            onMouseMove,
            onDragStart,
          })
        : null}
    </Wrapper>
  );
};

export default Draggble;
