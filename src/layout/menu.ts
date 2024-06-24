import { fadeIn, fadeOut, fadeOutBy, floatIn, pulse, zoomIn, zoomOut, zoomPulse } from '@/animations';
import { AbstractLayout, ImageSlider } from '@/components';
import { assignStyle } from '@/utils';

export default class LayoutMenu extends AbstractLayout {
  bg: IAbstractComponent;
  slider: ImageSlider;

  constructor(app: IApp) {
    super(app);

    this.bg = this.add.image(0, 0, 'main-bg.jpg');
    this.slider = this.add.imageSlider(0, 0, this.app.width, this.app.height).setAlpha(0);

    this.preload();
  }

  get activeIndex() {
    return this.slider.activeIndex;
  }

  async preload() {
    const callout = this.add.image(104, 180, 'main-ui-callout.png');
    const button = this.add.image(625, 514, 'main-ui-ready.png');

    floatIn(callout.node, 0, 20);
    zoomIn(button.node, {
      scale: { from: 0, to: 1 },
      delay: 0.5,
      onComplete: () => {
        pulse(button.node);
      }
    });

    await this.slider.add('spider-bg', 'spider-bg.jpg');
    await this.slider.add('groot-bg', 'groot-bg.jpg');

    button.once('pointerdown', () => {
      fadeOut(this.bg.node);
      fadeOutBy(callout.node, 0, -20);
      zoomOut(button.node, { onComplete: () => this.start() });
    });
  }

  show() {
    super.show();
    fadeIn(this.node);
    this.slider.reset();
    return this;
  }

  start() {
    const buttonSpiderMan = this.add.image(634, 174, 'spider-name.png').setDepth(2).setScale(0);
    const buttonGroot = this.add.image(634, 855, 'groot-name.png').setDepth(2).setScale(0);

    assignStyle(buttonSpiderMan.node, { pointerEvents: 'none' });
    assignStyle(buttonGroot.node, { pointerEvents: 'none' });

    this.slider.setDepth(1);
    this.slider.onclick = () => {
      fadeOut([this.node], {
        onComplete: () => {
          this.hide();
        }
      });
      this.next(this.slider.activeIndex);
    };

    fadeIn(this.slider.node as unknown as IAbstractComponent);
    zoomPulse(buttonSpiderMan.node);
    zoomPulse(buttonGroot.node);
  }

  next: (index: number) => void = () => {};
}
