import { appendScript } from '../utils';

export const setupGA = async (gaID: string = import.meta.env.VITE_GA_ID) => {
  await appendScript(
    `window.dataLayer = window.dataLayer || []; function gtag() {window.dataLayer.push(arguments);} gtag("js", new Date()); gtag("config", "${gaID}");`
  );
};
