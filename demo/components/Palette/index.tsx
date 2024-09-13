import React from "react";
import { Draggable } from "../../../src";

import elements from "../../elements";
import { Data } from "../../types";
import { findData } from "../../utils";
import { Wrapper, PaletteItem } from "./style";

type Props = {
  data: Data;
};

const Palette: React.FC<Props> = (props) => {
  const { data } = props;

  return (
    <Wrapper>
      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
        Elements
      </div>
      {elements
        .filter((i) => !findData({ data, id: i.id }))
        .map(({ id, label }, index) => {
          return (
            <Draggable
              id={id}
              key={id}
              index={index}
              sortable={false}
              belongsTo="palette"
            >
              {(draggableProps) => (
                <PaletteItem {...draggableProps}>{label}</PaletteItem>
              )}
            </Draggable>
          );
        })}
    </Wrapper>
  );
};

export default Palette;
