import getClosestScrollable from "./getClosestScrollable";

class DragScroller {
  timer = Date.now();
  xCancelToken = false;
  yCancelToken = false;

  private cancelY = (): void => {
    this.yCancelToken = true;
  };

  private cancelX = (): void => {
    this.xCancelToken = true;
  };

  private scrollY = (params: {
    offset: number;
    scrollable: HTMLElement;
  }): void => {
    const { offset, scrollable } = params;

    this.yCancelToken = false;

    const animate = () => {
      if (this.yCancelToken) return;

      scrollable.scrollTop += offset || 0;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  private scrollX = (params: {
    offset: number;
    scrollable: HTMLElement;
  }): void => {
    const { offset, scrollable } = params;

    this.xCancelToken = false;

    const animate = () => {
      if (this.xCancelToken) return;

      scrollable.scrollLeft += offset || 0;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  private updateY = (scrollable: HTMLElement, pageY: number) => {
    const { top: scrollableTop, bottom: scrollableBottom } =
      scrollable.getBoundingClientRect();

    if (pageY - scrollableTop < 100) {
      this.scrollY({
        offset: -10,
        scrollable,
      });
    } else if (scrollableBottom - pageY < 100) {
      this.scrollY({
        offset: 10,
        scrollable,
      });
    } else {
      this.cancelY();
    }
  };

  private updateX = (scrollable: HTMLElement, pageX: number) => {
    const { left: scrollableLeft, right: scrollableRight } =
      scrollable.getBoundingClientRect();

    if (pageX - scrollableLeft < 100) {
      this.scrollX({
        offset: -10,
        scrollable,
      });
    } else if (scrollableRight - pageX < 100) {
      this.scrollX({
        offset: 10,
        scrollable,
      });
    } else {
      this.cancelX();
    }
  };

  cancel = (): void => {
    this.cancelX();
    this.cancelY();
  };

  update = (e: MouseEvent): void => {
    const currentTime = Date.now();

    if (currentTime - this.timer < 300) return;
    this.timer = currentTime;

    const scrollable = getClosestScrollable(e.composedPath())!;

    if (!scrollable) return;

    this.updateX(scrollable, e.pageX);
    this.updateY(scrollable, e.pageY);
  };
}

const dragScroller = new DragScroller();

export default dragScroller;
