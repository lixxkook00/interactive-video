import { createTimeline } from './core';
import * as Easing from './easing';

export const zoomPulse = (targets: gsap.TweenTarget, config: TweenChainBuilderConfig = {}) => {
  config.tweens = [
    {
      scale: 1,
      duration: 0.5,
      ease: Easing.Back.easeOut
    },
    {
      scale: 0.95,
      duration: 1,
      ease: Easing.Linear.easeNone,
      yoyo: true,
      repeat: -1
    }
  ];

  return createTimeline(targets, config);
};
