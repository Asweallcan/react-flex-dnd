import { Item, Wrapper } from "./style";
import Container from "../Container";
import { Data } from "../../types";
import { Draggable } from "../../../src";
import React from "react";

type Props = {
  data: Data[number];
  index: number;
  droppableId: string;
};

const DragItem: React.FC<Props> = (props) => {
  const {
    data: { id, type, label, children },
    index,
    droppableId,
  } = props;

  return (
    <Draggable
      id={id}
      index={index}
      belongsTo={droppableId}
      threshold={type === "container" ? 0.3 : 1}
    >
      {(draggableProps) => (
        <Wrapper {...draggableProps} isContainer={type === "container"}>
          {type === "item" ? (
            <Item>{label}</Item>
          ) : (
            <Container
              id={id}
              data={children}
              style={{
                minHeight: "50px",
                height: "fit-content",
                border: "1px solid #3370ff",
                flexDirection: "column"
              }}
              draggableId={id}
            />
          )}
        </Wrapper>
      )}
    </Draggable>
  );
};

export default DragItem;
