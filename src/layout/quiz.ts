import { pulse, zoomIn, zoomOut } from '@/animations';
import { AbstractLayout } from '@/components';
import { QUIZ } from '@/constants';
import { assignStyle } from '@/utils';

const ANSWER = [
  [2, 3, 3],
  [2, 2, 3]
];
const IMAGE = ['spider', 'groot'];

export default class LayoutQuiz extends AbstractLayout {
  bg: IImageComponent;
  board: IImageComponent;
  video: (IAbstractComponent | IVideoComponent)[];
  list: { question: ITextComponent; options: ITextComponent[] }[] = [];
  activeIndex = 0;
  menuIndex = 0;
  active = true;
  onComplete: () => void = () => {};

  constructor(app: IApp) {
    super(app);
    this.bg = this.add.image(0, 0, `${IMAGE[this.menuIndex]}-quiz-bg.jpg`);
    this.board = this.add.image(131, 90, `${IMAGE[this.menuIndex]}-quiz-board.png`);
    this.video = [
      this.add.video(0, -50, 720, 948, [{ src: 'spider-man-swing.webm', type: 'video/webm' }]),
      this.add.video(110, -120, this.width * 0.7, this.height * 0.7, [{ src: 'groot-wave.webm', type: 'video/webm' }])
    ];

    const string = "It's time to take a quiz";
    const text = this.add.text(194, 530, 310, 44, string.toUpperCase(), 28);
    assignStyle(text.node, { fontFamily: "'Roboto Condensed', sans-serif" });
  }

  addQuiz(questionText: string, optionList: string[], questionFz: number, optionFz = questionFz) {
    const question = this.add.text(240, 195, 973, 88, questionText.toUpperCase(), questionFz).setAlpha(0);
    assignStyle(question.node, { fontFamily: "'Roboto Condensed', sans-serif" });

    const options = Array.from(optionList, (opt, i) => {
      const offsetTop = this.list.length === 0 ? -20 : 0;
      const text = this.add
        .text(340 + 82 * i + offsetTop, 462, 440, 68, opt, optionFz)
        .setScale(0)
        .addBackground(`images/${IMAGE[this.activeIndex]}-ui-select.png`);

      assignStyle(text.node, { fontFamily: "'Roboto Condensed', sans-serif" });

      text.on('click', () => {
        if (this.active) {
          this.active = false;

          const correctIndex = ANSWER[this.menuIndex][this.activeIndex];
          const correctAnswer = options[correctIndex];
          correctAnswer.changeBackground(`images/${IMAGE[this.menuIndex]}-ui-select-hover.png`);
          zoomIn(correctAnswer.node, { scale: 1.2 });

          options.forEach((otherOpt, j) => {
            if (correctIndex !== j) {
              zoomOut(otherOpt.node, { alpha: 0.4, scale: 0.95 });
            }
          });

          setTimeout(() => {
            this.animateExit();
          }, 2000);

          setTimeout(() => {
            this.next();
            this.active = true;
          }, 2500);
        }
      });
      return text;
    });

    this.list.push({ question, options });

    return this;
  }

  animateEntrance(index: number = this.menuIndex) {
    this.video.forEach((video, i) => {
      video.setAlpha(i === index ? 1 : 0);
      if (i === index && this.menuIndex !== index) (video as IVideoComponent)?.video?.load();
    });
    this.menuIndex = index;
    this.bg.setImage(`images/${IMAGE[index]}-quiz-bg.jpg`);
    this.board.setImage(`images/${IMAGE[index]}-quiz-board.png`);
    this.list[this.activeIndex].question.fadeIn();
    this.list[this.activeIndex].question.setText(QUIZ[this.menuIndex][this.activeIndex].question.toUpperCase());
    this.list[this.activeIndex].options.forEach((opt, i) => {
      opt.changeBackground(`images/${IMAGE[index]}-ui-select.png`);
      opt.setText(QUIZ[this.menuIndex][this.activeIndex].options[i]);
      zoomIn(opt.node, {
        alpha: 1,
        delay: 0.05 + 0.05 * i,
        onComplete: () => {
          pulse(opt.node, {
            delay: 0.05 + 0.05 * i
          });
        }
      });
    });
  }

  animateExit(callback = () => {}) {
    this.list[this.activeIndex].question.fadeOut();
    this.list[this.activeIndex].options.forEach((opt, i) => {
      zoomOut(opt.node, {
        alpha: 1,
        delay: 0.05 * i,
        onComplete: () => {
          opt.changeBackground(`images/${IMAGE[this.menuIndex]}-ui-select.png`);
          callback();
        }
      });
    });
  }

  next() {
    this.activeIndex++;
    if (this.activeIndex >= this.list.length) {
      this.activeIndex = 0;
      this.onComplete();
    } else {
      this.animateEntrance();
    }
  }

  changeQuestionAt(text: string, index: number) {
    this.list[index].question.setText(text);
    return this;
  }

  changeOptions(text: string, index: number) {
    this.list[index].question.setText(text);
    return this;
  }
}
