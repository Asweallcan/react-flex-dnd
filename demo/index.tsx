import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import elements from "./elements";
import { Data } from "./types";
import { Canvas, Palette } from "./components";
import { Ghost, DragDropProvider } from "../src";
import { removeData, containerAddItem } from "./utils";
import { PaletteItem } from "./components/Palette/style";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const GhostContent = styled(PaletteItem)`
  background-color: aliceblue;
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
            elements.find((i) => i.id === draggableId)!
          );
        } else {
          containerAddItem({
            item: elements.find((i) => i.id === draggableId)!,
            data: nextData,
            destination: index,
            containerId: droppableId,
          });
        }

        console.info("data", nextData);

        setData(nextData);
      }}
    >
      {({ draggingId }) => {
        const draggingItem = elements.find((i) => i.id === draggingId)!;

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
