import { AbstractLayout } from '@/components';
import { assignStyle } from '@/utils';

export default class Newsletter extends AbstractLayout {
  ui?: IAbstractComponent;
  btnClose?: IAbstractComponent;
  onclick: () => void = () => {};

  constructor(app: IApp) {
    super(app);

    assignStyle(this.node, { transition: 'all 0.2s ease' });

    this.ui = this.add.image(275, 312, 'main-ui-newsletter.png').setAlpha(0);

    this.btnClose = this.add
      .image(251, 1026, 'main-ui-x.png')
      .setScale(0)
      .on('click', () => {
        this.animateExit();
        this.onclick();
      });
  }

  animateEntrance() {
    setTimeout(() => {
      this.fadeIn();
      assignStyle(this.node, { backgroundColor: 'rgb(0,0,0,0.4)' });
      this.btnClose?.zoomIn();
      this.ui?.floatIn(0, 50);
    }, 3000);
  }

  animateExit() {
    assignStyle(this.node, { backgroundColor: 'rgb(0,0,0,0)' });
    this.fadeOut();
    this.ui?.fadeOut();
    this.btnClose?.zoomOut();
  }
}
