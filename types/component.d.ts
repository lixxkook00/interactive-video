declare interface IAbstractComponent {
  readonly node: HTMLElement;
  readonly app: IApp;
  readonly parent?: IApp | IAbstractComponent;
  readonly staticPath?: string;
  width: number;
  height: number;
  top?: number;
  left?: number;

  append(component: IAbstractComponent): void;

  setAlpha(alpha: number): this;

  setDepth(depth: number): this;

  setScale(scale: number): this;

  show(): this;

  hide(): this;

  fadeIn(callback?: () => void): this;

  floatIn(x: number, y: number, callback?: () => void): this;

  fadeOut(callback?: () => void): this;

  fadeOutBy(x: number, y: number, callback?: () => void): this;

  zoomIn(callback?: () => void): this;

  zoomOut(callback?: () => void): this;

  on<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): this;
  on(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): this;

  once<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): this;
  once(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): this;

  off?();
}

declare interface IAbstractContainer extends IAbstractComponent {
  list: HTMLElement[];
  entries: Record<string, HTMLElement>;
}

declare interface IImageComponent extends IAbstractComponent {
  readonly image: HTMLImageElement;
  setImage: (src: string) => this;
  onload: () => void;
}

declare interface ITextComponent extends IAbstractComponent {
  readonly paragraph: HTMLParagraphElement;
  setText(text: string, style?: TextComponentStyle): this;
  addBackground(src: string): this;
  changeBackground(src: string): this;
}

declare interface IVideoComponent extends IAbstractComponent {
  readonly video: HTMLVideoElement;
  sources: HTMLSourceElement[];

  addSource(src: string, type?: HTMLVideoMediaType, index?: number): IVideoComponent;

  setSourceAt(url: string, index?: number): IVideoComponent;
}

declare type AbstractContainerConfig = {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  paddingX?: number;
  paddingY?: number;
  rowGap?: number;
  fontSize?: number;
};

declare interface IApp {
  readonly node: HTMLElement;
  readonly width: number;
  readonly height: number;
  staticPath?: string;
}

declare interface IAbstractLayout extends IAbstractComponent {}
