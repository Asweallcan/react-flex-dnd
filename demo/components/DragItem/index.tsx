import React from "react";
import { Draggable } from "../../../src";

import { Item, Wrapper } from "./style";
import Container from "../Container";
import { Data } from "../../types";

type Props = {
  data: Data[number];
  index: number;
  droppableId: string;
};

const DragItem: React.FC<Props> = (props) => {
  const {
    data: { id, type, label, avatar, children },
    index,
    droppableId,
  } = props;

  return (
    <Draggable
      id={id}
      index={index}
      disabled
      belongsTo={droppableId}
      threshold={type === "container" ? 0.3 : 1}
    >
      {(draggableProps) => (
        <Wrapper {...draggableProps}>
          {type === "item" ? (
            <Item>
              {label}
              {avatar ? <img src={avatar} style={{ marginTop: 8 }} /> : null}
            </Item>
          ) : (
            <Container
              id={id}
              style={{ minWidth: 400, minHeight: 200, maxWidth: 800 }}
              label={label}
              data={children}
              draggableId={id}
            />
          )}
        </Wrapper>
      )}
    </Draggable>
  );
};

export default DragItem;
