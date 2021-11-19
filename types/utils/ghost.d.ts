export declare const getGhost: (ghostId?: string | undefined) => HTMLElement;
export declare const createGhost: (ghostId?: string | undefined) => void;
export declare const removeGhost: (ghostId?: string | undefined) => void;
export declare const transformGhost: (params: {
    y: number;
    x: number;
    ghostId?: string;
}) => void;
