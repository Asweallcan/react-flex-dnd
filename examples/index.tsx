import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import { Data } from "./types";
import { Canvas, Palette } from "./components";
import { findData, removeData } from "./utils";
import { Ghost, DragDropProvider } from "../src";

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
      onDragEnd={({ to, from, draggableId }) => {
        console.error(to, from, draggableId);
      }}
    >
      {({ draggingId }) => {
        return (
          <Wrapper>
            <Palette />
            <Canvas data={data} />
            <Ghost>
              {draggingId ? (
                <GhostContent>
                  {draggingId.split("-")[2]
                    ? draggingId.split("-")[2] === "item"
                      ? "add item"
                      : "add container"
                    : findData({ data, id: draggingId }).label}
                </GhostContent>
              ) : null}
            </Ghost>
          </Wrapper>
        );
      }}
    </DragDropProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
