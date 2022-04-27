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
  CSSProperties, useState,
} from "react";

import { calcEdge } from "../../utils";
import { Edge, DraggableProps } from "../../types";
import {
  DragDropContext,
  DraggableContext,
  ControllerContext,
} from "../../contexts";

import "./style.less";

const getRect = (ref: HTMLElement) => ref.getBoundingClientRect();

const Draggable: FC<{
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
  const { setEdge, setDraggingId, setDroppableId, setDraggable, onSelectDraggable, selectedDraggingIds, setOriginDroppable } =
    useContext(ControllerContext);


  const isDragging = draggingId === id;

  const ref = useRef<HTMLDivElement>(null);
  const [isSelected, setSelected] = useState<boolean>();

  useEffect(() => {
    if (selectedDraggingIds && ref?.current?.dataset?.belongsTo) {
      if (selectedDraggingIds[ref?.current?.dataset?.belongsTo]?.includes(id)) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    }
  }, [selectedDraggingIds])

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
      setOriginDroppable(ref?.current?.dataset?.belongsTo);
      onSelectDraggable(e, id, ref.current)
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

  const onClick = (e: MouseEvent) => {
    onSelectDraggable(e, id, ref.current)
  }

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      if (!sortable || !draggingId || isDragging) return;
      const edge = calcEdge({
        x: e.clientX,
        y: e.clientY,
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

  const cls = [
    "react-flex-dnd-draggable",
    disabled && "disabled",
    isDragging && "isDragging",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div {...rest} style={style} className={cls}>
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
            onClick,
            onMouseMove,
            onDragStart,
            className: isSelected ? "isSelected": '',
          })
        : null}
    </div>
  );
};

export default Draggable;
