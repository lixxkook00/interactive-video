import { assignStyle, cssPercentage } from '@/utils';
import { AbstractComponent } from '.';

export default class ImageSlider extends AbstractComponent implements IAbstractContainer {
  list: HTMLElement[] = [];
  entries: Record<string, HTMLElement> = {};
  onclick: (image?: HTMLElement, index?: number) => void = () => {};
  activeIndex = -1;

  constructor(parent: IAbstractComponent, top: number, left: number, width: number, height: number) {
    super(parent, top, left, width, height);

    this.init();
  }

  get length() {
    return this.list.length;
  }

  async add(key: string, url?: string) {
    const src = url ?? `${key}.png`;
    const image = document.createElement('img');
    this.node.appendChild(image);

    image.src = `${this.staticPath}${src}`;
    image.onload = async () => {
      this.list.push(image);
      image.onclick = () => this.handleClick(image);

      await this.updateDisplay();
    };
    return image;
  }

  reset() {
    this.list.forEach(async (img) => {
      img.onclick = () => this.handleClick(img);
      await this.updateDisplay();
    });
  }

  private handleClick(image: HTMLElement) {
    this.activeIndex = this.list.indexOf(image);

    this.list.forEach((img, i) => {
      img.onclick = null;
      assignStyle(img, { width: img === image || i === 1 ? '100%' : '0%', pointerEvents: 'none' });
    });

    this.onclick(image, this.activeIndex);
  }

  private async updateDisplay() {
    this.list.forEach((image, i) => {
      assignStyle(image, {
        position: 'absolute',
        width: cssPercentage((this.width * (i + 1)) / this.length, this.width),
        height: '100%',
        objectFit: 'cover',
        overflow: 'hidden',
        transition: 'all 0.5s ease-out',
        pointerEvents: 'auto',
        cursor: 'pointer',
        zIndex: `${this.length - i}`,
        borderRight: 'solid 2px white'
      });
    });
  }
}
