/**
 * Enabler initialized.
 * In App are rendered offscreen so animation should wait for the visible event.
 * These are simulated with delays in the local environment.
 * @source {@link https://www.google.com/doubleclick/studio/docs/sdk/html5/en/class_studio_Enabler.html}
 */
export const enablerInitialized = (enablerVisible: () => void) => {
  if (Enabler.isVisible()) enablerVisible();
  else Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, enablerVisible);
};

/**
 * Checks if the Enabler is initialized and calls the `enablerVisible` function if it is, otherwise it adds an event listener for the initialization event and calls `enablerInitialized` when it occurs.
 *
 * @param enablerVisible - enablerVisible is a callback function that will be called when the Enabler is initialized.
 */
export const setupEnabler = (enablerVisible: () => void) => {
  if (Enabler.isInitialized()) enablerInitialized(enablerVisible);
  else Enabler.addEventListener(studio.events.StudioEvent.INIT, () => enablerInitialized(enablerVisible));
};
