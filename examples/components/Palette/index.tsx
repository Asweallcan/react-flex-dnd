import { Draggable } from "../../../src";

import { Wrapper, PaletteItem } from "./style";

const Palette: React.FC = () => {
  return (
    <Wrapper>
      {[
        { id: "palette-item-item", label: "item" },
        { id: "palette-item-container", label: "container" },
      ].map(({ id, label }, index) => {
        return (
          <Draggable id={id} index={index} sortable={false} belongsTo="palette">
            {(draggableProps) => (
              <PaletteItem {...draggableProps}>drag me: {label}</PaletteItem>
            )}
          </Draggable>
        );
      })}
    </Wrapper>
  );
};

export default Palette;
