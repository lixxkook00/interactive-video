import { createTween } from './core';
import * as Easing from './easing';

export const moveBy = (targets: gsap.TweenTarget, x: number, y: number, config: TweenBuilderConfig = {}) => {
  config.x = x;
  config.y = y;
  config.ease = config.ease ?? Easing.Quad.easeOut;

  return createTween(targets, config);
};

export const zoomIn = (targets: gsap.TweenTarget, config: TweenBuilderConfig = {}) => {
  config.scale = config.scale ?? 1;
  config.ease = config.ease ?? Easing.Back.easeOut;

  return createTween(targets, config);
};

export const zoomOut = (targets: gsap.TweenTarget, config: TweenBuilderConfig = {}) => {
  config.scale = config.scale ?? 0;
  config.ease = config.ease ?? Easing.Back.easeIn;

  return createTween(targets, config);
};

export const floatIn = (targets: gsap.TweenTarget, x: number, y: number, config: TweenBuilderConfig = {}) => {
  config.x = { from: x, to: 0 };
  config.y = { from: y, to: 0 };
  config.alpha = { from: 0, to: 1 };
  config.ease = Easing.Quad.easeInOut;

  return createTween(targets, config);
};

export const fadeIn = (targets: gsap.TweenTarget, config: TweenBuilderConfig = {}) => {
  config.alpha = config.alpha ?? 1;
  config.ease = config.ease ?? Easing.Quad.easeOut;

  return createTween(targets, config);
};

export const fadeOut = (targets: gsap.TweenTarget, config: TweenBuilderConfig = {}) => {
  config.alpha = config.alpha ?? 0;
  config.ease = config.ease ?? Easing.Quad.easeIn;

  return createTween(targets, config);
};

export const fadeOutBy = (targets: gsap.TweenTarget, x: number, y: number, config: TweenBuilderConfig = {}) => {
  config.x = { from: 0, to: x };
  config.y = { from: 0, to: y };
  config.alpha = { from: 1, to: 0 };
  config.ease = Easing.Quad.easeOut;

  const onComplete = config.onComplete;

  config.onComplete = () => {
    onComplete?.();
    createTween(targets, { x: 0, y: 0 });
  };

  return createTween(targets, config);
};
