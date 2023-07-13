export declare const getGhost: (ghostId?: string) => HTMLElement;
export declare const createGhost: (ghostId?: string) => void;
export declare const removeGhost: (ghostId?: string) => void;
export declare const transformGhost: (params: {
    y: number;
    x: number;
    ghostId?: string;
}) => void;
