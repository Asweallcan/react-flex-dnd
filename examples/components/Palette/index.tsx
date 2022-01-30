import { Draggable } from "../../../src";

import mockItems from "../../mock";
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
      {mockItems
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
