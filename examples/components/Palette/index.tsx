import * as React from "react";
import { Data } from "../../types";
import { Wrapper } from "./style";
import { Droppable } from "../../../src";
import DragItem from "../DragItem";
import { useEffect, useState } from "react";

type Props = {
  categoryTitle: string;
  droppableId: string;
  data: Data;
  draggingId: string;
};

const Palette: React.FC<Props> = (props) => {
  const { data, droppableId, categoryTitle, draggingId } = props;
  const [itemEntering, setItemEntering] = useState<boolean>();

  // drag completed: reset entering style
  useEffect(() => {
    if (!draggingId && itemEntering) {
      setItemEntering(false);
    }
  }, [draggingId])

  return (
    <Droppable
        id={droppableId}
        onDraggedItemEnters={() => setItemEntering(true)}
        onDraggedItemLeaves={() => setItemEntering(false)}
    >
      {(droppableProps) => {
        return (
            <Wrapper {...droppableProps} isItemEntering={itemEntering}>
              <>
                <h2>{categoryTitle}</h2>
                {data
                    .map((item, index) => {
                      const { id, label } = item;
                      return (
                          <DragItem
                              key={id+label}
                              data={item}
                              index={index}
                              droppableId={droppableId}
                          />
                      );
                    })}
              </>

            </Wrapper>
        )
      }}
    </Droppable>
  );
};

export default Palette;
