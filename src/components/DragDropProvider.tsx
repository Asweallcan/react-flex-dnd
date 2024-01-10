/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-shadow */
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  FC,
  ReactNode,
} from "react";

import { Edge } from "../types";
import {
  ConfigContext,
  DragDropContext,
  DraggableContext,
  ControllerContext,
} from "../contexts";
import {
  getGhost,
  removeGhost,
  createGhost,
  DragScroller,
  transformGhost,
  calcEdgeIndex,
} from "../utils";

const DragDropProvider: FC<{
  rootId?: string; // Identify react app root element, react 17 needed
  ghostId?: string;
  children:
    | ReactNode
    | ((params: { draggingId?: string; droppableId?: string }) => ReactNode);
  onDragEnd: (params: {
    to: { index: number; droppableId: string };
    from: { index: number; droppableId: string };
    draggableId: string;
  }) => void;
}> = (props) => {
  const { rootId, ghostId, children, onDragEnd } = props;

  const isReactAbove16 = +React.version.split(".")[0] > 16;

  if (isReactAbove16 && !rootId) {
    console.error("[react-flex-dnd] RootId is required above React 17");

    return null;
  }

  if (!useState || typeof useState !== "function") {
    console.error(
      `[react-flex-dnd] Using hooks, not support React below 16.8 yet, current version: ${React.version}`
    );

    return null;
  }

  // optimize movement performance
  const ghostRectRef = useRef<DOMRect>();

  const edgeRef = useRef<Edge>();
  const edgeDraggableIdRef = useRef<string>();

  const draggingNodeRef = useRef<HTMLElement | null | undefined>();
  const draggableRefs = useRef<Record<string, HTMLElement>>({});
  const droppableRefs = useRef<Record<string, HTMLElement>>({});
  const droppableIdRef = useRef<string>();

  const onDragEndRef = useRef(onDragEnd);

  const [edge, setEdgeState] = useState<Edge>();
  const [edgeDraggableId, setEdgeDraggableState] = useState<string>();

  const [draggingId, setDraggingIdState] = useState<string>();
  const [droppableId, setDroppableIdState] = useState<string>();

  const setEdge = useCallback((edge?: Edge, draggableId?: string) => {
    edgeRef.current = edge;
    edgeDraggableIdRef.current = draggableId;

    setEdgeState(edge);
    setEdgeDraggableState(draggableId);
  }, []);

  const setDraggingId = useCallback((draggingId?: string) => {
    draggingNodeRef.current = draggingId
      ? draggableRefs.current[draggingId]
      : undefined;
    setDraggingIdState(draggingId);
  }, []);

  const setDroppableId = useCallback((droppableId?: string) => {
    droppableIdRef.current = droppableId;
    setDroppableIdState(droppableId);
  }, []);

  const setDraggable = useCallback(
    (draggableId: string, draggable: HTMLElement | null | undefined) => {
      if (!draggable) {
        delete draggableRefs.current[draggableId];
      } else {
        draggableRefs.current[draggableId] = draggable;
      }
    },
    []
  );

  const setDroppable = useCallback(
    (droppableId: string, droppable: HTMLElement | null | undefined) => {
      if (!droppable) {
        delete droppableRefs.current[droppableId];
      } else {
        droppableRefs.current[droppableId] = droppable;
      }
    },
    []
  );

  const _nulling = useCallback(() => {
    setEdge();
    setDraggingId();
    setDroppableId();

    transformGhost({ x: -1000, y: -1000, ghostId });

    DragScroller.cancel();

    ghostRectRef.current = undefined;
  }, [ghostId, setEdge, setDraggingId, setDroppableId]);

  const onMouseUp = useCallback(() => {
    try {
      const droppableId = edgeDraggableIdRef.current
        ? draggableRefs.current[edgeDraggableIdRef.current]?.dataset?.belongsTo
        : droppableIdRef.current;

      const draggingId = draggingNodeRef?.current?.dataset?.draggableId;
      if (!droppableId || !draggingId) return;

      const edgeIndex = calcEdgeIndex({
        edge: edgeRef.current,
        droppable: droppableRefs.current[droppableId],
        draggingId,
        draggables: draggableRefs.current,
        edgeDraggableId: edgeDraggableIdRef.current,
      });

      if (edgeIndex === -1) return;

      const prevIndex = +draggingNodeRef.current?.dataset.index!;
      const prevDroppableId = draggingNodeRef.current?.dataset.belongsTo!;

      let newIndex = edgeIndex;
      if (prevDroppableId === droppableId) {
        newIndex += edgeIndex > prevIndex ? -1 : 0;
      }

      onDragEndRef.current?.({
        to: { index: newIndex, droppableId },
        from: {
          index: prevIndex,
          droppableId: prevDroppableId,
        },
        draggableId: draggingId,
      });
    } finally {
      _nulling();
    }
  }, [_nulling]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const draggingId = draggingNodeRef?.current?.dataset?.draggableId;
    if (!draggingId) return;

    if (!ghostRectRef.current)
      ghostRectRef.current = getGhost(ghostId).getBoundingClientRect();

    const { width, height } = ghostRectRef.current;

    transformGhost({
      y: e.pageY - height / 2,
      x: e.pageX - width / 2,
      ghostId
    });

    DragScroller.update(e);
  }, []);

  const addEvents = useCallback(() => {
    const eventEl = isReactAbove16
      ? (document.getElementById(rootId!) as unknown as HTMLElement)
      : document;
    eventEl.addEventListener('mouseup', onMouseUp);
    // @ts-ignore
    eventEl.addEventListener('mousemove', onMouseMove);
  }, [rootId, isReactAbove16, onMouseUp, onMouseMove]);

  const offEvents = useCallback(() => {
    const eventEl = isReactAbove16
      ? (document.getElementById(rootId!) as unknown as HTMLElement)
      : document;
    // if 'root' is not rect root node, just a custom common node. In this case, 'eventEl' will be 'null'
    eventEl?.removeEventListener('mouseup', onMouseUp);
    // @ts-ignore
    eventEl?.removeEventListener('mousemove', onMouseMove);
  }, [rootId, isReactAbove16, onMouseUp, onMouseMove]);

  useEffect(() => {
    onDragEndRef.current = onDragEnd;
  }, [onDragEnd]);

  useEffect(() => {
    createGhost(ghostId);
    addEvents();

    return () => {
      removeGhost(ghostId);
      offEvents();
    };
  }, [ghostId, addEvents, offEvents]);

  return (
    <DragDropContext.Provider
      value={{
        draggingId,
        droppableId,
      }}
    >
      <DraggableContext.Provider value={{ edge, edgeDraggableId }}>
        <ConfigContext.Provider value={{ ghostId }}>
          <ControllerContext.Provider
            value={{
              setEdge,
              setDraggable,
              setDroppable,
              setDraggingId,
              setDroppableId,
            }}
          >
            {typeof children === "function"
              ? children({ draggingId, droppableId })
              : children}
          </ControllerContext.Provider>
        </ConfigContext.Provider>
      </DraggableContext.Provider>
    </DragDropContext.Provider>
  );
};

export default DragDropProvider;
