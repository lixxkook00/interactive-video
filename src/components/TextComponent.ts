import { assignStyle, registerTextResize } from '@/utils';
import { AbstractComponent, ImageComponent } from '.';

export default class TextComponent extends AbstractComponent implements ITextComponent {
  readonly node = document.createElement('div');
  readonly paragraph = document.createElement('p');
  bg: ImageComponent | null = null;

  constructor(
    parent: IApp | IAbstractComponent,
    top: number,
    left: number,
    width: number,
    height: number,
    text: string,
    fontSize: number
  ) {
    super(parent, top, left, width, height);

    this.paragraph.innerHTML = text;
    this.node.append(this.paragraph);

    this.init();

    assignStyle(this.node, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    });

    assignStyle(this.paragraph, {
      position: 'absolute',
      width: '100%',
      textAlign: 'center',
      fontSize: `${fontSize}px`,
      color: '#ffffff'
    });

    registerTextResize(
      this.paragraph,
      fontSize,
      this.parent.width,
      this.parent.height,
      this.app.width,
      this.app.height
    );
  }

  setText(text: string) {
    this.paragraph.innerHTML = text;
    return this;
  }

  addBackground(src: string) {
    this.bg = new ImageComponent(this, 0, 0, src);
    this.bg.onload = () => {
      this.node.insertBefore(this.bg?.node as Node, this.paragraph);
    };
    return this;
  }

  changeBackground(src: string) {
    (this.bg as IImageComponent).image.src = src;
    return this;
  }
}
