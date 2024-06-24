import { AbstractLayout, Container } from '@/components';
import { LayoutProduct, LayoutProductDetails } from '.';
import { fadeOut, fadeOutBy, floatIn, idle, zoomIn, zoomOut } from '@/animations';
import LayoutCart from './cart';
import { assignStyle, cssPercentage, registerTextResize } from '@/utils';

const IMAGES = ['spider', 'groot'];

export default class Layout extends AbstractLayout {
  product: LayoutProduct;
  details: LayoutProductDetails[];
  controls: Container;
  cartLayout: LayoutCart;
  cart: IImageComponent;
  cartIndicator: ITextComponent;
  carouselIndicator: Container;
  arrowPrev: IImageComponent;
  arrowNext: IImageComponent;
  activeIndex = 0;
  menuIndex = 0;
  count = 0;
  next: () => void = () => {};

  constructor(app: IApp) {
    super(app);

    this.product = new LayoutProduct(app);
    this.append(this.product);

    this.details = [];

    const createLayout = (i: number) => {
      const layout = new LayoutProductDetails(app, i);
      layout.fadeOut();
      this.append(layout);
      layout.onclick = (index: number) => {
        this.cartLayout.menuIndex = this.menuIndex;
        this.cartLayout.addProduct(index);
        this.addProduct();
      };
      this.details.push(layout);
    };

    for (let i = 0; i < 3; i++) {
      createLayout(i);
    }

    for (let i = 2; i >= 0; i--) {
      createLayout(i);
    }

    this.product.onclick = (index) => {
      this.activeIndex = index;
      this.details.forEach((detail) => {
        detail.updateDisplay(this.menuIndex);
      });
      this.details[index].animateEntrance(this.menuIndex);
      this.controls.floatIn(0, 100);
      floatIn(this.carouselIndicator.node, 0, 100);
      this.updateDisplay();
    };

    this.controls = this.add.container(354, 0, this.width, 60);
    this.controls.fadeOut();

    this.arrowPrev = this.controls.add.image(0, 38, 'spider-carousel-prev.png');
    this.arrowPrev.on('click', () => this.animatePrev());

    this.arrowNext = this.controls.add.image(0, 1264, 'spider-carousel-next.png');
    this.arrowNext.on('click', () => this.animateNext());

    this.carouselIndicator = this.add.container(693, 531, 300, 12);

    assignStyle(this.carouselIndicator.node, {
      display: 'flex',
      columnGap: cssPercentage(16, this.carouselIndicator.width)
    });

    idle(this.arrowPrev.node, 5, 0);
    idle(this.arrowNext.node, -5, 0);

    this.cartLayout = new LayoutCart(this.app);
    this.cartLayout.onAdd = () => {
      this.addProduct();
    };
    this.cartLayout.onRemove = () => {
      this.removeProduct();
    };
    this.cartLayout.next = () => this.next();

    this.cart = this.add.image(53, 1158, 'main-ui-cart.png');
    this.cart.setScale(0);
    this.cart.on('click', () => {
      this.cartLayout.open(this.menuIndex);
      this.product.fadeOutBy(0, 100);
      this.controls.fadeOutBy(0, 100);
      fadeOutBy(this.carouselIndicator.node, 0, 100);
      this.details.forEach((detail) => detail.fadeOutBy(0, 100));
    });

    this.cartIndicator = this.add.text(60, 1203, 18, 18, '0', 14);

    this.cart.onload = () => {
      assignStyle(this.cartIndicator.node, { border: 'solid 1px #E62429', borderRadius: '50%', background: '#ffff' });

      assignStyle(this.cartIndicator.paragraph, { fontFamily: "'Roboto Condensed', sans-serif", color: '#E62429' });

      registerTextResize(
        this.cartIndicator.paragraph,
        14,
        this.parent.width,
        this.parent.height,
        this.app.width,
        this.app.height
      );
    };
  }

  animatePrev() {
    this.details[this.activeIndex].fadeOutBy(100, 0);
    this.activeIndex = this.activeIndex > 0 ? this.activeIndex - 1 : this.details.length - 1;
    this.details[this.activeIndex].floatIn(-100, 0);

    this.updateDisplay();
  }

  animateNext() {
    this.details[this.activeIndex].fadeOutBy(-100, 0);
    this.activeIndex = this.activeIndex < this.details.length - 1 ? this.activeIndex + 1 : 0;
    this.details[this.activeIndex].floatIn(100, 0);

    this.updateDisplay();
  }

  animateEntrance(index = this.menuIndex) {
    this.menuIndex = index;
    this.product.animateEntrance(index);
    this.arrowPrev.setImage(`images/${IMAGES[index]}-carousel-prev.png`);
    this.arrowNext.setImage(`images/${IMAGES[index]}-carousel-next.png`);
    this.floatIn(0, 100, () => {
      zoomIn(this.cart.node);
      zoomIn(this.cartIndicator.node);
    });

    this.carouselIndicator.node.innerHTML = '';
    fadeOut(this.carouselIndicator.node);

    Array.from({ length: 6 }, (_, i) => {
      const image = document.createElement('img');
      image.src = `images/${IMAGES[this.menuIndex]}-carousel-indicator-active.png`;

      const div = document.createElement('div');
      div.append(image);

      assignStyle(div, {
        flex: this.activeIndex === i ? '2' : '1',
        opacity: this.activeIndex === i ? '1' : '0.4',
        transition: 'all 0.2s ease'
      });
      this.carouselIndicator.node.append(div);

      return div;
    });

    this.updateDisplay();
  }

  animateExit() {
    zoomOut(this.cart.node);
    zoomOut(this.cartIndicator.node);
    this.product.fadeOutBy(0, 100);
    this.controls.fadeOutBy(0, 100);
    this.details.forEach((detail) => detail.fadeOutBy(0, 100));
    this.cartLayout.fadeOutBy(0, 100);
    this.fadeOutBy(0, 100);
  }

  addProduct() {
    this.cartIndicator.setText((++this.count).toString());
    zoomIn(this.cartIndicator.node, { scale: { from: 1.2, to: 1 }, duration: 0.5 });
  }

  removeProduct() {
    this.cartIndicator.setText((--this.count).toString());
    zoomIn(this.cartIndicator.node, { scale: { from: 1.2, to: 1 }, duration: 0.5 });
  }

  updateDisplay() {
    for (let i = 0; i < this.carouselIndicator.node.children.length; i++) {
      const indicator = this.carouselIndicator.node.children[i] as HTMLElement;

      assignStyle(indicator, {
        flex: this.activeIndex === i ? '2' : '1',
        opacity: this.activeIndex === i ? '1' : '0.4'
      });
    }
  }
}
