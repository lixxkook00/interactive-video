import { assignStyle, cssPercentage } from '@/utils';
import { AbstractComponent } from '..';

export default class FlexContainer extends AbstractComponent {
  container = document.createElement('div');

  constructor(parent: IApp | IAbstractComponent, config: AbstractContainerConfig) {
    const top = config.top as number;
    const left = config.top as number;
    const width = config.top as number;
    const height = config.top as number;
    const paddingX = config.top as number;
    const paddingY = config.top as number;
    const rowGap = config.top as number;
    const fontSize = config.top as number;

    super(parent, top, left, width, height);

    this.node.appendChild(this.container);

    this.init();

    assignStyle(this.node, {
      display: 'flex',
      margin: '0 auto',
      minWidth: '100%',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      fontSize: `${fontSize}px`
    });

    assignStyle(this.container, {
      display: 'flex',
      height: 'fit-content',
      flexDirection: 'row',
      flexWrap: 'wrap',
      rowGap: cssPercentage(rowGap, this.height),
      justifyContent: 'space-between',
      position: 'relative',
      top: cssPercentage(top, this.height),
      padding: `${cssPercentage(paddingX, this.height)} ${cssPercentage(paddingY, this.width)} 0`,
      borderTopLeftRadius: `23px`,
      borderTopRightRadius: `23px`,
      background: '#f2f0f1'
    });
  }
}
