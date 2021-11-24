import { Item, Wrapper } from "./style";
import Container from "../Container";
import { Data } from "../../types";
import { Draggable } from "../../../src";

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
    <Draggable id={id} index={index} belongsTo={droppableId}>
      {(draggableProps) => (
        <Wrapper {...draggableProps} isContainer={type === "container"}>
          {type === "item" ? (
            <Item>{label}</Item>
          ) : (
            <Container id={id} draggableId={id} data={children} />
          )}
        </Wrapper>
      )}
    </Draggable>
  );
};

export default DragItem;
