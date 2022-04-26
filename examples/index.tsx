import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import { Data } from "./types";
import mockItems from "./mock";
import { Palette } from "./components";
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

const categories : Category[] = [
    { id: 'palette-droppable', title: 'palette', data: mockItems },
    { id: 'outermost-droppable', title: 'outermost', data: [] },
    { id: 'test-extra-droppable', title: 'test-extra-droppable', data: [] },
]

type Category = {
    id: string;
    title: string;
    data: Data
}
type CategoriesData = Record<string, Data>;

const App: React.FC = () => {
  const [categoriesData, setCategoriesData] = useState<CategoriesData>(
      categories.reduce<CategoriesData>((acc, { id, data }) => ({ ...acc,  [id]: data }), {})
     );

  return (
    <DragDropProvider
      rootId="app"
      onDragEnd={({ selectedDraggedIds, from, to }) => {
        let originData: Data = [];
        if (from.droppableId !== to.droppableId) {
            originData = categoriesData[from.droppableId];
            const dataToDrag = originData.filter((item) => selectedDraggedIds.includes(item.id));
            setCategoriesData((catData) => ({
                ...catData,
                [from.droppableId]: originData.filter(item => !selectedDraggedIds.includes(item.id)),
                [to.droppableId]:[
                    ...categoriesData[to.droppableId].slice(0, to.index),
                    ...dataToDrag,
                    ...categoriesData[to.droppableId].slice(to.index),
                ]
            }))
        }
      }}
    >
      {({ selectedDraggingIds = {}, originDroppable }) => {
          console.log(categoriesData)
        return (
          <Wrapper>
              {
                  Object.keys(categoriesData).map((cat) =>  (
                      <Palette
                          key={cat}
                          categoryTitle={categories.find(({ id }) => id === cat)?.title || ''}
                          droppableId={cat}
                          data={categoriesData[cat]}
                      />
                      )
                  )
              }
              { originDroppable && selectedDraggingIds &&
                  <Ghost>
                  {
                      selectedDraggingIds && selectedDraggingIds[originDroppable]?.length ?
                          selectedDraggingIds[originDroppable].map((dragItemId) => {
                              return <GhostContent key={`ghost_${dragItemId}`}>{dragItemId}</GhostContent>
                          })
                          : <div>Nothing</div>
                  }
                </Ghost>
              }
          </Wrapper>
        );
      }}
    </DragDropProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
