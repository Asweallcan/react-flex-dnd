import { Data } from "../../types";
import { Wrapper } from "./style";
import { Droppable } from "../../../src";
import React from "react";
import DragItem from "../DragItem";

type Props = {
  categoryTitle: string;
  droppableId: string;
  data: Data;
};

const Palette: React.FC<Props> = (props) => {
  const { data, droppableId, categoryTitle } = props;

  return (
    <Droppable id={droppableId} >
      {(droppableProps) => {
        return (
            <Wrapper {...droppableProps}>
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
