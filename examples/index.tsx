import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import { Data } from "./types";
import { Ghost, Draggable, Droppable, DragDropProvider } from "../src";
import { removeData, findData } from "./utils";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 600px;
  display: flex;
  flex-wrap: wrap;
`;

const DragItem = styled.div`
  margin: 10px;
  border: 2px solid gray;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  width: 200px;
  min-height: 50px;
`;

const GhostContent = styled.div`
  border-radius: 4px;
  width: 100px;
  height: 40px;
  background-color: aliceblue;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const List: React.FC = () => {
  const [list, setList] = useState<Data>([
    { key: "1", content: "a" },
    { key: "2", content: "b" },
    { key: "3", content: "c" },
    {
      key: "7",
      content: "g",
      children: [
        { key: "8", content: "g-1" },
        { key: "9", content: "g-2" },
        { key: "10", content: "g-3" },
      ],
    },
    {
      key: "100",
      content: "x",
      children: [
        { key: "101", content: "x-1" },
        { key: "102", content: "x-2" },
        { key: "103", content: "x-3" },
      ],
    },
  ]);

  return (
    <DragDropProvider
      rootId="app"
      onDragEnd={({ to, draggableId }) => {
        const movedData = findData({ data: list, key: draggableId });

        let cloneList = removeData({ data: list.concat(), key: draggableId });

        if (to.droppableId !== "outerDroppable") {
          const parent = findData({ data: cloneList, key: to.droppableId });
          if (!parent.children) parent.children = [];
          parent.children.splice(to.index, 0, movedData);
        } else {
          cloneList.splice(to.index, 0, movedData);
        }

        setList(cloneList);
      }}
    >
      {({ draggingId }) => {
        return (
          <Wrapper>
            <Ghost>
              <GhostContent>
                {findData({ data: list, key: draggingId })?.content}
              </GhostContent>
            </Ghost>
            <Droppable id="outerDroppable">
              {(droppableProps) => {
                return (
                  <Container {...droppableProps}>
                    {list.map((listItem, index) => {
                      const { key, content, children } = listItem;

                      if (Array.isArray(children) && children.length > 0) {
                        return (
                          <Draggable
                            id={key}
                            index={index}
                            sortable
                            belongsTo="outerDroppable"
                          >
                            {(draggableProps) => {
                              const { edge = "" } = draggableProps;

                              let capitalizedEdge: string =
                                (edge[0] || "").toUpperCase() + edge.slice(1);

                              return (
                                <DragItem
                                  {...draggableProps}
                                  style={
                                    capitalizedEdge
                                      ? {
                                          [`border${capitalizedEdge}Color`]:
                                            "#f00",
                                        }
                                      : undefined
                                  }
                                >
                                  <Droppable id={key} draggableId={key}>
                                    {(droppableProps) => {
                                      return (
                                        <Container {...droppableProps}>
                                          <div
                                            style={{
                                              color: "#f00",
                                              fontSize: 20,
                                              textAlign: "center",
                                            }}
                                          >
                                            {content}-parent
                                          </div>
                                          {children.map((child, index) => {
                                            const { key, content } = child;

                                            return (
                                              <Draggable
                                                id={key}
                                                index={index}
                                                sortable
                                                belongsTo={listItem.key}
                                              >
                                                {(draggableProps) => {
                                                  const { edge = "" } =
                                                    draggableProps;

                                                  let capitalizedEdge: string =
                                                    (
                                                      edge[0] || ""
                                                    ).toUpperCase() +
                                                    edge.slice(1);

                                                  return (
                                                    <div>
                                                      <DragItem
                                                        {...draggableProps}
                                                        style={
                                                          capitalizedEdge
                                                            ? {
                                                                [`border${capitalizedEdge}Color`]:
                                                                  "#f00",
                                                              }
                                                            : undefined
                                                        }
                                                      >
                                                        {content}
                                                      </DragItem>
                                                    </div>
                                                  );
                                                }}
                                              </Draggable>
                                            );
                                          })}
                                        </Container>
                                      );
                                    }}
                                  </Droppable>
                                </DragItem>
                              );
                            }}
                          </Draggable>
                        );
                      }

                      return (
                        <div>
                          <Draggable
                            id={key}
                            index={index}
                            sortable
                            belongsTo="outerDroppable"
                          >
                            {(draggableProps) => {
                              const { edge = "" } = draggableProps;

                              let capitalizedEdge: string =
                                (edge[0] || "").toUpperCase() + edge.slice(1);

                              return (
                                <DragItem
                                  {...draggableProps}
                                  style={
                                    capitalizedEdge
                                      ? {
                                          [`border${capitalizedEdge}Color`]:
                                            "#f00",
                                        }
                                      : undefined
                                  }
                                >
                                  {content}
                                </DragItem>
                              );
                            }}
                          </Draggable>
                        </div>
                      );
                    })}
                  </Container>
                );
              }}
            </Droppable>
          </Wrapper>
        );
      }}
    </DragDropProvider>
  );
};

ReactDOM.render(<List />, document.getElementById("app"));
