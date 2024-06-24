import App from '@/src/App';

declare global {
  interface Window {
    InteractiveVideoApp: App;
    TATracker: TATrackerClass;
  }
}
