import React from "react";
import { CSSProperties } from "react";
import { Droppable } from "react-flex-dnd";

import DragItem from "../DragItem";
import { Wrapper } from "./style";
import { Data } from "../../types";

type Props = {
  id?: string;
  data?: Data;
  label?: string;
  style?: CSSProperties;
  draggableId?: string;
};

const Container: React.FC<Props> = (props) => {
  const { id, data, label, style, draggableId } = props;

  return (
    <Droppable id={id || "outermost-droppable"} draggableId={draggableId}>
      {(droppableProps) => (
        <Wrapper
          {...droppableProps}
          style={style}
          noContent={(data || []).length === 0}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            {label}
          </div>
          {(data || []).map((item, index) => {
            return (
              <DragItem
                key={item.id}
                data={item}
                index={index}
                droppableId={id || "outermost-droppable"}
              />
            );
          })}
        </Wrapper>
      )}
    </Droppable>
  );
};

export default Container;
