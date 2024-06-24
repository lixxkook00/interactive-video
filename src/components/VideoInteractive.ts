import createPlayer from 'video.js';

import { assignStyle } from '@/utils';
import { ImageComponent, VideoComponent } from '.';

export default class VideoInteractive extends VideoComponent {
  list: Record<string, string> = {};
  player?: videojs.VideoJsPlayer;

  constructor(parent: IApp | IAbstractComponent, top: number, left: number, width: number, height: number) {
    super(parent, top, left, width, height);

    this.init();
  }

  add(key: string, url?: string) {
    const src = url ?? `${key}.mp4`;

    if (Object.keys(this.list).length === 0) {
      this.setSourceAt(src, 0);
    }

    this.list[key] = src;

    return this;
  }

  setCurrentTime(seconds: number) {
    this.player?.currentTime(seconds);
    return this;
  }

  play(key: string, seconds: number = 0) {
    const src = this.list[key];

    if (src) {
      this.setSourceAt(src, 0);
      this.player?.src(src);
      this.player?.load();
      this.player?.currentTime(seconds);
    } else console.error(`Video key is not found: ${key}`);
  }

  pause() {
    this.player?.pause();
  }

  resume() {
    this.player?.play();
  }

  setPlayer(options?: videojs.VideoJsPlayerOptions, ready?: videojs.default.ReadyCallback) {
    this.player = createPlayer(this.video, options, ready) as unknown as videojs.VideoJsPlayer;
    this.player.hide();
    this.player.pause();

    const posters = document.querySelectorAll('.vjs-poster');
    posters.forEach((poster) => assignStyle(poster as HTMLElement, { width: '100%', height: '100%' }));
  }

  setPoster(url: string) {
    this.player?.poster(url);
    return this;
  }

  addButton(top: number, left: number, src: string) {
    const button = new ImageComponent(this, top, left, src);
    return button;
  }
}
