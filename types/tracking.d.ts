/**
 * AAEvents namespace for tracking events.
 * @source {@link https://ads.superawesome.tv/v2/events.js}
 */
declare namespace AAEvents {
  /**
   * Sends an event to AA.
   *
   * @param event The name of the event to track.
   */
  function event(eventName: string): void;

  /**
   * Sends a click event to AA.
   *
   * @param event The name of the event to track.
   */
  function click(event?: string): void;
}

/**
 * The core library for building Studio HTML ads.
 * @source {@link https://s0.2mdn.net/ads/studio/Enabler.js}
 * @documentation {@link https://www.google.com/doubleclick/studio/docs/sdk/html5/en/class_studio_Enabler.html}
 */
declare namespace Enabler {
  /**
   * Adds an event listener to the event target. The same handler can only be added once per the type.
   * Even if you add the same handler multiple times using the same type then it will only be called once when the event is dispatched.
   *
   * @param type The type of the event to listen for.
   * @param handleEvent The function that will be called when the event is dispatched.
   * @param opt_capture In DOM-compliant browsers, this determines whether the listener is fired during the capture or bubble phase of the event.
   * @param opt_handlerScope Object in whose scope to call the listener.
   */
  function addEventListener(
    type: string,
    handleeventName: () => void,
    opt_capture?: boolean,
    opt_handlerScope?: object
  ): void;

  /**
   * Opens a new window with the URL as identified by the given exit ID.
   * @param id The exit ID.
   * @param opt_url The url to navigate to. This URL can still be modified in Studio and DCM. If you want this URL to be uneditable Studio and DCM, use the `exitOverride` method instead.
   */
  function exit(id: string, opt_url?: string): void;

  /**
   * Retrieves a creative parameter based on the variable name.
   * @param variableName The name of the variable to retrieve.
   *
   * @example // Retrieve the value of the "app" parameter
   * const app = Enabler.getParameter('app');
   * console.log(app); // Output: The value of the "app" parameter if available, otherwise undefined
   *
   * @example // Retrieve the value of the "device" parameter
   * const device = Enabler.getParameter('device');
   * console.log(device); // Output: The value of the "device" parameter if available, otherwise undefined
   */
  function getParameter(variableName: string): string;

  /**
   * Gets the runtime URL given the original compile-time filename.
   * @param filepath The original full path of the asset.
   */
  function getUrl(filepath: string): string;

  function isInitialized(): boolean;

  /** Returns whether the ad is serving in the live environment or not. */
  function isServingInLiveEnvironment(): boolean;

  /** Returns whether the ad is visible. The iframe is notified when the ad is visible and the enabler dispatches the `StudioEvent.VISIBLE` event. */
  function isVisible(): boolean;

  /**
   * Counts instances of the string parameter, aggregated as Custom Variable Count 1 in reports.
   *
   * The string must meet the following criteria:
   * - The string cannot exceed 100 characters
   * - The string must only contain Latin characters (0-9, Aa-Zz)
   * - The String must NOT contain any personally identifiable information such as name, email address, phone number, health info, financial info, etc.
   *
   * Additionally, all question marks (?) and anything after the first question mark in a string will be truncated.
   * @param customString Value to record against custom variable count 1.
   */
  function reportCustomVariableCount1(customString: string): void;
}

declare namespace studio.events {
  /** Provides generic events for DoubleClick Studio ads.*/
  const StudioEvent: {
    /** Dispatched when a component of the SDK is initialized. */
    INIT: string;
    /** Dispatched when the ad is visible to the user.This is useful for environments where the ad is rendered offscreen and displayed to the user at a later time. */
    VISIBLE: string;
  };
}

/**
 * Sends a Google Analytics event.
 * @param command The command to execute. Only `'event'` is supported.
 * @param action The event action.
 * @param eventParams Additional parameters for the event.
 * @example
 * gtag('event', 'event_name', {
 *   'key': 'value',
 * });
 * @documentation {@link https://developers.google.com/tag-platform/gtagjs}
 */
declare function gtag(command: 'event', action: string, eventParams?: Record<string, string | number>): void;

/**
 * Interface representing the TATracker class.
 */
declare class TATrackerClass {
  /**
   * @param platform - The platform on which to track events (e.g., 'aa', 'studio', 'ga').
   */
  constructor(platform?: string);

  /** Get the current dwell time. */
  readonly dwell: number;
  /** An object that keeps track of whether certain entries exist. */
  entries: Record<string, boolean>;
  /** The platform on which events are tracked. */
  platform: string | undefined;
  /** A reference to the interval for updating the dwell time. */
  dwellTime: NodeJS.Timeout | null;

  /** Set the interval for updating the dwell time. */
  setDwellTime(): void;

  /** Remove dwell time updates. */
  removeDwellTime(): void;

  /**
   * Check if a tracked event name entry exists.
   *
   * @param eventName - The event to check.
   */
  exist(eventName: string): boolean;

  /**
   * Tracks a custom event.
   *
   * @param eventName - The event to track.
   * @param debug - Optional. Indicates whether debugging information should be logged. Defaults to true.
   */
  send(eventName: string, debug?: boolean): void;

  /**
   * Tracks a custom event once.
   *
   * @param eventName - The event to track.
   * @param debug - Optional. Indicates whether debugging information should be logged. Defaults to true.
   */
  sendOnce(eventName: string, debug?: boolean): void;

  /**
   * Tracks an impression when ad first loads.
   *
   * @param eventName - The event to track.
   * @param debug - Optional. Indicates whether debugging information should be logged. Defaults to true.
   */
  sendImpression(eventName: string): void;

  /**
   * Performs actions associated with a click event based on the platform.
   *
   * @param event - The click event to be processed.
   */
  click(eventName: string): void;

  /**
   * Performs actions associated with a click event based on the platform.
   *
   * @param event - The click event to be processed.
   */
  open(eventName: string, url: string | URL): void;
}
