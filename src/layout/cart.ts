import { AbstractLayout, Container, ImageComponent, TextComponent } from '@/components';
import { PRODUCT_DETAILS } from '@/constants/product';
import { assignStyle, cssPercentage, registerTextResize } from '@/utils';

const IMAGES = ['spider', 'groot'];

export default class LayoutCart extends AbstractLayout {
  bg: IImageComponent;
  activeIndex = 0;
  menuIndex = 0;
  container?: Container;
  copyBtn?: IImageComponent;
  star?: IImageComponent;
  copyContainer?: Container;
  initialized = false;
  list: Record<
    string,
    {
      container: Container;
      amount: number;
      count: ITextComponent;
      add: IImageComponent;
      remove: IImageComponent;
      image: IImageComponent;
    }
  > = {};
  onAdd: () => void = () => {};
  onRemove: () => void = () => {};
  next: () => void = () => {};
  removeCopyEffect: () => void = () => {};

  constructor(app: IApp) {
    super(app);

    this.bg = this.add.image(138, 141, `${IMAGES[this.menuIndex]}-bg-products.png`);
    this.bg.onload = () => {
      if (this.initialized) return;

      this.initialized = true;

      this.container = this.add.container(148, 141, this.bg.width - 22, this.bg.height - 26 * 2);

      this.copyContainer = this.add.container(148 - 14, 141, this.bg.width, this.bg.height).hide();

      this.container.node.classList.add('overflow-y-scroll');
      assignStyle(this.container.node, {
        display: 'flex',
        overflow: 'hidden',
        overflowY: 'scroll',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        justifyContent: 'space-evenly',
        paddingTop: `${cssPercentage(13, this.bg.height)}`,
        rowGap: `${cssPercentage(26, this.bg.height)}`
      });

      const text = this.copyContainer.add.text(302, 210, 689, 59, "You've copied the link to clipboard", 50);
      assignStyle(text.paragraph, { fontFamily: "'Roboto Condensed', sans-serif", textAlign: 'start', height: '100%' });
      registerTextResize(text.paragraph, 50, this.width, this.height, this.app.width, this.app.height);

      this.copyContainer.add.image(91, 440, 'main-i-check.png');
      const field = this.copyContainer.add.image(389, 263, 'main-ui-field.png');
      const link = this.copyContainer.add.text(408, 287, 335, 28, 'https://teamupwithmarvel.com/0051', 22);
      assignStyle(link.paragraph, {
        fontFamily: "'Roboto Condensed', sans-serif",
        textAlign: 'start',
        height: '100%',
        color: '#000000',
        transition: 'all 0.5s ease'
      });
      registerTextResize(link.paragraph, 22, this.width, this.height, this.app.width, this.app.height);

      const btn = this.copyContainer.add.image(402, 778, 'main-i-copy.png');

      const tooltip = document.createElement('span');
      tooltip.className = 'tooltip-text';
      tooltip.innerHTML = 'Copied';

      btn.node.appendChild(tooltip);
      assignStyle(tooltip, { padding: '12% 25%', borderRadius: '12px', fontSize: '14px' });

      registerTextResize(tooltip, 18, this.width, this.height, this.app.width, this.app.height);

      btn.on('click', () => {
        navigator.clipboard.writeText('https://teamupwithmarvel.com/0051');

        field.image.src = 'images/main-ui-field-active.png';
        assignStyle(link.paragraph, { color: '#3A73D3' });
        assignStyle(tooltip, { visibility: 'visible' });

        const timeout = setTimeout(() => {
          this.next();
          removeEventListener('click', removeTimeout);
        }, 3000);

        const removeTimeout = () => clearTimeout(timeout);

        setTimeout(() => {
          addEventListener('click', removeTimeout, { once: true });
        });
      });

      this.removeCopyEffect = () => {
        field.image.src = 'images/main-ui-field.png';
        assignStyle(link.paragraph, { color: '#000000' });
        assignStyle(tooltip, { visibility: 'hidden' });
      };
    };

    assignStyle(this.node, { display: 'flex', overflow: 'hidden', overflowY: 'scroll' });

    this.copyBtn = this.add.image(610, 527, 'main-ui-copy.png').setDepth(1);
    this.copyBtn.on('click', () => {
      this.copyBtn?.setAlpha(0);
      this.copyContainer?.show();
      this.container?.hide();
      navigator.clipboard.writeText('https://teamupwithmarvel.com/0051');
    });
  }

  open(index = this.menuIndex) {
    this.menuIndex = index;

    this.copyBtn?.setAlpha(1);
    if (this.container)
      assignStyle(this.container?.node, {
        display: 'flex'
      });
    this.container?.setAlpha(1);
    this.copyContainer?.hide();
    this.bg.setImage(`images/${IMAGES[this.menuIndex]}-bg-products.png`);
    this.removeCopyEffect();

    this.container?.node.classList.remove('spider-scroll');
    this.container?.node.classList.remove('groot-scroll');
    this.container?.node.classList.add(`${IMAGES[index]}-scroll`);

    this.floatIn(0, 100);
  }

  createProduct(name: string, index: number) {
    const product = this.container?.add.container(0, 0, 1008, 176) as Container;

    const image = new ImageComponent(product, 0, 0, `images/${IMAGES[this.menuIndex]}-img-${index + 1}-0.png`);
    image.onload = () => {
      assignStyle(image.node, { width: 'auto', height: cssPercentage(160, 176) });
    };

    assignStyle(product.node, {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      overflow: 'hidden',
      borderBottom: 'solid 1px #FFFFFFCC',
      paddingBottom: cssPercentage(16, this.height),
      order: `${Object.keys(this.list).length}`
    });

    const text = new TextComponent(product, 0, 208, 800, 176, name, 22);
    assignStyle(text.paragraph, { fontFamily: "'Roboto Condensed', sans-serif", textAlign: 'start', height: '100%' });
    registerTextResize(text.paragraph, 22, this.width, this.height, this.app.width, this.app.height);

    this.star = product.add.image(60, 208, `${IMAGES[this.menuIndex]}-star.png`);
    this.star.onload = () => {
      if (this.star) assignStyle(this.star.node, { width: '20%', height: 'auto' });
    };

    const count = product.add.text(112, 245, 34, 48, '1', 28);
    assignStyle(count.paragraph, {
      fontFamily: "'Roboto Condensed', sans-serif",
      color: '#ffffff'
    });

    const remove = product.add.image(112, 208, `main-minus.png`).setAlpha(0.4);
    remove.on('click', () => {
      if (this.list[name].amount === 1) return;

      this.list[name].amount--;
      count.setText(this.list[name].amount.toString());
      if (this.list[name].amount === 1) remove.setAlpha(0.4);

      this.onRemove();
    });

    const add = product.add.image(112, 286, `main-plus.png`);
    add.on('click', () => {
      this.list[name].amount++;
      count.setText(this.list[name].amount.toString());

      remove.setAlpha(1);

      this.onAdd();
    });

    return { product, count, add, remove, image };
  }

  addProduct(index: number) {
    const { name } = PRODUCT_DETAILS[this.menuIndex][index];

    if (this.list[name]) {
      this.list[name].amount++;
      this.list[name].count.setText(this.list[name].amount.toString());
      this.list[name].remove.setAlpha(1);
    } else {
      const { product, image, count, add, remove } = this.createProduct(name, index);
      this.list[name] = { container: product, amount: 1, count, add, remove, image };
    }
  }
}
