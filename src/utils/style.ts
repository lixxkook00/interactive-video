import { camelCase } from './string';

/**
 * Assigns styles to an HTML element using the Object.assign method.
 *
 * @param element - The HTML element to which styles will be applied.
 * @param style - The styles to be assigned, either as a `CSSCustomStyle` or a plain object.
 */
export const assignStyle = (element: HTMLElement, style: CSSCustomStyle) => {
  Object.assign(element.style, style);
};

/**
 * Converts a numeric value to a percentage relative to the maximum value.
 *
 * @param value - The numeric value.
 * @param max - The maximum value.
 */
export const cssPercentage = (value: number, max: number) => `${Math.min(value / max, 1) * 100}%`;

/**
 * Parses CSS text and extracts the selector and style properties.
 *
 * @param string - The CSS text to parse.
 */
export const cssParse = (string: string) => {
  const cssText = string.replace(/\/\*(.|\s)*?\*\//g, ' ').replace(/\s+/g, ' ');

  const style: Record<string, string> = {};
  const [, selector, rule] = RegExp(/ ?(.*?) ?{([^}]*)}/).exec(cssText) ?? [null, null, cssText];

  const properties = rule.split(';').map((o) => o.split(':').map((x) => x?.trim()));
  for (const [prop, val] of properties) style[camelCase(prop)] = val;

  return { selector, style };
};

/**
 * Converts a style object to a CSS-formatted string.
 *
 * @param style - The style object to stringify.
 */
export const cssStringify = (style: CSSCustomStyle) =>
  Object.keys(style).reduce(
    (prop, key) =>
      `${prop}${key
        .split(/(?=[A-Z])/)
        .join('-')
        .toLowerCase()}:${style[key as keyof CSSCustomStyle]};`,
    ''
  );

/**
 * Calculate the CSS percentage values for positioning and sizing.
 *
 * @param left - The left position value.
 * @param top - The top position value.
 * @param width - The width value.
 * @param height - The height value.
 * @param cw - The container width.
 * @param ch - The container height.
 */
export const cssPositioning = (top: number, left: number, width: number, height: number, cw: number, ch: number) =>
  ({
    position: 'relative',
    top: cssPercentage(top, ch),
    left: cssPercentage(left, cw),
    width: cssPercentage(width, cw),
    height: cssPercentage(height, ch)
  }) as CSSCustomStyle;

/**
 * Resizes the text font size based on the window and container dimensions.
 *
 * @param fontsize - The original font size in pixels.
 * @param width - The width of the text element in pixels.
 * @param height - The height of the text element in pixels.
 * @param cw - The width of the container in pixels.
 * @param ch - The height of the container in pixels.
 */
export const resizeText = (fontsize: number, width: number, height: number, cw: number, ch: number) => {
  const ratio = innerWidth / innerHeight;
  const textWidth = Math.min(innerWidth, width);
  const textHeight = Math.min(innerHeight, height);

  return fontsize * (ratio > cw / ch ? textHeight / ch : textWidth / cw);
};

export const registerTextResize = (
  element: HTMLElement,
  fontSize: number,
  width: number,
  height: number,
  cw: number,
  ch: number
) => {
  const resize = () => {
    assignStyle(element, { fontSize: `${resizeText(fontSize, width, height, cw, ch)}px` });
  };

  resize();
  addEventListener('resize', () => resize());
};

/**
 * Creates a responsive image element with specified source and positioning.
 *
 * @param src - The source URL of the image.
 * @param top - The top position of the image container.
 * @param left - The left position of the image container.
 * @param cw - The container width for positioning calculations.
 * @param ch - The container height for positioning calculations.
 */
export const createResponsiveImage = (src: string, top: number, left: number, cw: number, ch: number) => {
  const element = document.createElement('div');
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => assignStyle(element, cssPositioning(top, left, img.width, img.height, cw, ch));

  element.appendChild(img);
  return element;
};
