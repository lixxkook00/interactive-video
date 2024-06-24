import { assignStyle, cssPercentage } from '@/utils';
import { AbstractComponent } from '.';

export default class VideoComponent extends AbstractComponent implements IVideoComponent {
  readonly video = document.createElement('video');
  sources = [document.createElement('source')];
  oncomplete: () => void = () => {};

  constructor(parent: IApp | IAbstractComponent, top: number, left: number, width: number, height: number) {
    super(parent, top, left, width, height);

    assignStyle(this.video, {
      position: 'absolute',
      width: '100%',
      top: cssPercentage(top, this.parent.height),
      left: cssPercentage(left, this.parent.width)
    });

    this.video.preload = 'metadata';
    this.video.muted = true;
    this.video.autoplay = true;
    this.video.loop = true;
    this.video.playsInline = true;
    this.video.setAttribute('webkit-playsinline', '');

    this.node.append(this.video);

    this.init();
  }

  addSource(src: string, type: string = 'video/mp4', index: number = this.sources.length) {
    const source = document.createElement('source');
    source.src = this.getMedia(src);
    source.type = type;

    this.video.append(source);

    this.sources.splice(index >= 0 ? index : this.sources.length, 0, source);
    return this;
  }

  setSourceAt(url: string, index: number) {
    this.sources[index].src = this.getMedia(url);
    return this;
  }

  /**
   * Gets the URL of a media file if the build is in the 'studio' environment and Enabler is serving in a live environment.
   * Otherwise, it returns the original path.
   * @param filepath - The path of the media file.
   * @param localPath - The local path where the media file is located.
   */
  protected getMedia(filepath: string, localPath?: string) {
    const path = localPath ? `${localPath}/${filepath}` : filepath;
    return import.meta.env.VITE_BUILD === 'studio' && Enabler.isServingInLiveEnvironment()
      ? Enabler.getUrl(path)
      : path;
  }
}
