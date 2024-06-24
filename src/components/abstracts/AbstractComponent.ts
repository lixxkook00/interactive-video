import gsap from 'gsap';

import { fadeIn, fadeOut, fadeOutBy, floatIn, zoomIn, zoomOut } from '@/animations';
import { assignStyle, cssPercentage } from '@/utils';

export default abstract class AbstractComponent implements IAbstractComponent {
  readonly node = document.createElement('div');
  readonly app: IApp;
  readonly parent: IApp | IAbstractComponent;
  readonly width: number;
  readonly height: number;
  top: number;
  left: number;

  constructor(parent: IApp | IAbstractComponent, top: number, left: number, width: number, height: number) {
    this.parent = parent;
    this.app = (parent as IAbstractComponent)?.app ?? parent;
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
  }

  get staticPath() {
    return this.app.staticPath ?? '';
  }

  protected init() {
    assignStyle(this.node, {
      position: 'absolute',
      width: cssPercentage(this.width, this.parent.width),
      height: cssPercentage(this.height, this.parent.height),
      top: cssPercentage(this.top, this.parent.height),
      left: cssPercentage(this.left, this.parent.width)
    });

    this.parent.node.appendChild(this.node);
  }

  append(component: IAbstractComponent) {
    this.node.appendChild(component.node);
  }

  setAlpha(alpha: number) {
    gsap.set(this.node, { alpha });
    return this;
  }

  setDepth(value: number) {
    assignStyle(this.node, { zIndex: `${value}` });
    return this;
  }

  setPosition(x = 0, y = x) {
    gsap.set(this.node, { x, y });
    return this;
  }

  setScale(scaleX: number, scaleY = scaleX) {
    gsap.set(this.node, { scaleX, scaleY });
    return this;
  }

  on<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ) {
    this.node.addEventListener(type, listener, options);
    return this;
  }

  once<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ) {
    this.node.addEventListener(
      type,
      listener,
      typeof options === 'object' ? { once: true, ...options } : { capture: options, once: true }
    );
    return this;
  }

  setInteractive() {
    assignStyle(this.node, { pointerEvents: 'auto' });
    return this;
  }

  removeInteractive() {
    assignStyle(this.node, { pointerEvents: 'none' });
    return this;
  }

  show() {
    assignStyle(this.node, { display: 'block' });
    return this;
  }

  hide() {
    assignStyle(this.node, { display: 'none' });
    return this;
  }

  fadeIn(callback = () => {}) {
    this.show();

    fadeIn(this.node, {
      onComplete: () => {
        callback();
        this.setInteractive();
      }
    });

    return this;
  }

  floatIn(x: number, y: number, callback = () => {}) {
    this.show();

    floatIn(this.node, x, y, {
      onComplete: () => {
        callback();
        this.setInteractive();
      }
    });

    return this;
  }

  fadeOut(callback = () => {}) {
    this.removeInteractive();

    fadeOut(this.node, {
      onComplete: () => {
        this.hide();
        callback();
      }
    });

    return this;
  }

  fadeOutBy(x: number, y: number, callback = () => {}) {
    this.removeInteractive();

    fadeOutBy(this.node, x, y, {
      onComplete: () => {
        this.hide();
        callback();
      }
    });

    return this;
  }

  zoomIn(callback = () => {}) {
    this.show();

    zoomIn(this.node, {
      onComplete: () => {
        callback();
        this.setInteractive();
      }
    });

    return this;
  }

  zoomOut(callback = () => {}) {
    this.removeInteractive();

    zoomOut(this.node, {
      onComplete: () => {
        this.hide();
        callback();
      }
    });

    return this;
  }
}
