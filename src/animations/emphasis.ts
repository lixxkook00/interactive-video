import { createTween } from './core';
import * as Easing from './easing';

export const pulse = (targets: gsap.TweenTarget, config: TweenBuilderConfig = {}) => {
  config.scale = config.scale ?? 1.05;
  config.duration = config.duration ?? 1;
  config.repeat = config.repeat ?? -1;
  config.yoyo = config.yoyo ?? true;
  config.ease = config.ease ?? Easing.Linear.easeNone;

  return createTween(targets, config);
};

export const idle = (targets: gsap.TweenTarget, x: number, y: number, config: TweenBuilderConfig = {}) => {
  config.x = `+=${x}`;
  config.y = `+=${y}`;
  config.duration = config.duration ?? 1;
  config.repeat = config.repeat ?? -1;
  config.yoyo = config.yoyo ?? true;
  config.ease = config.ease ?? Easing.Quad.easeInOut;

  return createTween(targets, config);
};
