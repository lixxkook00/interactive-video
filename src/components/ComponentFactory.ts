import { deepFlat } from '@/utils';
import { Container, ImageComponent, ImageSlider, TextComponent, VideoComponent } from '.';

export default class ComponentFactory {
  parent: IAbstractComponent;

  constructor(parent: IAbstractComponent) {
    this.parent = parent;
  }

  get staticPath(): string {
    return this.parent.app?.staticPath ?? '';
  }

  container(top: number, left: number, width: number, height: number) {
    return new Container(this.parent, top, left, width, height);
  }

  image(top: number, left: number, src: string) {
    return new ImageComponent(this.parent, top, left, `${this.staticPath}${src}`);
  }

  imageSlider(top: number, left: number, width: number, height: number) {
    return new ImageSlider(this.parent, top, left, width, height);
  }

  text(top: number, left: number, width: number, height: number, text: string, fontSize: number) {
    return new TextComponent(this.parent, top, left, width, height, text, fontSize);
  }

  video(top: number, left: number, width: number, height: number, options: HTMLVideoSourceOptions) {
    const video = new VideoComponent(this.parent, top, left, width, height);

    deepFlat([options]).forEach(({ src, type }) => video.addSource(src, type));

    return video;
  }
}
