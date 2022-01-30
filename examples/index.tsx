import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import { Data } from "./types";
import mockItems from "./mock";
import { Canvas, Palette } from "./components";
import { Ghost, DragDropProvider } from "../src";
import { removeData, containerAddItem } from "./utils";

const Wrapper = styled.div`
  display: flex;
`;

const GhostContent = styled.div`
  border-radius: 4px;
  padding: 12px;
  background-color: aliceblue;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const App: React.FC = () => {
  const [data, setData] = useState<Data>([]);

  return (
    <DragDropProvider
      rootId="app"
      onDragEnd={({ to, draggableId }) => {
        let nextData = removeData({ data, id: draggableId });

        const { droppableId, index } = to;

        if (droppableId === "outermost-droppable") {
          nextData.splice(
            index,
            0,
            mockItems.find((i) => i.id === draggableId)
          );
        } else {
          containerAddItem({
            item: mockItems.find((i) => i.id === draggableId),
            data: nextData,
            destination: index,
            containerId: droppableId,
          });
        }

        setData(nextData);
      }}
    >
      {({ draggingId }) => {
        const draggingItem = mockItems.find((i) => i.id === draggingId);

        return (
          <Wrapper>
            <Palette data={data} />
            <Canvas data={data} />
            <Ghost>
              {draggingId ? (
                <GhostContent>{draggingItem.label}</GhostContent>
              ) : null}
            </Ghost>
          </Wrapper>
        );
      }}
    </DragDropProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
