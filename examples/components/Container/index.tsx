import DragItem from "../DragItem";
import { Wrapper } from "./style";
import { Data } from "../../types";
import { Droppable } from "../../../src";

type Props = {
  id?: string;
  data: Data;
  draggableId?: string;
};

const Container: React.FC<Props> = (props) => {
  const { id, data, draggableId } = props;

  return (
    <Droppable id={id || "outermost-droppable"} draggableId={draggableId}>
      {(droppableProps) => (
        <Wrapper {...droppableProps} noContent={data.length === 0}>
          {data.map((item, index) => {
            return (
              <DragItem
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
