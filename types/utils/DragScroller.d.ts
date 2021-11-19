declare class DragScroller {
    timer: number;
    xCancelToken: boolean;
    yCancelToken: boolean;
    private cancelY;
    private cancelX;
    private scrollY;
    private scrollX;
    private updateY;
    private updateX;
    cancel: () => void;
    update: (e: MouseEvent) => void;
}
declare const dragScroller: DragScroller;
export default dragScroller;
