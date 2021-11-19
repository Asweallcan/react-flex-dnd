/* eslint-disable no-shadow */
import { FC, useContext } from "react";
import { createPortal } from "react-dom";

import { getGhost } from "../utils";
import { ConfigContext } from "../contexts";

type Props = {
  // void
};

const Ghost: FC = (props) => {
  const { children } = props;

  const { ghostId } = useContext(ConfigContext);

  const ghost = getGhost(ghostId);

  if (!ghost) return null;

  return createPortal(
    typeof children === "function" ? children() : children,
    ghost
  );
};

export default Ghost;
