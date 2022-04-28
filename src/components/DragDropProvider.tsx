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
    | ((params: { draggingId?: string; droppableId?: string, selectedDraggingIds?: Record<string, string[]>, originDroppable: string | undefined }) => ReactNode);
  onDragEnd: (params: {
    to: { index: number; droppableId: string };
    from: { index: number; droppableId: string };
    draggableId: string;
    selectedDraggedIds: string[];
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

  const draggingIdRef = useRef<string>();
  const draggableRefs = useRef<Record<string, HTMLElement>>({});
  const droppableRefs = useRef<Record<string, HTMLElement>>({});
  const droppableIdRef = useRef<string>();

  const onDragEndRef = useRef(onDragEnd);

  const [edge, setEdgeState] = useState<Edge>();
  const [edgeDraggableId, setEdgeDraggableState] = useState<string>();

  const [draggingId, setDraggingIdState] = useState<string>();
  const [selectedDraggingIds, setSelectedDraggingIds] = useState<Record<string, string[]>>();
  const [droppableId, setDroppableIdState] = useState<string>();
  const [originDroppable, setOriginDroppable] = useState<string>();


  const setEdge = useCallback((edge?: Edge, draggableId?: string) => {
    edgeRef.current = edge;
    edgeDraggableIdRef.current = draggableId;

    setEdgeState(edge);
    setEdgeDraggableState(draggableId);
  }, []);

  const setDraggingId = useCallback((draggingId?: string) => {
    draggingIdRef.current = draggingId;
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

  const onSelectDraggable = (e:  React.MouseEvent<Element, MouseEvent>, id: string, draggable: HTMLElement | null | undefined) => {
    setSelectedDraggingIds((dict = {}) => {
      if (draggable && draggable?.dataset?.belongsTo) {
        const hasItemBeenAlreadyAdded = dict[draggable.dataset.belongsTo]?.includes(id);
        const currentDataGroup = dict[draggable.dataset.belongsTo] || [];
        let updatedGroupData = currentDataGroup

        if (e.type === "click") {
          // if we press on cmd key for multiple selection
          if (e.metaKey) {
            if (!hasItemBeenAlreadyAdded) {
              updatedGroupData = [...currentDataGroup, id];
            } else {
              // remove
              updatedGroupData = currentDataGroup.filter((item) => item !== id);
            }
          } else {
            // single selection => reset with that id
            updatedGroupData = [id];
          }
        } else if (e.type === "dragstart") {
          //dragging => will drag already selected ids + the clicked one
          if (!hasItemBeenAlreadyAdded) {
            updatedGroupData = [...currentDataGroup, id];
          }
        }
        return ({
          ...dict,
          [draggable.dataset.belongsTo]: updatedGroupData,
        })
      }
      return dict;
    });
  }


  const _nulling = useCallback(() => {
    setEdge();
    setDraggingId();
    setDroppableId();

    transformGhost({ x: -1000, y: -1000, ghostId });

    DragScroller.cancel();

    ghostRectRef.current = undefined;
  }, [ghostId, setEdge, setDraggingId, setDroppableId, selectedDraggingIds]);

  const onMouseUp = useCallback(() => {
    try {
      const droppableId = edgeDraggableIdRef.current
        ? draggableRefs.current[edgeDraggableIdRef.current]?.dataset?.belongsTo
        : droppableIdRef.current;
      if (!droppableId || !draggingIdRef.current) return;

      const edgeIndex = calcEdgeIndex({
        edge: edgeRef.current,
        droppable: droppableRefs.current[droppableId],
        draggingId: draggingIdRef.current,
        draggables: draggableRefs.current,
        edgeDraggableId: edgeDraggableIdRef.current,
      });

      if (edgeIndex === -1) return;

      const prevIndex =
        +draggableRefs.current[draggingIdRef.current].dataset.index!;
      const prevDroppableId =
        draggableRefs.current[draggingIdRef.current].dataset.belongsTo!;

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
        draggableId: draggingIdRef.current,
        selectedDraggedIds: selectedDraggingIds ?  selectedDraggingIds[prevDroppableId] : [],
      });
      setSelectedDraggingIds((dict = {}) => ({
        ...dict,
        [prevDroppableId]: []
      }))
    } finally {
      _nulling();
    }
  }, [_nulling]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!draggingIdRef.current) return;

    if (!ghostRectRef.current)
      ghostRectRef.current = getGhost().getBoundingClientRect();

    const { width, height } = ghostRectRef.current;

    transformGhost({
      y: e.pageY - height / 2,
      x: e.pageX - width / 2,
    });
    DragScroller.update(e);
  }, []);

  const addEvents = useCallback(() => {
    const eventEl = isReactAbove16
      ? (document.getElementById(rootId!) as unknown as HTMLElement)
      : document;

    eventEl.addEventListener("mouseup", onMouseUp);
    // @ts-ignore
    eventEl.addEventListener("mousemove", onMouseMove);
  }, [rootId, isReactAbove16, onMouseUp, onMouseMove]);

  const offEvents = useCallback(() => {
    const eventEl = isReactAbove16
      ? (document.getElementById(rootId!) as unknown as HTMLElement)
      : document;

    eventEl.removeEventListener("mouseup", onMouseUp);
    // @ts-ignore
    eventEl.removeEventListener("mousemove", onMouseMove);
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
              setOriginDroppable,
              onSelectDraggable,
              selectedDraggingIds
            }}
          >
            {typeof children === "function"
              ? children({ draggingId, originDroppable, selectedDraggingIds })
              : children}
          </ControllerContext.Provider>
        </ConfigContext.Provider>
      </DraggableContext.Provider>
    </DragDropContext.Provider>
  );
};

export default DragDropProvider;
