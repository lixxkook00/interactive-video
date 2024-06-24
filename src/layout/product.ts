import { AbstractLayout, Container, ImageComponent, TextComponent } from '@/components';
import { assignStyle, cssPercentage, registerTextResize } from '@/utils';

const IMAGES = ['spider', 'groot'];

const PRODUCT = [
  [
    { img: 'spider-img-1-0.png', text: 'Marvel Spider-Man: Here Comes Spider-Man Book and Flashlight Set' },
    { img: 'spider-img-2-0.png', text: 'Marvel Spider-Man Super Web Slinger' },
    { img: 'spider-img-3-0.png', text: 'Marvel Spider-Man Color & Carry' }
  ],
  [
    {
      img: 'groot-img-1-0.png',
      text: "Marvel Studios Guardians of the Galaxy Vol. 3 Titan Hero Series Blast 'N Battle Groot"
    },
    { img: 'groot-img-2-0.png', text: 'Funko Marvel: Dancing Groot Bobble Action Figure' },
    {
      img: 'groot-img-3-0.png',
      text: 'Funko POP! Marvel: Avengers Infinity War - Teen Groot with Gun, Multicolor, Standard'
    }
  ]
];

export default class LayoutProduct extends AbstractLayout {
  bg: IImageComponent;
  list: {
    product: IAbstractComponent;
    button: IImageComponent;
    image: IImageComponent;
    text: ITextComponent;
    star: IImageComponent;
  }[] = [];
  activeIndex = 0;
  menuIndex = 0;
  initialized = false;
  container?: Container;
  onclick: (index: number) => void = () => {};

  constructor(app: IApp) {
    super(app);
    this.bg = this.add.image(138, 141, `${IMAGES[this.menuIndex]}-bg-products.png`);

    this.bg.onload = () => {
      if (!this.initialized) {
        this.initialized = true;

        this.container = this.add.container(148, 141, this.bg.width - 22, this.bg.height - 26 * 2);

        this.container.node.classList.add('overflow-y-scroll');
        assignStyle(this.container.node, {
          display: 'flex',
          overflow: 'hidden',
          overflowY: 'scroll',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
          justifyContent: 'space-around',
          paddingTop: `${cssPercentage(6, this.bg.height)}`,
          rowGap: `${cssPercentage(26, this.bg.height)}`
        });

        for (let i = 0; i < 3; i++) {
          const { product } = this.addProduct(i);

          assignStyle(product.node, {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderRadius: `10px`,
            background: '#FFF',
            boxShadow: '10px 15px 15px 0px rgba(0, 0, 0, 0.03)',
            overflow: 'hidden',
            order: `${i}`
          });
        }

        for (let i = 2; i >= 0; i--) {
          const { product } = this.addProduct(i);

          assignStyle(product.node, {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderRadius: `10px`,
            background: '#FFF',
            boxShadow: '10px 15px 15px 0px rgba(0, 0, 0, 0.03)',
            overflow: 'hidden',
            order: `${6 - i}`
          });
        }
      }
    };

    assignStyle(this.node, {
      display: 'flex',
      overflow: 'hidden',
      overflowY: 'scroll'
    });
  }

  addProduct(index: number) {
    const config = PRODUCT[this.menuIndex][index];

    const product = this.container?.add.container(0, 0, 312, 532) as unknown as IAbstractComponent;

    const image = new ImageComponent(product, 0, 0, `images/${config.img}`);

    image.onload = () => {
      assignStyle(image.node, { width: 'auto', height: 'auto' });
    };

    const text = new TextComponent(product, 318, 12, 288, 84, config.text, 24);

    registerTextResize(text.paragraph, 24, this.parent.width, this.parent.height, this.app.width, this.app.height);

    assignStyle(text.paragraph, { fontFamily: "'Roboto Condensed', sans-serif", textAlign: 'start', color: '#000000' });

    const star = new ImageComponent(product, 410, 12, `images/${IMAGES[this.menuIndex]}-star.png`);
    star.onload = () => {
      assignStyle(star.node, { width: '60%', height: 'auto' });
    };

    const brand = new ImageComponent(product, 445, 12, `images/main-i-brand.png`);
    brand.onload = () => {
      assignStyle(brand.node, { width: 'auto', height: 'auto' });
    };

    const button = new ImageComponent(product, 480, 12, `images/main-ui-btn-cart.png`);
    button.onload = () => {
      assignStyle(button.node, { width: '60%', height: 'auto' });
    };

    product.on('click', () => {
      this.fadeOutBy(0, 100);
      this.onclick(index);
    });

    this.list.push({ product, button, image, text, star });

    return { product, button, image, text, star };
  }

  animateEntrance(index = this.menuIndex) {
    this.menuIndex = index;
    this.floatIn(0, 100);

    this.bg.setImage(`images/${IMAGES[index]}-bg-products.png`);

    this.container?.node.classList.remove('spider-scroll');
    this.container?.node.classList.remove('groot-scroll');
    this.container?.node.classList.add(`${IMAGES[index]}-scroll`);

    this.list.forEach(({ image, star, text }, i) => {
      const config = PRODUCT[index][i > 2 ? 5 - i : i];
      text.setText(config.text);
      image.setImage(`images/${config.img}`);
      star.setImage(`images/${IMAGES[index]}-star.png`);
    });
  }
}
