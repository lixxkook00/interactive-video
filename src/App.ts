import { assignStyle } from './utils';

export default class App implements IApp {
  readonly node: HTMLElement;
  readonly width: number;
  readonly height: number;
  staticPath = '';

  constructor(id: string, width: number, height: number, staticPath = '') {
    this.width = width;
    this.height = height;
    this.node = document.getElementById(id) as HTMLElement;
    this.staticPath = staticPath;

    assignStyle(this.node, {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      overflow: 'hidden',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: `${this.width}px`,
      maxHeight: `${this.height}px`
    });

    this.resize();
    addEventListener('resize', this.resize.bind(this));
    addEventListener('orientationchange', this.resize.bind(this));
  }

  private resize() {
    if (innerWidth / innerHeight > this.width / this.height) {
      this.node.style.height = innerHeight + 'px';
      this.node.style.width = (innerHeight / this.height) * this.width + 'px';
    } else {
      this.node.style.width = innerWidth + 'px';
      this.node.style.height = (innerWidth * this.height) / this.width + 'px';
    }
  }
}
