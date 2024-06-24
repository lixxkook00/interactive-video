import { AbstractComponent, ComponentFactory } from '@/components';

export default abstract class AbstractLayout extends AbstractComponent implements IAbstractLayout {
  readonly add = new ComponentFactory(this);
  readonly app: IApp;

  constructor(app: IApp) {
    super(app, 0, 0, app.width, app.height);
    this.init();

    this.app = app;
  }
}
