import { CSSProperties } from "react";
import DragItem from "../DragItem";
import { Wrapper } from "./style";
import { Data } from "../../types";
import { Droppable } from "../../../src";
import React from "react";

type Props = {
  id?: string;
  data: Data;
  style?: CSSProperties;
  draggableId?: string;
};

const Container: React.FC<Props> = (props) => {
  const { id, data, style, draggableId } = props;
  return (
    <Droppable id={"outermost-droppable"} draggableId={draggableId}>
      {(droppableProps) => {
        return (
            <Wrapper
                {...droppableProps}
                style={style}
                noContent={(data || []).length === 0}
            >
              {(data || []).map((item, index) => {
                return (
                    <DragItem
                        key={index}
                        data={item}
                        index={index}
                        droppableId={"outermost-droppable"}
                    />
                );
              })}
            </Wrapper>
        )
      }}
    </Droppable>
  );
};

export default Container;
