import { assignStyle, cssPercentage } from '@/utils';
import { AbstractComponent } from '.';

export default class ImageComponent extends AbstractComponent implements IImageComponent {
  readonly node = document.createElement('div');
  readonly image = document.createElement('img');
  width = 0;
  height = 0;
  onload = () => {};

  constructor(parent: IApp | IAbstractComponent, top: number, left: number, src: string) {
    super(parent, top, left, 0, 0);

    this.image.src = src;
    this.image.alt = '';
    this.image.onload = () => {
      this.width = this.image.naturalWidth;
      this.height = this.image.naturalHeight;

      assignStyle(this.node, {
        width: cssPercentage(this.width, this.parent.width),
        height: cssPercentage(this.height, this.parent.height)
      });

      this.node.appendChild(this.image);

      this.onload();
    };

    this.init();
  }

  setImage(src: string) {
    this.image.src = src;
    return this;
  }
}
