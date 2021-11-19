import { GHOST_WRAPPER_ID } from "../constants";

const ghostRef = {
  current: null as HTMLElement | null,
};

export const getGhost = (ghostId?: string): HTMLElement => {
  if (!ghostRef.current) {
    ghostRef.current = document.getElementById(ghostId || GHOST_WRAPPER_ID)!;
  }

  return ghostRef.current;
};

export const createGhost = (ghostId?: string): void => {
  if (!getGhost()) {
    const div = document.createElement("div");

    div.style.zIndex = "100000";
    div.style.top = "0";
    div.style.left = "0";
    div.style.position = "absolute";
    div.style.transform = "transform";
    div.style.transform = "translate3d(-1000px, -1000px, 0)";
    div.style.pointerEvents = "none";

    div.id = ghostId || GHOST_WRAPPER_ID;

    document.body.appendChild(div);
  }
};

export const removeGhost = (ghostId?: string): void => {
  const ghost = getGhost(ghostId);

  if (ghost) {
    ghost.remove();
    ghostRef.current = null;
  }
};

export const transformGhost = (params: {
  y: number;
  x: number;
  ghostId?: string;
}): void => {
  const { y, x, ghostId } = params;

  const ghost = getGhost(ghostId);

  if (!ghost) return;

  ghost.style.transform = `translate3d(${x}px, ${y}px, 0)`;
};
