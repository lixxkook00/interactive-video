export const setMetaTags = (attributes: { [key: string]: string }) => {
  const meta = document.createElement('meta');

  Object.keys(attributes).forEach((key) => {
    meta.setAttribute(key, attributes[key]);
  });

  document.head.appendChild(meta);
};

export const appendScript = (innerHTML: string, async = false): Promise<void> =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.innerHTML = innerHTML;
    script.async = async;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${innerHTML}`));
    document.head.appendChild(script);
  });

export const loadExternalScript = (url: string, async = false): Promise<void> =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = async;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
    document.head.appendChild(script);
  });
