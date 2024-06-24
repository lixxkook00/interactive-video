import { fadeIn, zoomPulse } from '@/animations';
import { AbstractLayout } from '@/components';

export default class LayoutEnd extends AbstractLayout {
  bg: IImageComponent;
  btn: IImageComponent;

  constructor(app: IApp) {
    super(app);

    this.bg = this.add.image(0, 0, 'main-bg-end.jpg');

    this.btn = this.add.image(551, 526, 'main-ui-btn-replay.png').setScale(0);

    this.fadeOut();
  }

  show() {
    super.show();

    this.setDepth(9999);

    window.addEventListener('click', () => {
      window.location.reload();
    });

    zoomPulse(this.btn.node);
    fadeIn(this.node);
    return this;
  }
}
