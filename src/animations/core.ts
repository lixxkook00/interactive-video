import gsap from 'gsap';

const extractVars = (config: TweenBuilderConfig) => {
  const fromVars: gsap.TweenVars = {};
  const toVars: gsap.TweenVars = {};

  Object.entries(config).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null && 'from' in value) {
      fromVars[key] = value.from;
      toVars[key] = value.to;
    } else {
      toVars[key] = value;
    }
  });

  toVars.duration = toVars.duration ?? 0.5;

  return { fromVars, toVars };
};

export const createTween = (targets: gsap.TweenTarget, config: TweenBuilderConfig, killTween = true) => {
  const { fromVars, toVars } = extractVars(config);

  killTween && gsap.killTweensOf(targets);
  return gsap.fromTo(targets, fromVars, toVars);
};

export const createTimeline = (targets: gsap.TweenTarget, config: TweenChainBuilderConfig, killTween = true) => {
  killTween && gsap.killTweensOf(targets);

  const timeline = gsap.timeline({ paused: true });
  const tweens = config.tweens;

  tweens?.forEach((vars) => {
    const { toVars } = extractVars(vars);
    timeline.to(targets, toVars);
  });

  return timeline.play();
};
