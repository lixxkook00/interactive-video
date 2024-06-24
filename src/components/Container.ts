import { AbstractComponent, ComponentFactory } from '.';

export default class Container extends AbstractComponent implements IAbstractComponent {
  readonly add = new ComponentFactory(this);
  readonly app: IApp;

  constructor(app: IApp, top: number, left: number, width: number, height: number) {
    super(app, top, left, width, height);
    this.init();

    this.app = app;
  }
}
