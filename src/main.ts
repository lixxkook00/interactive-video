import App from './App';
import { APP_HEIGHT, APP_WIDTH, QUIZ } from '@/constants';
import { loadExternalScript, setMetaTags } from '@/utils';

import { moveBy, pulse } from './animations';
import { ImageComponent, VideoInteractive } from './components';
import { setupEnabler, setupGA } from './core';
import { Layout, LayoutEnd, LayoutMenu, LayoutQuiz, Newsletter } from './layout';

const VIDEO_SRC = ['spider-man', 'groot', 'spider-man-resume', 'groot-resume'];

const setupApp = () => {
  const app = new App('app', APP_WIDTH, APP_HEIGHT, 'images/');

  const video = new VideoInteractive(app, 0, 0, APP_WIDTH, APP_HEIGHT);
  VIDEO_SRC.forEach((src) => video.add(src));
  video.setAlpha(0).setPlayer();

  const btnWatch = video.addButton(624, 109, 'images/main-ui-video-watch.png').setAlpha(0);
  btnWatch.on('click', () => {
    logo.setScale(1);
    next();
  });

  const btnBuy = video.addButton(624, 510, 'images/main-ui-buy.png').setAlpha(0);
  btnBuy.on('click', () => {
    btnBack.setScale(0).setAlpha(1).zoomIn();
    btnResume.setScale(0).setAlpha(1).zoomIn();

    logo.setPosition().zoomIn();
    btnWatch.zoomOut();
    btnBuy.zoomOut();
    btnQuiz.zoomOut();

    productLayout.animateEntrance(menu.activeIndex);
  });

  const btnQuiz = video.addButton(624, 866, 'images/main-ui-quiz.png').setAlpha(0);
  btnQuiz.on('click', () => {
    video.pause();
    btnBack.setScale(0).setAlpha(1).zoomIn();
    btnResume.setScale(0).setAlpha(1).zoomIn();

    logo.setPosition().zoomIn();
    btnWatch.zoomOut();
    btnBuy.zoomOut();
    btnQuiz.zoomOut();

    quiz.fadeIn();
    quiz.activeIndex = 0;
    quiz.animateEntrance(menu.activeIndex);
  });

  const productLayout = new Layout(app);
  productLayout.hide().animateExit();

  const quiz = new LayoutQuiz(app);
  quiz.hide();
  QUIZ[0].forEach(({ question, options }) => quiz.addQuiz(question, options, 36, 32));

  quiz.onComplete = () => {
    quiz.fadeOut();
    productLayout.animateEntrance(menu.activeIndex);
    video.resume();
  };

  const newsletter = new Newsletter(app);
  newsletter.fadeOut();
  newsletter.onclick = () => {
    logo.zoomOut();
  };

  const logo = new ImageComponent(app, 34, 589, 'images/logo.png').setScale(0);

  const menu = new LayoutMenu(app);
  menu.next = (index: number) => {
    video.fadeIn();
    video.play(VIDEO_SRC[index]);

    video.player?.off('ended');
    btnHome.floatIn(-50, 0);

    btnWatch
      .setScale(1)
      .setAlpha(0)
      .floatIn(0, 100, () => {
        pulse(btnWatch.node);
      });
    btnBuy
      .setScale(1)
      .setAlpha(0)
      .floatIn(0, 100, () => {
        pulse(btnBuy.node);
      });
    btnQuiz
      .setScale(1)
      .setAlpha(0)
      .floatIn(0, 100, () => {
        pulse(btnQuiz.node);
      });
  };

  const btnHome = new ImageComponent(app, 53, 0, 'images/main-ui-home.png');
  btnHome.setAlpha(0);
  btnHome.on('click', () => {
    menu.fadeIn();

    productLayout.animateExit();
    quiz.fadeOut();
    logo.zoomOut();
    quiz.animateExit();
    video.fadeOut();

    newsletter.animateExit();
    btnHome.fadeOutBy(-50, 0);
    btnBack.setScale(1).setAlpha(0).fadeOutBy(-50, 0);
    btnResume.fadeOutBy(50, 0);
  });

  const btnBack = new ImageComponent(app, 53, 150, 'images/main-ui-back.png');
  btnBack.setScale(0);
  btnBack.on('click', () => {
    btnResume.zoomOut();
    btnBack.zoomOut();
    logo.zoomOut();

    productLayout.animateExit();
    quiz.animateExit();

    quiz.fadeOut();
    video.resume();

    btnWatch.setAlpha(1).zoomIn(() => {
      pulse(btnWatch.node);
    });
    btnBuy.setAlpha(1).zoomIn(() => {
      pulse(btnBuy.node);
    });
    btnQuiz.setAlpha(1).zoomIn(() => {
      pulse(btnQuiz.node);
    });
  });

  const btnResume = new ImageComponent(app, 53, 940, 'images/main-ui-video-resume.png');
  btnResume.setScale(0);
  btnResume.on('click', () => next());
  productLayout.next = () => next();

  const end = new LayoutEnd(app);
  end.hide();

  const next = () => {
    btnHome.zoomOut();
    btnResume.zoomOut();
    btnBack.zoomOut();
    quiz.animateExit();
    quiz.fadeOut();
    productLayout.animateExit();

    moveBy(logo.node, 0, 100, {
      scale: 1,
      delay: 3.5,
      onComplete: () => {
        btnHome.zoomIn();
      }
    });

    setVideoSource();
  };

  const setVideoSource = () => {
    const src = video.player?.currentSrc() as string;
    if (src.includes('resume')) video.resume();
    else {
      newsletter.animateEntrance();
      btnWatch.zoomOut();
      btnBuy.zoomOut();
      btnQuiz.zoomOut();
      video.play(src.replace('.mp4', '-resume'));
    }

    video.video.loop = false;

    video.player?.on('ended', () => {
      if (video.video.src.includes('-resume')) end.show();
    });
  };
};

switch (import.meta.env.VITE_BUILD) {
  case 'aa':
    loadExternalScript(import.meta.env.VITE_AA_SCRIPT);
    setupApp();
    break;
  case 'studio':
    setMetaTags({ name: 'ad.size', content: 'width=0,height=0' });
    loadExternalScript(import.meta.env.VITE_STUDIO_SCRIPT).then(() => setupEnabler(setupApp));
    break;
  case 'ga':
    loadExternalScript(import.meta.env.VITE_GA_SCRIPT + import.meta.env.VITE_GA_ID, true).then(() => setupGA());
    setupApp();
    break;
  default:
    console.error('Unsupported environment, please check the environment variables');
    break;
}
