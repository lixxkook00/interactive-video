import { fadeIn, fadeOut } from '@/animations';
import { AbstractLayout, Container } from '@/components';
import { PRODUCT_DETAILS } from '@/constants/product';
import { assignStyle, cssPercentage, registerTextResize } from '@/utils';

const IMAGES = ['spider', 'groot'];
const THUMBS_NUM = [
  [6, 4, 6],
  [6, 4, 4]
];

const createText = (text: string) => {
  const div = document.createElement('div');
  const p = document.createElement('p');
  p.innerHTML = text;

  assignStyle(p, {
    fontFamily: "'Roboto Condensed - Regular', sans-serif",
    textAlign: 'start',
    color: '#ffffff'
  });
  assignStyle(div, { width: '100%' });

  div.append(p);

  return div;
};

export default class LayoutProductDetails extends AbstractLayout {
  bg: IImageComponent;
  image: IImageComponent;
  text: ITextComponent;
  star: IImageComponent;
  thumbContainer: Container;
  textDiv: Container;
  menuIndex: number = 0;
  thumbOverflow: HTMLElement;
  index = -1;
  activeIndex = 0;
  list: { image: IImageComponent; text: ITextComponent; details: HTMLDivElement }[] = [];
  onclick: (index: number) => void = () => {};

  constructor(app: IApp, index: number) {
    super(app);

    this.index = index;
    this.bg = this.add.image(138, 124, `${IMAGES[this.menuIndex]}-bg-details.png`);

    const config = PRODUCT_DETAILS[this.menuIndex][index];

    this.image = this.add.image(164, 156, `${IMAGES[this.menuIndex]}-img-${this.index + 1}-0.png`);

    this.text = this.add.text(164, 555, 650, 76, config.name, 32);
    assignStyle(this.text.paragraph, {
      fontFamily: "'Roboto Condensed', sans-serif",
      textAlign: 'start'
    });

    this.star = this.add.image(240, 555, `${IMAGES[this.menuIndex]}-star.png`);
    this.star.onload = () => {
      assignStyle(this.star.node, { width: '15%', height: 'auto' });
    };

    this.textDiv = this.add.container(278, 555, 650, 234);

    config.details?.forEach((text) => {
      const item = createText(text);
      this.resizeText(item.firstElementChild as HTMLElement);
      this.textDiv.node.append(item);
    });

    const cta = this.add.image(590, 555, 'main-ui-btn-cart-lg.png');
    cta.on('click', () => {
      this.onclick(index);
    });

    this.thumbContainer = this.add.container(561, 156, 381, 70);
    this.thumbOverflow = document.createElement('div');
    this.thumbContainer.node.append(this.thumbOverflow);

    assignStyle(this.thumbContainer.node, {
      overflowY: 'hidden',
      paddingBottom: cssPercentage(12, this.height)
    });

    assignStyle(this.thumbOverflow, { display: 'flex', columnGap: cssPercentage(41, 381), height: '100%' });
  }

  resizeText(element: HTMLElement) {
    registerTextResize(element, 22, this.width, this.height, this.app.width, this.app.height);
  }

  animateEntrance(index = this.menuIndex) {
    this.updateDisplay(index);

    this.floatIn(0, 100);
  }

  updateDisplay(index = this.menuIndex) {
    this.menuIndex = index;

    const config = PRODUCT_DETAILS[this.menuIndex][this.index];

    this.image.setImage(`images/${IMAGES[this.menuIndex]}-img-${this.index + 1}-0.png`);
    this.bg.setImage(`images/${IMAGES[this.menuIndex]}-bg-details.png`);

    this.text.setText(config.name);

    this.textDiv.node.innerHTML = '';

    config.details?.forEach((text) => {
      const item = createText(text);
      this.resizeText(item.firstElementChild as HTMLElement);
      this.textDiv.node.append(item);
    });

    this.thumbOverflow.innerHTML = '';

    const length = THUMBS_NUM[this.menuIndex][this.index];

    assignStyle(this.thumbOverflow, {
      width: `${((41 * (length - 1) + 64 * length) / this.thumbContainer.width) * 100}%`,
      columnGap: cssPercentage(41, 41 * (length - 1) + 64 * length)
    });

    if (THUMBS_NUM[this.menuIndex][this.index] > 4) this.thumbContainer.node.classList.add('overflow-x-scroll');
    else this.thumbContainer.node.classList.remove('overflow-x-scroll');

    this.thumbContainer?.node.classList.remove('spider-scroll');
    this.thumbContainer?.node.classList.remove('groot-scroll');
    this.thumbContainer?.node.classList.add(`${IMAGES[index]}-scroll`);

    this.star.setImage(`images/${IMAGES[this.menuIndex]}-star.png`);

    const thumbs = Array.from({ length: THUMBS_NUM[this.menuIndex][this.index] }, (_, i) => {
      const image = document.createElement('img');
      image.src = `images/${IMAGES[this.menuIndex]}-img-${this.index + 1}-${Math.min(i, 3)}.png`;

      const div = document.createElement('div');
      div.append(image);
      this.thumbOverflow.append(div);

      if (this.activeIndex !== i) fadeOut(div, { alpha: 0.4, duration: 0 });

      div.addEventListener('click', () => {
        thumbs.forEach((t, j) => {
          if (i === j) fadeIn(t, { alpha: 1, duration: 0.2 });
          else fadeOut(t, { alpha: 0.4, duration: 0.2 });
        });
        this.image.setImage(`images/${IMAGES[this.menuIndex]}-img-${this.index + 1}-${Math.min(i, 3)}.png`);
      });

      return div;
    });
  }
}
